// storefront/src/components/cells/Navbar/Navbar.tsx
import { HttpTypes } from "@medusajs/types"
import { CategoryNavbar, NavbarSearch } from "@/components/molecules"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/atoms"

export const Navbar = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  return (
    <div className="flex border py-4 justify-between px-6">
      <div className="hidden md:flex items-center gap-6">
        <CategoryNavbar categories={categories} />
      </div>

      <NavbarSearch />
    </div>
  )
}