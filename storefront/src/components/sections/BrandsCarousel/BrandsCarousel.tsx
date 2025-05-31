// storefront/src/components/sections/BrandsCarousel/BrandsCarousel.tsx
import { Carousel } from "@/components/cells"
import { SellersCard } from "@/components/organisms"
import { SellerProps } from "@/types/seller"

interface BrandsCarouselProps {
  brands: SellerProps[]
  title?: string
}

export function BrandsCarousel({ brands, title = "Featured Brands" }: BrandsCarouselProps) {
  if (!brands || brands.length === 0) {
    return null
  }

  return (
    <section className="py-12 w-full relative">
      {/* Subtle background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div 
          className="absolute bottom-10 right-20 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* Decorative line */}
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            
            <div className="space-y-1">
              <h2 className="heading-lg text-primary uppercase tracking-wider">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
                  {title}
                </span>
              </h2>
              
              {/* Subtitle */}
              <p className="text-sm text-secondary">
                Discover amazing brands and their unique collections
              </p>
            </div>
          </div>

          {/* Floating badge with count */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200/50 px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:scale-105 transition-all duration-300">
            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              {brands.length} Brands
            </span>
          </div>
        </div>

        {/* Carousel - SIMPLE */}
        <div className="relative">
          <Carousel
            align="start"
            items={brands.map((brand, index) => (
              <div
                key={brand.id}
                className="group relative"
              >
                {/* Halo effect for each card */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 -z-10"></div>
                
                {/* Card wrapper with enhanced animations */}
                <div className="relative transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                  <SellersCard
                    seller={brand}
                    showStats={true}
                  />
                </div>
              </div>
            ))}
          />
        </div>
      </div>
    </section>
  )
}