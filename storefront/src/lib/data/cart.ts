"use server"

import { sdk } from "../config"
import medusaError from "@/lib/helpers/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import {
  getAuthHeaders,
  getCacheTag,
  getCartId,
  setCartId,
  removeCartId as removeCartIdCookie,
} from "./cookies"

/**
 * Retrieve cart - SIMPLIFIED VERSION to avoid currency_code errors
 */
export async function retrieveCart(cartId?: string) {
  const id = cartId || (await getCartId())

  if (!id) {
    return null
  }

  const headers = await getAuthHeaders()

  return await sdk.client
    .fetch<HttpTypes.StoreCartResponse>(`/store/carts/${id}`, {
      method: "GET",
      query: {
        // 🔧 SIMPLIFIED FIELDS - No calculated_price to avoid context errors
        fields: [
          "*items",
          "*region", 
          "*items.product", 
          "*items.variant", 
          "*items.variant.prices", // Use prices instead of calculated_price
          "*items.variant.options", 
          "items.variant.options.option.title",
          "*items.thumbnail", 
          "*items.metadata", 
          "*promotions", 
          "*items.product.seller"
        ].join(","),
      },
      headers,
      cache: "no-cache",
    })
    .then(({ cart }) => {
      console.log('🛒 Retrieved cart (SIMPLIFIED):', {
        id: cart?.id,
        itemsCount: cart?.items?.length || 0,
        region: cart?.region?.name,
        currency: cart?.currency_code
      });
      return cart;
    })
    .catch((error) => {
      console.error('❌ Failed to retrieve cart:', error);
      return null;
    })
}

/**
 * SUPER MINIMAL Add to cart - Force Colombia context
 */
export async function addToCart({
  variantId,
  quantity,
  countryCode,
}: {
  variantId: string
  quantity: number
  countryCode: string
}) {
  console.log('🔍 SUPER MINIMAL addToCart START:', { variantId, quantity, countryCode });

  if (!variantId) {
    throw new Error("Missing variant ID")
  }

  try {
    const headers = await getAuthHeaders()

    // Get existing cart first
    let cart = await retrieveCart()

    if (!cart) {
      console.log('🛒 No cart found, creating new one with FORCED context...')
      
      // Create cart with explicit Colombia region AND currency context
      const cartResp = await sdk.store.cart.create(
        { 
          region_id: 'reg_01JWCYJ5RRXTR270TCD6KPRFYV', // Hard-code Colombia region
          currency_code: 'cop' // 🔧 EXPLICITLY SET CURRENCY
        }, 
        {},
        headers
      )
      cart = cartResp.cart
      await setCartId(cart.id)
      
      console.log('✅ New cart created with currency context:', {
        id: cart.id,
        currency_code: cart.currency_code,
        region_id: cart.region_id
      })
    }

    // 🔧 ENSURE cart has currency_code before proceeding
    if (!cart.currency_code) {
      console.log('⚠️ Cart missing currency_code, updating...')
      await sdk.store.cart.update(cart.id, { 
        region_id: 'reg_01JWCYJ5RRXTR270TCD6KPRFYV'
      }, {}, headers)
    }

    console.log('🛒 Cart ready with currency context:', {
      id: cart.id,
      region_id: cart.region_id,
      currency_code: cart.currency_code,
      current_items: cart.items?.length || 0
    });

    // Check if item already exists
    const currentItem = cart.items?.find((item) => item.variant_id === variantId)

    if (currentItem) {
      console.log('📦 Updating existing item quantity to:', currentItem.quantity + quantity);
      
      await sdk.store.cart.updateLineItem(
        cart.id,
        currentItem.id,
        { quantity: currentItem.quantity + quantity },
        {},
        headers
      )
      
      console.log('✅ Item quantity updated');
    } else {
      console.log('📦 Adding NEW item to cart with explicit currency context');
      
      // Add item with explicit currency context if needed
      await sdk.store.cart.createLineItem(
        cart.id,
        {
          variant_id: variantId,
          quantity,
          // 🔧 Add currency context if the API supports it
          metadata: {
            currency_code: 'cop'
          }
        },
        {},
        headers
      )
      
      console.log('✅ NEW item added to cart');
    }

    // Force cache revalidation
    const cartCacheTag = await getCacheTag("carts")
    revalidateTag(cartCacheTag)
    
    // Verify the item was added (simplified retrieval)
    const updatedCart = await retrieveCart(cart.id)
    console.log('🔍 Final cart verification:', {
      id: updatedCart?.id,
      itemsCount: updatedCart?.items?.length || 0,
      currency: updatedCart?.currency_code,
      items: updatedCart?.items?.map(item => ({
        id: item.id,
        title: item.title || item.product_title,
        quantity: item.quantity
      }))
    });

    console.log('🎉 addToCart completed successfully!');

  } catch (error: any) {
    console.error('❌ addToCart error:', error);
    console.error('❌ Error details:', {
      message: error.message,
      stack: error.stack?.substring(0, 500)
    });
    throw new Error(`Failed to add to cart: ${error.message}`)
  }
}

