"use client"

import { Divider, LogoutButton, NavigationItem } from "@/components/atoms"
import { Link } from "@/i18n/routing"
import { ProfileIcon } from "@/icons"
import { HttpTypes } from "@medusajs/types"
import { useState } from "react"

export const UserDropdown = ({
  user,
}: {
  user: HttpTypes.StoreCustomer | null
}) => {
  const [open, setOpen] = useState(false)

  // Usaremos un temporizador para manejar el onMouseLeave
  // para que haya un pequeño lapso antes de que se cierre,
  // permitiendo que el mouse se mueva entre el ícono y el menú.
  let timeoutId: NodeJS.Timeout | null = null;

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Si hay un temporizador activo, lo cancelamos
      timeoutId = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    // Iniciamos un temporizador para cerrar el dropdown.
    // Esto da tiempo para que el mouse se mueva entre el trigger y el dropdown.
    timeoutId = setTimeout(() => {
      setOpen(false);
    }, 200); // Aumenté el retraso a 200ms para mayor tolerancia
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Si el mouse entra al dropdown, cancelamos el temporizador de cierre
      timeoutId = null;
    }
    setOpen(true); // Aseguramos que esté abierto
  }

  const handleDropdownMouseLeave = () => {
    // Cuando el mouse sale del dropdown, iniciamos el temporizador para cerrar
    timeoutId = setTimeout(() => {
      setOpen(false);
    }, 200);
  }


  return (
    // Este div es el contenedor principal. Los eventos de ratón
    // aquí controlarán la apertura y cierre general.
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter} // Abre cuando el mouse entra en el área general
      onMouseLeave={handleMouseLeave} // Cierra cuando el mouse sale del área general (con retraso)
      onFocus={() => setOpen(true)} // Abre con foco de teclado
      onBlur={() => setOpen(false)} // Cierra con pérdida de foco de teclado
    >
      <Link
        href="/user"
        className="relative block p-2 rounded-full transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        aria-label="User Profile"
      >
        <ProfileIcon size={24} className="text-primary" />
      </Link>

      {/* Este es el div que actúa como el dropdown, con TODOS los estilos del Design System */}
      {/* Añadimos sus propios eventos onMouseEnter/onMouseLeave para un control más fino */}
      <div
        className={`
          absolute right-0 mt-2 z-50 // Posicionamiento
          bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-lg // Glassmorphism y bordes
          transition-all duration-300 transform origin-top-right // Transiciones
          ${open ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'} // Control de visibilidad y animación
          p-4 // Padding interno del dropdown
        `}
        onMouseEnter={handleDropdownMouseEnter} // Si el mouse entra al dropdown, asegúrate de que esté abierto
        onMouseLeave={handleDropdownMouseLeave} // Si el mouse sale del dropdown, inicia el cierre (con retraso)
      >
        {user ? (
          <div>
            <div className="lg:w-[200px]">
              <h3
                className="
                  uppercase border-b border-gray-200/50 pb-2 mb-2
                  bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent
                  font-['Anton'] tracking-wider text-xl
                "
              >
                Your account
              </h3>
            </div>
            <NavigationItem href="/user/orders" className="py-2 px-4 rounded-lg hover:bg-indigo-500/10 transition-all duration-200 block text-secondary label-md">Orders</NavigationItem>
            <NavigationItem href="/user/addresses" className="py-2 px-4 rounded-lg hover:bg-indigo-500/10 transition-all duration-200 block text-secondary label-md">Addresses</NavigationItem>
            <NavigationItem href="/user/reviews" className="py-2 px-4 rounded-lg hover:bg-indigo-500/10 transition-all duration-200 block text-secondary label-md">Reviews</NavigationItem>
            <NavigationItem href="/user/wishlist" className="py-2 px-4 rounded-lg hover:bg-indigo-500/10 transition-all duration-200 block text-secondary label-md">Wishlist</NavigationItem>
            <Divider className="my-2 border-gray-200/50" />
            <NavigationItem href="/user/settings" className="py-2 px-4 rounded-lg hover:bg-indigo-500/10 transition-all duration-200 block text-secondary label-md">Settings</NavigationItem>
            <LogoutButton className="
                mt-2 w-full
                bg-white/80 backdrop-blur-md border border-gray-200/50 text-gray-900 px-4 py-2 rounded-lg font-medium
                hover:bg-white hover:scale-[1.01] transition-all duration-300 shadow-sm hover:shadow-md
            " />
          </div>
        ) : (
          <div>
            <NavigationItem href="/user" className="py-2 px-4 rounded-lg hover:bg-indigo-500/10 transition-all duration-200 block text-secondary label-md normal-case">Login</NavigationItem>
            <NavigationItem href="/user/register" className="py-2 px-4 rounded-lg hover:bg-indigo-500/10 transition-all duration-200 block text-secondary label-md normal-case">Register</NavigationItem>
          </div>
        )}
      </div>
    </div>
  )
}