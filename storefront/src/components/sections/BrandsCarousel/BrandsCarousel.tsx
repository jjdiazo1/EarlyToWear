// storefront/src/components/sections/BrandsCarousel/BrandsCarousel.tsx
import { Carousel } from "@/components/cells"
import { BrandCard } from "@/components/organisms"
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
    <section className="py-8 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="heading-lg text-primary uppercase">
          {title}
        </h2>
      </div>
      <Carousel
        align="start"
        items={brands.map((brand) => (
          <BrandCard
            key={brand.id}
            seller={brand}
            showStats={true}
          />
        ))}
      />
    </section>
  )
}