"use server"

import { sdk } from "../config"
import { sortProducts } from "@/lib/helpers/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@/types/product"
import { getAuthHeaders } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"
import { SellerProps } from "@/types/seller"

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
  category_id,
  collection_id,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams &
    HttpTypes.StoreProductParams & {
      handle?: string
    }
  category_id?: string
  collection_id?: string
  countryCode?: string
  regionId?: string
}): Promise<{
  response: {
    products: (HttpTypes.StoreProduct & { seller?: SellerProps })[]
    count: number
  }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = (_pageParam - 1) * limit

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else {
    region = await retrieveRegion(regionId!)
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  console.log('🌍 Region info:', {
    id: region?.id,
    name: region?.name,
    currency_code: region?.currency_code,
    automatic_taxes: region?.automatic_taxes
  });

  // 🔧 SIMPLIFIED QUERY - Avoid calculated_price to prevent currency_code errors
  const queryData = {
    category_id,
    collection_id,
    limit,
    offset,
    region_id: region?.id,
    // 🔧 SIMPLIFIED FIELDS without calculated_price
    fields: [
      "*variants",
      "*variants.prices", // Use prices instead of calculated_price
      "+variants.inventory_quantity",
      "*seller",
      "*seller.products",
      "*seller.reviews",
      "*seller.reviews.customer"
    ].join(","),
    ...queryParams,
  };

  console.log('📡 Query params:', queryData);

  return sdk.client
    .fetch<{
      products: HttpTypes.StoreProduct[]
      count: number
    }>(`/store/products`, {
      method: "GET",
      query: queryData,
      headers,
      cache: "no-cache",
    })
    .then(({ products, count }) => {
      console.log('📦 Raw API Response:');
      console.log('- Products count:', products.length);
      console.log('- Total count:', count);
      
      if (products.length > 0) {
        const firstProduct: any = products[0];
        console.log('🔍 First product details:');
        console.log('- ID:', firstProduct.id);
        console.log('- Title:', firstProduct.title);
        console.log('- Has variants:', !!firstProduct.variants);
        console.log('- Variants count:', firstProduct.variants?.length || 0);
        
        if (firstProduct.variants && firstProduct.variants.length > 0) {
          const firstVariant: any = firstProduct.variants[0];
          console.log('🔍 First variant details:');
          console.log('- Variant ID:', firstVariant.id);
          console.log('- Variant title:', firstVariant.title);
          console.log('- prices (RAW):', firstVariant.prices);
          console.log('- prices (JSON):', JSON.stringify(firstVariant.prices, null, 2));
          console.log('- inventory_quantity:', firstVariant.inventory_quantity);
          
          // 🔧 Check if we have prices in COP
          const copPrices = firstVariant.prices?.filter((p: any) => 
            p.currency_code?.toLowerCase() === 'cop'
          );
          
          if (copPrices && copPrices.length > 0) {
            console.log('✅ SUCCESS: Found COP prices!', copPrices.length);
          } else {
            console.log('⚠️ WARNING: No COP prices found');
            console.log('Available currencies:', 
              firstVariant.prices?.map((p: any) => p.currency_code).join(', ')
            );
          }
        } else {
          console.log('❌ No variants found in first product');
        }
      } else {
        console.log('❌ No products returned from API');
      }

      const nextPage = count > offset + limit ? pageParam + 1 : null

      const response = products.filter((prod) => {
        // @ts-ignore Property 'seller' exists but TypeScript doesn't recognize it
        const reviews = prod.seller?.reviews.filter((item) => !!item) ?? []
        return (
          // @ts-ignore Property 'seller' exists but TypeScript doesn't recognize it
          prod?.seller && {
            ...prod,
            seller: {
              // @ts-ignore Property 'seller' exists but TypeScript doesn't recognize it
              ...prod.seller,
              reviews,
            },
          }
        )
      })

      console.log('✅ Filtered products with sellers:', response.length);

      return {
        response: {
          products: response,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
    .catch((error) => {
      console.error('❌ Error fetching products:', error);
      throw error;
    })
}

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 1,
  queryParams,
  sortBy = "created_at",
  countryCode,
  category_id,
  seller_id,
  collection_id,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
  category_id?: string
  seller_id?: string
  collection_id?: string
}): Promise<{
  response: {
    products: HttpTypes.StoreProduct[]
    count: number
  }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  const limit = queryParams?.limit || 12

  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    category_id,
    collection_id,
    countryCode,
  })

  const filteredProducts = seller_id
    ? products.filter((product) => product.seller?.id === seller_id)
    : products

  const sortedProducts = sortProducts(filteredProducts, sortBy)

  const pageParam = (page - 1) * limit

  const nextPage = count > pageParam + limit ? pageParam + limit : null

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
}