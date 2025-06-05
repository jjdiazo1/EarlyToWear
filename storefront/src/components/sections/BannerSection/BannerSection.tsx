// components/BannerSection.tsx

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/atoms";
import { Link } from "@/i18n/routing";
import dynamic from "next/dynamic";

// Dynamically import the RadarOverlay so that it only runs in the browser
const RadarOverlay = dynamic(
  () => import("@/components/cells/RadarOverlay/RadarOverlay"),
  { ssr: false }
);

export const BannerSection = () => {
  // Coordenadas por defecto (Chapinero, Bogotá)
  const CHAPINERO_LAT = 4.6533;
  const CHAPINERO_LNG = -74.0630;

  // Estado para latitud/longitud (inicial = Chapinero)
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: CHAPINERO_LAT,
    lng: CHAPINERO_LNG,
  });

  // Estado para saber si ya se obtuvo la geolocalización
  const [locationLoaded, setLocationLoaded] = useState(false);

  // Al montar, intentamos obtener geolocalización del usuario
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationLoaded(true);
        },
        (error) => {
          console.log("Geolocation error:", error.message);
          // Si deniega o hay error, dejamos Chapinero
          setCoords({ lat: CHAPINERO_LAT, lng: CHAPINERO_LNG });
          setLocationLoaded(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutos
        }
      );
    } else {
      // Si no hay geolocalización disponible, usar Chapinero
      setLocationLoaded(true);
    }
  }, []);

  // URL para el iframe de Google Maps
  const mapSrc = `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`;

  return (
    <section className="relative bg-primary text-primary overflow-hidden py-12 lg:py-24">
      {/* 1. Decoraciones de fondo */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute top-20 left-20 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-24 right-24 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-40 right-40 w-48 h-48 bg-pink-200/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* 2. Texto + Botón (columna izquierda) */}
          <div className="relative z-10 flex">
            <div className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] w-full h-[500px] p-8 flex flex-col justify-between">
              {/* Halo interno al hacer hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />

              {/* Contenido superior */}
              <div className="flex-1">
                <span className="inline-block text-sm font-medium px-4 py-1 border border-secondary rounded-full bg-white/90 backdrop-blur-sm">
                  #LOCAL LOVE
                </span>
                <h1 className="mt-4 mb-4 font-bold uppercase text-3xl lg:text-4xl xl:text-5xl leading-tight">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Discover Local Brands & End Fast Fashion
                  </span>
                </h1>
                <p className="text-base lg:text-lg text-secondary max-w-lg leading-relaxed">
                  Support community entrepreneurs, uncover unique pieces, and join
                  the movement to end fast fashion. Be the change!
                </p>
              </div>

              {/* Botón en la parte inferior */}
              <div className="pt-6">
                <Link href="/brands">
                  <Button className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 tracking-wide">
                    <span>Explore Local</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Mapa + Radar (columna derecha, mismo tamaño) */}
          <div className="relative z-10 flex">
            <div className="group relative w-full h-[500px] overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              {/* Halo sobre el mapa al hacer hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />

              {/* Loading state */}
              {!locationLoaded && (
                <div className="absolute inset-0 bg-gray-100 rounded-2xl flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Cargando mapa...</p>
                  </div>
                </div>
              )}

              {/* Google Maps iframe */}
              <iframe
                src={mapSrc}
                className="w-full h-full rounded-2xl border-0"
                allowFullScreen
                loading="lazy"
              />

              {/* Overlay del Radar - solo se muestra cuando las coordenadas están listas */}
              {locationLoaded && (
                <RadarOverlay />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};