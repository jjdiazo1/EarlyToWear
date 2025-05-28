// storefront/src/components/sections/BrandDetail/BrandDetail.tsx
import { SellerProps } from "@/types/seller"
import { HttpTypes } from "@medusajs/types"
import { StarRating, Button, Divider } from "@/components/atoms"
import { Chat } from "@/components/organisms/Chat/Chat"
import Image from "next/image"
import { format } from "date-fns"
import { DoneIcon, MessageIcon } from "@/icons"

interface BrandDetailProps {
  seller: SellerProps
  user?: HttpTypes.StoreCustomer | null
}

export function BrandDetail({ seller, user }: BrandDetailProps) {
  const reviewCount = seller.reviews?.filter((rev) => rev !== null).length || 0
  const rating = seller.reviews && seller.reviews.length > 0
    ? seller.reviews
        .filter((rev) => rev !== null)
        .reduce((sum, r) => sum + (r?.rating || 0), 0) / reviewCount
    : 0

  return (
    <div className="border rounded-sm p-6 bg-primary">
      {/* Brand Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-6">
        {/* Brand Avatar */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-component flex-shrink-0">
          {seller.photo ? (
            <Image
              src={decodeURIComponent(seller.photo)}
              alt={seller.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-action text-tertiary font-bold text-3xl">
              {seller.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Brand Info */}
        <div className="flex-grow">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="heading-lg text-primary mb-2">{seller.name}</h1>
              <div className="flex items-center gap-4 text-sm text-secondary">
                {rating > 0 && (
                  <div className="flex items-center gap-2">
                    <StarRating rate={rating} starSize={16} />
                    <span>{rating.toFixed(1)} ({reviewCount} reviews)</span>
                  </div>
                )}
                <Divider orientation="vertical" className="h-4" />
                <span>Joined {format(new Date(seller.created_at), "MMMM yyyy")}</span>
                {seller.products && (
                  <>
                    <Divider orientation="vertical" className="h-4" />
                    <span>{seller.products.length} Products</span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            {user && (
              <div className="flex items-center gap-3">
                <Chat
                  user={user}
                  seller={seller}
                  icon
                  buttonClassNames="w-12 h-12 flex justify-center items-center"
                />
                <Button variant="tonal" className="uppercase">
                  Follow
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Brand Description */}
      {seller.description && (
        <div className="mb-6">
          <h3 className="heading-sm text-primary mb-3">About {seller.name}</h3>
          <div 
            className="text-secondary leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: seller.description,
            }}
          />
        </div>
      )}

      {/* Brand Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-component rounded-sm">
        <div className="text-center">
          <div className="heading-md text-primary">{seller.products?.length || 0}</div>
          <div className="text-sm text-secondary uppercase">Products</div>
        </div>
        <div className="text-center">
          <div className="heading-md text-primary">{reviewCount}</div>
          <div className="text-sm text-secondary uppercase">Reviews</div>
        </div>
        <div className="text-center">
          <div className="heading-md text-primary">{rating > 0 ? rating.toFixed(1) : '0.0'}</div>
          <div className="text-sm text-secondary uppercase">Rating</div>
        </div>
        <div className="text-center">
          <div className="heading-md text-primary">
            {format(new Date(seller.created_at), "yyyy")}
          </div>
          <div className="text-sm text-secondary uppercase">Since</div>
        </div>
      </div>
    </div>
  )
}