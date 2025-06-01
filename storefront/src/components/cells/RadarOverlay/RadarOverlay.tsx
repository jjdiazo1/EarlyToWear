// components/cells/RadarOverlay/RadarOverlay.tsx

"use client";

import { useEffect, useRef } from "react";

export default function RadarOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  // Tiendas ficticias (ángulo en °, radio normalizado)
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

    // Ajustamos tamaño del canvas
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    const radarRadius = (size / 2) * 0.9; // 90% del semilado menor

    let sweepAngle = 0; // Ángulo inicial de la manecilla

    const drawFrame = () => {
      if (!ctx) return;

      // Limpiamos el canvas cada fotograma
      ctx.clearRect(0, 0, width, height);

      /** 1. Dibujamos la cuadrícula de radar (círculos concéntricos + líneas radiales) **/
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // Círculos concéntricos (líneas de rango)
      ctx.strokeStyle = "rgba(147,51,234,0.08)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        const radius = (radarRadius * i) / 4;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Líneas radiales (ejes cardinales)
      ctx.strokeStyle = "rgba(147,51,234,0.06)";
      ctx.lineWidth = 1;
      for (let angle = 0; angle < 360; angle += 45) {
        const rad = (angle * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(rad) * radarRadius, Math.sin(rad) * radarRadius);
        ctx.stroke();
      }
      
      // Contorno circular exterior
      ctx.strokeStyle = "rgba(147,51,234,0.12)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, radarRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      /** 2. Dibujamos la manecilla + halo "follow" ampliado **/
      ctx.save();
      ctx.translate(centerX, centerY);
      const sweepRad = (sweepAngle * Math.PI) / 180;

      // Línea sólida de la manecilla
      ctx.strokeStyle = "rgba(147,51,234,0.9)"; // púrpura intenso
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(
        Math.cos(sweepRad) * radarRadius,
        Math.sin(sweepRad) * radarRadius
      );
      ctx.stroke();

      // Halo posterior: un arco de 60° detrás de la manecilla (área balanceada)
      const haloWidthDeg = 60; // área balanceada para el halo
      const haloStart = sweepRad - (haloWidthDeg * Math.PI) / 180;
      const haloEnd = sweepRad;
      const haloGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radarRadius);
      haloGrad.addColorStop(0, "rgba(147,51,234,0.5)");
      haloGrad.addColorStop(0.4, "rgba(147,51,234,0.25)");
      haloGrad.addColorStop(1, "rgba(147,51,234,0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radarRadius, haloStart, haloEnd);
      ctx.closePath();
      ctx.fill();

      // Punto brillante en la punta de la manecilla
      const glowX = Math.cos(sweepRad) * radarRadius;
      const glowY = Math.sin(sweepRad) * radarRadius;
      const pointerGrad = ctx.createRadialGradient(
        glowX,
        glowY,
        0,
        glowX,
        glowY,
        radarRadius * 0.06
      );
      pointerGrad.addColorStop(0, "rgba(147,51,234,1)");
      pointerGrad.addColorStop(1, "rgba(147,51,234,0)");
      ctx.fillStyle = pointerGrad;
      ctx.beginPath();
      ctx.arc(glowX, glowY, radarRadius * 0.06, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      /** 3. Dibujamos los blips con fade-out super gradual **/
      ctx.save();
      ctx.translate(centerX, centerY);
      blips.forEach((blip) => {
        const angleRad = (blip.angle * Math.PI) / 180;
        const r = blip.radius * radarRadius;
        const x = Math.cos(angleRad) * r;
        const y = Math.sin(angleRad) * r;

        // Distancia angular entre sweepAngle y el ángulo del blip
        let delta = Math.abs((sweepAngle % 360) - blip.angle);
        if (delta > 180) delta = 360 - delta; // wrap-around

        // 1) Si delta < 8°, blip "brillante" al máximo (+halo)
        if (delta < 8) {
          const fadeFactor = 1 - delta / 8; // 1 cuando delta=0, 0 cuando delta=8
          const maxSize = radarRadius * 0.05; // tamaño máximo
          const blipSize = maxSize * (0.7 + 0.3 * fadeFactor); // de 70% a 100%
          const alpha = 0.4 + 0.6 * fadeFactor; // de 0.4 a 1

          // Halo del blip brillante
          const haloGrad = ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            blipSize * 4
          );
          haloGrad.addColorStop(0, `rgba(147,51,234,${alpha * 0.4})`);
          haloGrad.addColorStop(1, "rgba(147,51,234,0)");
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(x, y, blipSize * 4, 0, Math.PI * 2);
          ctx.fill();

          // Círculo central brillante
          ctx.beginPath();
          ctx.fillStyle = `rgba(147,51,234,${alpha})`;
          ctx.arc(x, y, blipSize, 0, Math.PI * 2);
          ctx.fill();
        }
        // 2) Si 8° ≤ delta < 25°, primera fase de fade-out gradual
        else if (delta < 25) {
          const fadeFactor2 = 1 - (delta - 8) / 17; // 1 a los 8°, 0 a los 25°
          const baseSize = radarRadius * 0.022;
          const fadeSize = baseSize * (1 + 0.6 * fadeFactor2); // puede crecer un 60%
          const alpha2 = 0.35 * fadeFactor2; // de 0.35 a 0

          // Halo durante primera fase de fade-out
          const haloGrad2 = ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            fadeSize * 3
          );
          haloGrad2.addColorStop(0, `rgba(147,51,234,${alpha2 * 0.5})`);
          haloGrad2.addColorStop(1, "rgba(147,51,234,0)");
          ctx.fillStyle = haloGrad2;
          ctx.beginPath();
          ctx.arc(x, y, fadeSize * 3, 0, Math.PI * 2);
          ctx.fill();

          // Círculo de blip en primera fase
          ctx.beginPath();
          ctx.fillStyle = `rgba(147,51,234,${alpha2})`;
          ctx.arc(x, y, fadeSize, 0, Math.PI * 2);
          ctx.fill();
        }
        // 3) Si 25° ≤ delta < 90°, segunda fase de fade-out MUY gradual
        else if (delta < 90) {
          const fadeFactor3 = 1 - (delta - 25) / 65; // 1 a los 25°, 0 a los 90°
          const baseSize = radarRadius * 0.019;
          const fadeSize = baseSize * (1 + 0.3 * fadeFactor3); // crecimiento mínimo
          const alpha3 = 0.25 * fadeFactor3; // de 0.25 a 0 (muy gradual)

          // Halo muy sutil durante fade-out prolongado
          if (fadeFactor3 > 0.3) {
            const haloGrad3 = ctx.createRadialGradient(
              x,
              y,
              0,
              x,
              y,
              fadeSize * 2.5
            );
            haloGrad3.addColorStop(0, `rgba(147,51,234,${alpha3 * 0.3})`);
            haloGrad3.addColorStop(1, "rgba(147,51,234,0)");
            ctx.fillStyle = haloGrad3;
            ctx.beginPath();
            ctx.arc(x, y, fadeSize * 2.5, 0, Math.PI * 2);
            ctx.fill();
          }

          // Círculo de blip en fade-out prolongado
          ctx.beginPath();
          ctx.fillStyle = `rgba(147,51,234,${alpha3})`;
          ctx.arc(x, y, fadeSize, 0, Math.PI * 2);
          ctx.fill();
        }
        // 4) Si delta ≥ 90°, blip base muy tenue
        else {
          const baseSize = radarRadius * 0.016;
          ctx.beginPath();
          ctx.fillStyle = "rgba(147,51,234,0.15)";
          ctx.arc(x, y, baseSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.restore();

      // Incrementamos el ángulo de la manecilla (aún más lento)
      sweepAngle = (sweepAngle + 0.8) % 360;

      animationRef.current = requestAnimationFrame(drawFrame);
    };

    // Iniciamos la animación
    drawFrame();

    // Ajuste en resize
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