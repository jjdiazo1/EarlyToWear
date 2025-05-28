// storefront/src/components/sections/BrandsListing/BrandsListing.tsx
import { BrandCard } from "@/components/organisms"
import { SellerProps } from "@/types/seller"
import { Input } from "@/components/atoms"
import { SearchIcon } from "@/icons"

interface BrandsListingProps {
  brands: SellerProps[]
  searchQuery?: string
}

export function BrandsListing({ brands, searchQuery = "" }: BrandsListingProps) {
  // Filter brands based on search query
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container">
      <div className="py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-xl uppercase mb-4">All Brands</h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Discover amazing brands and their unique collections. Each brand brings its own style and story.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <Input
            icon={<SearchIcon size={20} />}
            placeholder="Search brands..."
            defaultValue={searchQuery}
            className="w-full"
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-secondary">
            {filteredBrands.length} brand{filteredBrands.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Brands Grid */}
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <BrandCard
                key={brand.id}
                seller={brand}
                showStats={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="heading-lg text-primary uppercase mb-4">
              No brands found
            </h3>
            <p className="text-lg text-secondary">
              Try adjusting your search criteria or browse all brands.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}