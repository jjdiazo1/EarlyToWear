"use client"
import { HttpTypes } from "@medusajs/types"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { useParams, usePathname } from "next/navigation"
import { CollapseIcon } from "@/icons"

export const CategoryNavbar = ({
  categories,
  onClose,
}: {
  categories: HttpTypes.StoreProductCategory[]
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
            "flex items-center justify-between",
            isAllProductsActive && !category
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
              : "text-gray-600 hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
          )}
        >
          All Products
          <CollapseIcon size={18} className="-rotate-90 md:hidden text-gray-400" />
        </Link>

        {/* All Brands Link */}
        <Link
          href="/brands"
          onClick={() => (onClose ? onClose(false) : null)}
          className={cn(
            "px-4 py-2 rounded-lg label-md uppercase font-medium",
            "transition-all duration-150 ease-in-out",
            "flex items-center justify-between",
            isAllBrandsActive
              ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md"
              : "text-gray-600 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text hover:text-transparent"
          )}
        >
          All Brands
          <CollapseIcon size={18} className={cn(
            "-rotate-90 md:hidden",
            isAllBrandsActive ? "text-white/80" : "text-gray-400"
          )} />
        </Link>

        {/* Category Links */}
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