// Rest of functions remain the same...
export async function updateCart(data: HttpTypes.StoreUpdateCart) {
  const cartId = await getCartId()
  if (!cartId) throw new Error("No cart found")
  
  const headers = await getAuthHeaders()
  return await sdk.store.cart.update(cartId, data, {}, headers)
    .then(async ({ cart }) => {
      const cartCacheTag = await getCacheTag("carts")
      await revalidateTag(cartCacheTag)
      return cart
    })
    .catch(medusaError)
}

export async function updateLineItem({
  lineId,
  quantity,
}: {
  lineId: string
  quantity: number
}) {
  if (!lineId) throw new Error("Missing lineItem ID")
  
  const cartId = await getCartId()
  if (!cartId) throw new Error("Missing cart ID")
  
  const headers = await getAuthHeaders()
  await sdk.store.cart.updateLineItem(cartId, lineId, { quantity }, {}, headers)
    .then(async () => {
      const cartCacheTag = await getCacheTag("carts")
      await revalidateTag(cartCacheTag)
    })
    .catch(medusaError)
}

export async function deleteLineItem(lineId: string) {
  if (!lineId) throw new Error("Missing lineItem ID")
  
  const cartId = await getCartId()
  if (!cartId) throw new Error("Missing cart ID")
  
  const headers = await getAuthHeaders()
  await sdk.store.cart.deleteLineItem(cartId, lineId, headers)
    .then(async () => {
      const cartCacheTag = await getCacheTag("carts")
      await revalidateTag(cartCacheTag)
    })
    .catch(medusaError)
}

export async function applyPromotions(codes: string[]) {
  const cartId = await getCartId()
  if (!cartId) throw new Error("No existing cart found")
  
  const headers = await getAuthHeaders()
  return sdk.store.cart.update(cartId, { promo_codes: codes }, {}, headers)
    .then(async () => {
      const cartCacheTag = await getCacheTag("carts")
      revalidateTag(cartCacheTag)
    })
    .catch(medusaError)
}

export async function setShippingMethod({
  cartId,
  shippingMethodId,
}: {
  cartId: string
  shippingMethodId: string
}) {
  const headers = await getAuthHeaders()
  return sdk.store.cart.addShippingMethod(cartId, { option_id: shippingMethodId }, {}, headers)
    .then(async () => {
      const cartCacheTag = await getCacheTag("carts")
      revalidateTag(cartCacheTag)
    })
    .catch(medusaError)
}

export async function removeCartId() {
  return await removeCartIdCookie()
}

export async function placeOrder(cartId?: string) {
  const id = cartId || (await getCartId())
  if (!id) throw new Error("No existing cart found")
  
  const headers = await getAuthHeaders()
  const cartRes: any = await sdk.store.cart.complete(id, {}, headers)
    .then(async (cartRes) => {
      const cartCacheTag = await getCacheTag("carts")
      revalidateTag(cartCacheTag)
      return cartRes
    })
    .catch(medusaError)

  if (cartRes?.order_set) {
    await removeCartId()
    redirect(`/order/${cartRes?.order_set.orders[0].id}/confirmed`)
  }

  return cartRes.order_set.cart
}