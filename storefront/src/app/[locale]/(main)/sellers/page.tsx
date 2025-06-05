// storefront/src/app/[locale]/(main)/brands/page.tsx
import { BrandsListing } from "@/components/sections/BrandListing/BrandsListing"
import { listSellers } from "@/lib/data/seller"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Brands",
  description: "Discover amazing brands and their unique collections. Shop from trusted sellers and find your perfect style.",
}

interface BrandsPageProps {
  searchParams: Promise<{
    search?: string
    page?: string
  }>
}

export default async function SellersPage({ searchParams }: BrandsPageProps) {
  const { search = "" } = await searchParams
  
  // Fetch all brands
  const brands = await listSellers(100) // Get first 100 brands
  
  return (
    <main className="container">
      <BrandsListing 
        brands={brands}
        searchQuery={search}
      />
    </main>
  )
}