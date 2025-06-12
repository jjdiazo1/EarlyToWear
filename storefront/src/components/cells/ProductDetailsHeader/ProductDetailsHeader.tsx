"use client"

import { Button } from "@/components/atoms"
import { HttpTypes } from "@medusajs/types"
import { ProductVariants } from "@/components/molecules"
import useGetAllSearchParams from "@/hooks/useGetAllSearchParams"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import { useState } from "react"
import { addToCart } from "@/lib/data/cart"
import { Chat } from "@/components/organisms/Chat/Chat"
import { SellerProps } from "@/types/seller"
import { WishlistButton } from "../WishlistButton/WishlistButton"
import { Wishlist } from "@/types/wishlist"
import clsx from "clsx"

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce(
    (
      acc: Record<string, string>,
      varopt: HttpTypes.StoreProductOptionValue
    ) => {
      acc[varopt.option?.title.toLowerCase() || ""] = varopt.value

      return acc
    },
    {}
  )
}

export const ProductDetailsHeader = ({
  product,
  locale,
  user,
  wishlist,
}: {
  product: HttpTypes.StoreProduct & { seller?: SellerProps }
  locale: string
  user: HttpTypes.StoreCustomer | null
  wishlist?: Wishlist[]
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const { allSearchParams } = useGetAllSearchParams()

  // set default variant
  const selectedVariant = {
    ...optionsAsKeymap(product?.variants?.[0].options ?? null),
    ...allSearchParams,
  }

  // get selected variant id
  const variantId =
    product.variants?.find(({ options }: { options: any }) =>
      options?.every((option: any) =>
        selectedVariant[option.option?.title.toLowerCase() || ""]?.includes(
          option.value
        )
      )
    )?.id || ""

  // get variant price - ROBUST VERSION
  const { variantPrice, cheapestPrice } = getProductPrice({
    product,
    variantId,
  })

  // Use variant price if available, otherwise use cheapest price
  const displayPrice = variantPrice || cheapestPrice;

  // Get current variant details
  const currentVariant = product.variants?.find(({ id }) => id === variantId);
  
  const variantStock = currentVariant?.inventory_quantity || 0;
  
  // 🔧 BETTER PRICE VALIDATION - Multiple fallbacks
  const variantHasPrice = !!(
    displayPrice?.calculated_price_number || 
    currentVariant?.calculated_price ||
    (currentVariant as any)?.prices?.length > 0
  );

  // Determine button state
  const isOutOfStock = variantStock <= 0;
  const canAddToCart = variantHasPrice && !isOutOfStock && variantId;

  // Enhanced debugging
  console.log('🔍 ENHANCED PRODUCT DEBUG:', {
    productId: product.id,
    variantId,
    currentVariant: {
      id: currentVariant?.id,
      title: currentVariant?.title,
      calculated_price: currentVariant?.calculated_price,
      prices: (currentVariant as any)?.prices,
      inventory_quantity: currentVariant?.inventory_quantity
    },
    displayPrice,
    variantHasPrice,
    canAddToCart,
    pricesLength: (currentVariant as any)?.prices?.length,
    productTitle: product.title,
    locale: locale
  });

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!variantId) {
      console.error('❌ No variant ID available for cart');
      return null;
    }

    if (!variantHasPrice) {
      console.error('❌ Variant has no price, cannot add to cart');
      return null;
    }

    console.log('🛒 Attempting to add to cart:', {
      variantId,
      variantHasPrice,
      displayPrice,
      currentVariant: currentVariant?.id
    });

    setIsAdding(true)

    try {
      await addToCart({
        variantId: variantId,
        quantity: 1,
        countryCode: 'co', // 🔧 FORCE Colombia for now
      })
      console.log('✅ Successfully added to cart');
    } catch (error) {
      console.error('❌ Failed to add to cart:', error);
      // You might want to show a user-friendly error message here
    } finally {
      setIsAdding(false)
    }
  }

  // Determine button text
  const getButtonText = () => {
    if (isAdding) return "ADDING TO CART...";
    if (!variantId) return "SELECT VARIANT";
    if (!variantHasPrice) return "PRICE NOT AVAILABLE";
    if (isOutOfStock) return "OUT OF STOCK";
    return "ADD TO CART";
  };

  const hasDiscount = displayPrice && 
    displayPrice.calculated_price_number !== displayPrice.original_price_number;

  return (
    <div className="border rounded-sm p-5">
      <div className="flex justify-between">
        <div>
          <h2 className="label-md text-secondary">
            {/* {product?.brand || "No brand"} */}
          </h2>
          <h1 className="heading-lg text-primary">{product.title}</h1>
          <div className="mt-2 flex gap-2 items-center">
            {displayPrice ? (
              <>
                <span className="heading-md text-primary">
                  {displayPrice.calculated_price}
                </span>
                {hasDiscount && (
                  <span className="label-md text-secondary line-through">
                    {displayPrice.original_price}
                  </span>
                )}
              </>
            ) : (
              <span className="heading-md text-gray-500">
                Price not available
              </span>
            )}
          </div>
          
          {/* Stock info */}
          {variantHasPrice && variantId && (
            <div className="mt-1">
              <span className="text-sm text-gray-600">
                {variantStock > 0 ? (
                  variantStock > 5 ? (
                    "In stock"
                  ) : (
                    `Only ${variantStock} left`
                  )
                ) : (
                  "Out of stock"
                )}
              </span>
            </div>
          )}

        </div>
        <div>
          {/* Add to Wishlist */}
          <WishlistButton
            productId={product.id}
            wishlist={wishlist}
            user={user}
          />
        </div>
      </div>
      
      {/* Product Variants */}
      <ProductVariants product={product} selectedVariant={selectedVariant} />
      
      {/* Add to Cart */}
      <Button
        onClick={handleAddToCart}
        disabled={!canAddToCart || isAdding}
        loading={isAdding}
        className={clsx(
          "w-full uppercase mb-4 py-3 flex justify-center transition-all duration-200",
          {
            "bg-gray-400 cursor-not-allowed": !canAddToCart,
            "hover:bg-indigo-700": canAddToCart && !isAdding,
          }
        )}
        size="large"
      >
        {getButtonText()}
      </Button>
      
      {/* Seller message */}
      {user && product.seller && (
        <Chat
          user={user}
          seller={product.seller}
          buttonClassNames="w-full uppercase"
          product={product}
        />
      )}
    </div>
  )
}