"use client";

import { Badge, Button } from "@/components/atoms";
import { CartDropdownItem } from "@/components/molecules";
import { Link } from "@/i18n/routing";
import { CartIcon } from "@/icons";
import { convertToLocale } from "@/lib/helpers/money";
import { HttpTypes } from "@medusajs/types";
import { useEffect, useRef, useState } from "react";
import { PortalDropdown } from "@/components/molecules";

const getItemCount = (cart: HttpTypes.StoreCart | null) => {
  return cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
};

export const CartDropdown = ({ cart }: { cart: HttpTypes.StoreCart | null }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = getItemCount(cart);
  const total = convertToLocale({
    amount: cart?.item_total || 0,
    currency_code: cart?.currency_code || "eur",
  });

  /**
   * Cerrar el dropdown al hacer clic fuera del contenedor
   * (para que no se quede abierto indefinidamente):
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    // 1) Esta envoltura “captura” hover + clic para abrir/cerrar el dropdown
    <div
      className="relative z-cart"
      ref={containerRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Ícono del carrito: clic para alternar visual */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative cursor-pointer p-1"
        aria-label="Abrir carrito"
      >
        <CartIcon
          size={24}
          className={`text-gray-600 hover:text-indigo-600 transition-colors duration-200 ${
            open ? "text-indigo-600" : ""
          }`}
        />
        {cartItemsCount > 0 && (
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                            border-2 border-white shadow-lg animate-pulse text-xs flex items-center justify-center">
            {cartItemsCount}
          </Badge>
        )}
      </button>

      {/* 2) El dropdown se “portaliza” y se dibuja en <body>, con posición fija */}
      <PortalDropdown show={open}>
        <div className="p-4">
          {/* Encabezado del dropdown */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            <h3
              className="text-lg font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                         bg-clip-text text-transparent uppercase tracking-wide"
            >
              Shopping Cart
            </h3>
          </div>

          {cartItemsCount > 0 ? (
            <>
              {/* 3) Aumentamos la altura máxima para ver 2–3 productos */}
              <div className="space-y-3 max-h-80 overflow-y-auto mb-4 pr-2">
                {cart?.items?.map((item) => (
                  <CartDropdownItem
                    key={item.id}
                    item={item}
                    currency_code={cart.currency_code}
                  />
                ))}
              </div>

              {/* Total y botón “Ver Carrito” */}
              <div className="border-t border-gray-200/50 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700 font-medium">Total</span>
                  <span
                    className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                               bg-clip-text text-transparent"
                  >
                    {total}
                  </span>
                </div>
                <Link href="/cart">
                  <button
                    className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 
                               hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl 
                               transition-all duration-300 flex justify-center items-center gap-2"
                  >
                    <span>Ver Carrito</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              </div>
            </>
          ) : (
            /* Estado vacío */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mx-auto mb-4 
                              flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-gray-400"
                >
                  <path
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                Tu carrito está vacío
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Agrega artículos para comenzar
              </p>
              <Link href="/categories">
                <button
                  className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 
                             hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl 
                             transition-all duration-300"
                >
                  Explorar productos
                </button>
              </Link>
            </div>
          )}
        </div>
      </PortalDropdown>
    </div>
  );
};
