// storefront/src/lib/data/sellers.ts
"use server"

import { SellerProps } from "@/types/seller"
import { sdk } from "../config"

export const listSellers = async (
  limit: number = 50,
  offset: number = 0
): Promise<SellerProps[]> => {
  try {
    return sdk.client
      .fetch<{ sellers: SellerProps[] }>(`/store/seller`, {
        query: {
          limit,
          offset,
          fields: "id,name,handle,description,photo,address_line,city,postal_code,country_code,tax_id,email,phone,state"
        },
        cache: "force-cache",
      })
      .then(({ sellers }) => {
        return sellers || []
      })
      .catch(() => [])
  } catch (error) {
    console.error('Error fetching sellers:', error)
    return []
  }
}

export const getFeaturedSellers = async (limit: number = 8): Promise<SellerProps[]> => {
  const sellers = await listSellers(limit)
  
  // Sort by name since we don't have reviews in the current backend
  return sellers
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, limit)
}

export const getSellerByHandle = async (handle: string) => {
  return sdk.client
    .fetch<{ seller: SellerProps }>(`/store/seller/${handle}`, {
      query: {
        fields: "+created_at,+rating,+email,*reviews,*reviews.customer",
      },
      cache: "force-cache",
    })
    .then(({ seller }) => {
      const response = {
        ...seller,
        reviews: seller.reviews?.filter((item) => item !== null) ?? [],
      }

      return response as SellerProps
    })
    .catch(() => [])
}