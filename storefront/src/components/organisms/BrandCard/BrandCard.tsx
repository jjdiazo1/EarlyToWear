import { Link } from "@/i18n/routing"
import Image from "next/image"
import { SellerProps } from "@/types/seller"
import { StarRating } from "@/components/atoms"

interface BrandCardProps {
  seller: SellerProps
  showStats?: boolean
}

export function BrandCard({ seller, showStats = true }: BrandCardProps) {
  const reviewCount = seller.reviews?.filter((rev) => rev !== null).length || 0
  const rating = seller.reviews && seller.reviews.length > 0
    ? seller.reviews
        .filter((rev) => rev !== null)
        .reduce((sum, r) => sum + (r?.rating || 0), 0) / reviewCount
    : 0

  return (
    <Link href={`/sellers/${seller.handle}`}>
      <div className="group relative border border-secondary rounded-sm bg-primary transition-all duration-300 p-6 flex flex-col items-center text-center min-h-[280px] w-[280px]">
        {/* Brand Logo/Avatar */}
        <div className="relative w-20 h-20 mb-4 overflow-hidden rounded-full bg-component">
          {seller.photo ? (
            <Image
              src={decodeURIComponent(seller.photo)}
              alt={seller.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-action text-white font-bold text-2xl">
              {seller.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Brand Name - Negro normal, rainbow en hover */}
        <h3 className="heading-md mb-2 text-primary font-bold group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {seller.name}
        </h3>
        {/* Brand Description */}
        <p className="text-sm text-secondary group-hover:text-gray-700 line-clamp-2 mb-4 flex-grow transition-colors duration-300">
          {seller.description?.replace(/<[^>]*>/g, '') || 'Premium fashion brand'}
        </p>

        {/* Stats */}
        {showStats && (
          <div className="flex flex-col items-center space-y-2">
            {rating > 0 && (
              <div className="flex items-center gap-2">
                <StarRating rate={rating} starSize={14} />
                <span className="text-sm text-secondary group-hover:text-gray-600 transition-colors duration-300">
                  ({reviewCount})
                </span>
              </div>
            )}
            {seller.products && (
              <span className="text-xs text-secondary group-hover:text-purple-600 transition-colors duration-300 font-medium">
                {seller.products.length} Products
              </span>
            )}
          </div>
        )}

        {/* Hover Effect - Solo border */}
        <div className="absolute inset-0 rounded-sm border-2 border-transparent group-hover:border-purple-300 transition-all duration-300 pointer-events-none" />
      </div>
    </Link>
  )
}