// components/PortalDropdown.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PortalDropdownProps = {
  show: boolean;
  children: ReactNode;
};

/**
 * Este componente monta su contenido en <body> mediante un portal,
 * con posición fixed en la parte superior-derecha, y sin transparencia.
 * CORREGIDO: Ahora propaga correctamente los eventos de navegación.
 */
export function PortalDropdown({ show, children }: PortalDropdownProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!show || !mounted) return null;

  return createPortal(
    <div
      className="
        fixed
        top-12      /* Mantenido bien alto */
        right-4     /* Poca separación de la derecha */
        z-dropdown  /* z-index: 999999 */
        w-80        /* Ancho fijo de 20rem = 320px */
        bg-white    /* Fondo completamente opaco */
        rounded-2xl /* Borde redondeado */
        shadow-2xl  /* Sombra pronunciada */
        border
        border-gray-200/50
        overflow-hidden
      "
      // CRÍTICO: Evitar que el portal interfiera con eventos de navegación
      onClick={(e) => {
        // No stopPropagation aquí para que los eventos lleguen a los botones
        console.log("Portal clicked, but not stopping propagation");
      }}
      // Asegurar que los eventos de mouse no interfieran
      onMouseDown={(e) => {
        // No preventDefault aquí
        console.log("Portal mouse down, allowing default behavior");
      }}
    >
      {children}
    </div>,
    document.body
  );
}