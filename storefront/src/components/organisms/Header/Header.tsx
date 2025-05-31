import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

import {
  CartDropdown,
  HeadingCategories,
  MobileNavbar,
  Navbar,
} from "@/components/cells"
import { Link } from "@/i18n/routing"
import { HeartIcon } from "@/icons"
import { listCategories } from "@/lib/data/categories"
import { PARENT_CATEGORIES } from "@/const"
import { retrieveCart } from "@/lib/data/cart"
import { UserDropdown } from "@/components/cells/UserDropdown/UserDropdown"
import { retrieveCustomer } from "@/lib/data/customer"
import { getUserWishlists } from "@/lib/data/wishlist"
import { Wishlist } from "@/types/wishlist"
import { Badge } from "@/components/atoms"

export const Header = async () => {
  const cart = await retrieveCart().catch(() => null)
  const user = await retrieveCustomer()
  let wishlist: Wishlist[] = []
  if (user) {
    const response = await getUserWishlists()
    wishlist = response.wishlists
  }

  const wishlistCount = wishlist?.[0]?.products.length || 0

  const { categories, parentCategories } = (await listCategories({
    headingCategories: PARENT_CATEGORIES,
  })) as {
    categories: HttpTypes.StoreProductCategory[]
    parentCategories: HttpTypes.StoreProductCategory[]
  }

  return (
    <header className="relative bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      {/* Elementos decorativos sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-100/20 to-blue-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex py-3 lg:px-8 px-4">
        <div className="flex items-center lg:w-1/3">
          <MobileNavbar
            parentCategories={parentCategories}
            childrenCategories={categories}
          />
          <HeadingCategories categories={parentCategories} />
        </div>
        
        <div className="flex lg:justify-center lg:w-1/3 items-center pl-4 lg:pl-0">
          <Link href="/" className="text-3xl font-bold uppercase group transition-transform duration-300 hover:scale-105 font-['Anton'] tracking-wide">
            <div className="relative">
              {/* Glow effect en el logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              Early To Wear
            </div>
          </Link>
        </div>
        
        <div className="flex items-center justify-end gap-3 lg:gap-5 w-full lg:w-1/3 py-2">
          {/* User dropdown con efecto */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <UserDropdown user={user} />
          </div>

          {/* Wishlist con efecto */}
          {user && (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Link href="/user/wishlist" className="relative p-2 hover:scale-110 transition-transform duration-200">
                <HeartIcon size={20} className="text-gray-600 group-hover:text-pink-600 transition-colors duration-200" />
                {Boolean(wishlistCount) && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white border-2 border-white shadow-lg animate-pulse">
                    {wishlistCount}
                  </Badge>
                )}
              </Link>
            </div>
          )}

          {/* Cart dropdown con efecto */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CartDropdown cart={cart} />
          </div>
        </div>
      </div>
      
      {/* Navbar con fondo mejorado */}
      <div className="relative bg-white/60 backdrop-blur-sm border-t border-gray-200/30">
        <Navbar categories={categories} />
      </div>
    </header>
  )
}