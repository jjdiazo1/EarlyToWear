"use client"
import Image from "next/image"

import { Button } from "@/components/atoms"
import { HttpTypes } from "@medusajs/types"
import { Link } from "@/i18n/routing"
import { getSellerProductPrice } from "@/lib/helpers/get-seller-product-price"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import { BaseHit, Hit } from "instantsearch.js"
import clsx from "clsx"
import { WishlistButton } from "@/components/cells/WishlistButton/WishlistButton"

export const ProductCard = ({
  product,
  sellerPage = false,
}: {
  product: Hit<HttpTypes.StoreProduct> | Partial<Hit<BaseHit>>
  sellerPage?: boolean
}) => {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const { cheapestPrice: sellerCheapestPrice } = getSellerProductPrice({
    product,
  })

  return (
    <div
      className={clsx(
        "relative group flex flex-col justify-between p-1 rounded-xl border border-gray-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1",
        {
          "w-[250px] lg:w-[370px]": sellerPage,
          "w-full h-full": !sellerPage,
        }
      )}
    >
      {/* Halo effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 -z-10"></div>
      
      <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-white aspect-square rounded-lg overflow-hidden">
        {/* Floating badge si hay descuento */}
        {sellerCheapestPrice?.calculated_price !== sellerCheapestPrice?.original_price && (
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              SALE
            </div>
          </div>
        )}

        <Link href={`/products/${product.handle}`}>
          <div className="overflow-hidden rounded-lg w-full h-full flex justify-center items-center p-2">
            {product.thumbnail ? (
              <Image
                src={decodeURIComponent(product.thumbnail)}
                alt={product.title}
                width={360}
                height={360}
                className="object-cover aspect-square w-full object-center h-full lg:group-hover:scale-110 transition-all duration-500 rounded-md"
                priority
              />
            ) : (
              <Image
                src="/images/placeholder.svg"
                alt="Product placeholder"
                width={100}
                height={100}
                className="flex margin-auto w-[100px] h-auto opacity-40"
              />
            )}
          </div>
        </Link>

        {/* Overlay button */}
        <Link href={`/products/${product.handle}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg flex items-end justify-center pb-4">
            <Button className="bg-white/90 backdrop-blur-md text-gray-900 hover:bg-white border border-white/20 shadow-lg hover:shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              View Details
            </Button>
          </div>
        </Link>
      </div>

      <Link href={`/products/${product.handle}`}>
        <div className="flex justify-between p-4">
          <div className="w-full">
            <h3 className="heading-sm truncate text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
              {product.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-semibold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {sellerCheapestPrice?.calculated_price ||
                  cheapestPrice?.calculated_price}
              </p>
              {(sellerCheapestPrice?.calculated_price
                ? sellerCheapestPrice?.calculated_price !==
                  sellerCheapestPrice?.original_price
                : cheapestPrice?.calculated_price !==
                  cheapestPrice?.original_price) && (
                <p className="text-sm text-gray-400 line-through">
                  {sellerCheapestPrice?.original_price || cheapestPrice?.original_price}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}