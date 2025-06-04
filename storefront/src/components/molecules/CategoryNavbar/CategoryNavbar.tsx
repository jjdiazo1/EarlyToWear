"use client"
import { HttpTypes } from "@medusajs/types"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { useParams, usePathname } from "next/navigation"
import { CollapseIcon } from "@/icons"

const aiNavigationItems = [
  {
    href: "/ai-search",
    label: "AI Search",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
        <path d="M11 8a3 3 0 100 6"/>
      </svg>
    ),
    gradient: "from-indigo-500 to-purple-600",
    hoverGradient: "from-indigo-600 to-purple-600"
  },
  {
    href: "/my-closet",
    label: "My Closet",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
    gradient: "from-purple-500 to-pink-600",
    hoverGradient: "from-purple-600 to-pink-600"
  },
  {
    href: "/guides",
    label: "Guides",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
    gradient: "from-indigo-500 to-cyan-600",
    hoverGradient: "from-indigo-600 to-cyan-600"
  },
  {
    href: "/pricing",
    label: "Pricing",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-600",
    hoverGradient: "from-emerald-600 to-teal-600"
  },
  {
    href: "/about",
    label: "About Us",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
      </svg>
    ),
    gradient: "from-rose-500 to-orange-600",
    hoverGradient: "from-rose-600 to-orange-600"
  }
]

export const CategoryNavbar = ({
  categories,
  onClose,
}: {
  categories?: HttpTypes.StoreProductCategory[]
  onClose?: (state: boolean) => void
}) => {
  const { category } = useParams()
  const pathname = usePathname()

  const isAllProductsActive = pathname === '/categories' || pathname.startsWith('/categories/')
  const isAllBrandsActive = pathname === '/brands' || pathname.startsWith('/brands/')
  const isHomeActive = pathname === '/'

  return (
    <nav className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-lg p-2">
      <div className="flex md:items-center flex-col md:flex-row gap-1">
        
        {/* Home Link */}
        <Link
          href="/"
          onClick={() => (onClose ? onClose(false) : null)}
          className={cn(
            "px-4 py-2 rounded-lg label-md uppercase font-medium",
            "transition-all duration-150 ease-in-out",
            "flex items-center justify-between gap-2",
            isHomeActive
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
              : "text-gray-600 hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
          )}
        >
          <div className="flex items-center gap-2">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={cn(
                "transition-colors duration-150",
                isHomeActive ? "text-white" : "text-gray-500"
              )}
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            <span>Home</span>
          </div>
          <CollapseIcon size={18} className={cn(
            "-rotate-90 md:hidden",
            isHomeActive ? "text-white/80" : "text-gray-400"
          )} />
        </Link>
        
        {/* All Products Link */}
        <Link
          href="/categories"
          onClick={() => (onClose ? onClose(false) : null)}
          className={cn(
            "px-4 py-2 rounded-lg label-md uppercase font-medium",
            "transition-all duration-150 ease-in-out",
            "flex items-center justify-between gap-2",
            isAllProductsActive && !category
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
              : "text-gray-600 hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
          )}
        >
          <div className="flex items-center gap-2">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={cn(
                "transition-colors duration-150",
                isAllProductsActive && !category ? "text-white" : "text-gray-500"
              )}
            >
              <path d="M3 3h18v18H3z"/>
              <path d="M9 9h6v6H9z"/>
              <path d="M6 6h.01"/>
              <path d="M6 18h.01"/>
              <path d="M18 6h.01"/>
              <path d="M18 18h.01"/>
            </svg>
            <span>All Products</span>
          </div>
          <CollapseIcon 
            size={18} 
            className={cn(
              "-rotate-90 md:hidden",
              isAllProductsActive && !category ? "text-white/80" : "text-gray-400"
            )} 
          />
        </Link>

        {/* All Brands Link */}
        <Link
          href="/brands"
          onClick={() => (onClose ? onClose(false) : null)}
          className={cn(
            "px-4 py-2 rounded-lg label-md uppercase font-medium",
            "transition-all duration-150 ease-in-out",
            "flex items-center justify-between gap-2",
            isAllBrandsActive
              ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md"
              : "text-gray-600 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text hover:text-transparent"
          )}
        >
          <div className="flex items-center gap-2">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={cn(
                "transition-colors duration-150",
                isAllBrandsActive ? "text-white" : "text-gray-500"
              )}
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            <span>All Brands</span>
          </div>
          <CollapseIcon 
            size={18} 
            className={cn(
              "-rotate-90 md:hidden",
              isAllBrandsActive ? "text-white/80" : "text-gray-400"
            )} 
          />
        </Link>

        {/* AI Features Links */}
        {aiNavigationItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => (onClose ? onClose(false) : null)}
              className={cn(
                "px-4 py-2 rounded-lg label-md uppercase font-medium",
                "transition-all duration-150 ease-in-out",
                "flex items-center justify-between gap-2",
                isActive
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-md`
                  : `text-gray-600 hover:scale-105 hover:bg-gradient-to-r ${item.hoverGradient} hover:bg-clip-text hover:text-transparent`
              )}
            >
              <div className="flex items-center gap-2">
                <div className={cn(
                  "transition-colors duration-150",
                  isActive ? "text-white" : "text-gray-500"
                )}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </div>
              <CollapseIcon 
                size={18} 
                className={cn(
                  "-rotate-90 md:hidden",
                  isActive ? "text-white/80" : "text-gray-400"
                )} 
              />
            </Link>
          )
        })}

        {/* Category Links (if provided) */}
        {categories?.map(({ id, handle, name }) => {
          const isActive = handle === category
          
          return (
            <Link
              key={id}
              href={`/categories/${handle}`}
              onClick={() => (onClose ? onClose(false) : null)}
              className={cn(
                "px-4 py-2 rounded-lg label-md uppercase font-medium",
                "transition-all duration-150 ease-in-out",
                "flex items-center justify-between",
                isActive 
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md" 
                  : "text-gray-600 hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
              )}
            >
              {name}
              <CollapseIcon 
                size={18} 
                className={cn(
                  "-rotate-90 md:hidden",
                  isActive ? "text-white/80" : "text-gray-400"
                )} 
              />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}