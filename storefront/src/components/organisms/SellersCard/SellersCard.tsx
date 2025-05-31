// storefront/src/components/organisms/SellersCard/SellersCard.tsx
import { SellerProps } from "@/types/seller"
import { StarIcon } from "@/icons"
import { ShoppingBag } from "@medusajs/icons"
import Link from "next/link"
import Image from "next/image"

interface SellersCardProps {
  seller: SellerProps
  showStats?: boolean
  size?: 'default' | 'compact'
}

export function SellersCard({ seller, showStats = false, size = 'default' }: SellersCardProps) {
  // Calculate derived values from available data
  const totalProducts = seller.products?.length || 0
  const averageRating = seller.reviews?.length 
    ? seller.reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / seller.reviews.length 
    : 0
  const location = seller.city && seller.country_code 
    ? `${seller.city}, ${seller.country_code}` 
    : seller.city || seller.country_code || null

  return (
    <Link href={`/brands/${seller.handle || seller.id}`} className="block w-full">
      <article className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden min-w-[320px]">
        {/* Shine effect overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full z-20"></div>
        
        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Header with image and basic info */}
          <div className="flex items-start gap-4 mb-4">
            {/* Brand Image */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-md">
                {seller.photo ? (
                  <Image
                    src={seller.photo}
                    alt={seller.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {seller.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Status indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white"></div>
            </div>

            {/* Brand Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-primary group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 truncate">
                {seller.name}
              </h3>
              
              {seller.description && (
                <p className="text-sm text-secondary line-clamp-2 mt-1">
                  {seller.description}
                </p>
              )}

              {/* Rating if available */}
              {averageRating > 0 && (
                <div className="flex items-center gap-1 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        size={12}
                        className={`${
                          i < Math.floor(averageRating) 
                            ? 'text-amber-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-secondary ml-1">
                    {averageRating.toFixed(1)} ({seller.reviews?.length || 0})
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Stats Section */}
          {showStats && (totalProducts > 0 || (seller.reviews && seller.reviews.length > 0)) && (
            <>
              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {totalProducts > 0 && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-100/50">
                    <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-600">Products</p>
                      <p className="font-semibold text-sm text-indigo-700 truncate mt-0.5">
                        {totalProducts}
                      </p>
                    </div>
                  </div>
                )}

                {seller.reviews && seller.reviews.length > 0 && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-100/50">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <StarIcon size={12} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-600">Reviews</p>
                      <p className="font-semibold text-sm text-purple-700 truncate mt-0.5">
                        {seller.reviews.length}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Featured Products Preview */}
              {seller.products && seller.products.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-secondary mb-2 font-medium">Latest Items</p>
                  <div className="flex gap-1">
                    {seller.products.slice(0, 4).map((product, index) => (
                      <div 
                        key={product.id || index} 
                        className="w-8 h-8 rounded-md overflow-hidden bg-gray-100 flex-shrink-0"
                      >
                        {(product as any).thumbnail || (product as any).image ? (
                          <Image
                            src={(product as any).thumbnail || (product as any).image}
                            alt=""
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* CTA Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
            <span className="text-sm text-secondary">
              {location || 'Premium Seller'}
            </span>
            
            {/* Floating action button */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:scale-105 transition-all duration-200 shadow-lg">
              View Store
            </div>
          </div>

          {/* Join date badge */}
          {seller.created_at && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
              {new Date(seller.created_at).getFullYear()}
            </div>
          )}

          {/* Email verified badge (if email exists, assume verified) */}
          {seller.email && (
            <div className="absolute top-3 left-3 w-5 h-5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}