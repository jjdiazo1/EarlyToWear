// components/RadarOverlay.tsx

"use client";

import { useEffect, useRef } from "react";

export default function RadarOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  // Coordenadas polares ficticias de tiendas locales (ángulo en °, radio normalizado)
  const blips = [
    { angle: 20, radius: 0.4 },
    { angle: 75, radius: 0.6 },
    { angle: 140, radius: 0.5 },
    { angle: 200, radius: 0.7 },
    { angle: 320, radius: 0.55 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.parentElement?.clientWidth || 0;
    let height = canvas.parentElement?.clientHeight || 0;
    const size = Math.min(width, height);

    // Ajustamos tamaño del canvas al contenedor
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    const radarRadius = (size / 2) * 0.9; // 90% del semilado menor

    let sweepAngle = 0; // Ángulo inicial de la manecilla (en grados)

    const drawFrame = () => {
      if (!ctx) return;
      // Limpiamos el canvas
      ctx.clearRect(0, 0, width, height);

      /** 1. DIBUJAMOS SOLO EL CONTORNO EXTERIOR DEL RADAR (OPACIDAD BAJA) **/
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.strokeStyle = "rgba(147,51,234,0.1)"; // contorno muy tenue
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, radarRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      /** 2. DIBUJAMOS LA MANECILLA ROTATORIA + HALO “FOLLOW” **/
      ctx.save();
      ctx.translate(centerX, centerY);
      const sweepRad = (sweepAngle * Math.PI) / 180;

      // Dibujamos la línea de la manecilla
      ctx.strokeStyle = "rgba(147,51,234,0.9)"; // púrpura intenso
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(
        Math.cos(sweepRad) * radarRadius,
        Math.sin(sweepRad) * radarRadius
      );
      ctx.stroke();

      // Dibujamos un “halo” detrás de la punta de la manecilla:
      // Un arco muy delgado (ej. 10° de ancho) directamente posterior al sweep
      const haloWidthRad = (10 * Math.PI) / 180; // 10°
      const startHalo = sweepRad - haloWidthRad;
      const endHalo = sweepRad;

      // Creamos gradiente radial para el halo
      const haloGradient = ctx.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        radarRadius
      );
      haloGradient.addColorStop(0, "rgba(147,51,234,0.5)");
      haloGradient.addColorStop(1, "rgba(147,51,234,0)");

      ctx.fillStyle = haloGradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radarRadius, startHalo, endHalo);
      ctx.closePath();
      ctx.fill();

      // Dibujamos un pequeño círculo brillante en la punta
      const glowX = Math.cos(sweepRad) * radarRadius;
      const glowY = Math.sin(sweepRad) * radarRadius;
      const glowGrad = ctx.createRadialGradient(
        glowX,
        glowY,
        0,
        glowX,
        glowY,
        radarRadius * 0.05
      );
      glowGrad.addColorStop(0, "rgba(147,51,234,0.9)");
      glowGrad.addColorStop(1, "rgba(147,51,234,0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(glowX, glowY, radarRadius * 0.05, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      /** 3. DIBUJAMOS LOS BLIPS CON FADE-OUT ANIMADO **/
      ctx.save();
      ctx.translate(centerX, centerY);
      blips.forEach((blip) => {
        const angleRad = (blip.angle * Math.PI) / 180;
        const r = blip.radius * radarRadius;
        const x = Math.cos(angleRad) * r;
        const y = Math.sin(angleRad) * r;

        // Calculamos la diferencia angular entre sweepAngle y el ángulo del blip
        let delta = Math.abs((sweepAngle % 360) - blip.angle);
        if (delta > 180) delta = 360 - delta; // manejamos wrap-around

        // Si la manecilla está cerca (±6°), activamos el pulso
        if (delta < 6) {
          // Creamos un parámetro de fade basado en qué tan cerca está el sweep exactamente:
          // Al llegar a delta=0, alfa=1; en delta=6, alfa=0
          const fadeFactor = 1 - delta / 6; // va de 1 a 0
          const maxSize = radarRadius * 0.045; // tamaño máximo del blip
          const blipSize = maxSize * (0.5 + 0.5 * fadeFactor); // 50% → 100% tamaño
          const alpha = 0.5 + 0.5 * fadeFactor; // de 0.5 → 1

          // Dibujamos halo del blip (radial, degradado)
          const haloGrad = ctx.createRadialGradient(x, y, 0, x, y, blipSize * 3);
          haloGrad.addColorStop(0, `rgba(147,51,234,${alpha * 0.4})`);
          haloGrad.addColorStop(1, "rgba(147,51,234,0)");
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(x, y, blipSize * 3, 0, Math.PI * 2);
          ctx.fill();

          // Dibujamos el blip brillante en el centro
          ctx.beginPath();
          ctx.fillStyle = `rgba(147,51,234,${alpha})`;
          ctx.arc(x, y, blipSize, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Blip normal, sin pulso
          const baseSize = radarRadius * 0.02;
          ctx.beginPath();
          ctx.fillStyle = "rgba(147,51,234,0.3)";
          ctx.arc(x, y, baseSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.restore();

      // Actualizamos sweepAngle
      sweepAngle = (sweepAngle + 2) % 360; // Giro más rápido para visual más dinámico
      animationRef.current = requestAnimationFrame(drawFrame);
    };

    // Iniciamos la animación
    drawFrame();

    // Ajustamos tamaño del canvas en resize
    const handleResize = () => {
      width = canvas.parentElement?.clientWidth || 0;
      height = canvas.parentElement?.clientHeight || 0;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none z-[10]"
    />
  );
}
