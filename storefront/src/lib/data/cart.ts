"use server"

import { sdk } from "../config"
import medusaError from "@/lib/helpers/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  removeCartId,
  setCartId,
} from "./cookies"
import { getRegion } from "./regions"

/**
 * Retrieve cart - IMPROVED VERSION from new cart but with all original fields
 */
export async function retrieveCart(cartId?: string) {
  const id = cartId || (await getCartId())

  if (!id) {
    return null
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return await sdk.client
    .fetch<HttpTypes.StoreCartResponse>(`/store/carts/${id}`, {
      method: "GET",
      query: {
        // 🔧 COMPLETE FIELDS from original version
        fields:
          "*items,*region, *items.product, *items.variant, *items.variant.options, items.variant.options.option.title," +
          "*items.thumbnail, *items.metadata, +items.total, *promotions, +shipping_methods.name, *items.product.seller",
      },
      headers,
      cache: "no-cache",
    })
    .then(({ cart }) => {
      console.log('🛒 Retrieved cart (COMPLETE):', {
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
 * Get or set cart - FROM ORIGINAL VERSION
 */
export async function getOrSetCart(countryCode: string) {
  const region = await getRegion(countryCode)

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`)
  }

  let cart = await retrieveCart()

  const headers = {
    ...(await getAuthHeaders()),
  }

  if (!cart) {
    const cartResp = await sdk.store.cart.create(
      { region_id: region.id },
      {},
      headers
    )
    cart = cartResp.cart

    await setCartId(cart.id)

    const cartCacheTag = await getCacheTag("carts")
    revalidateTag(cartCacheTag)
  }

  if (cart && cart?.region_id !== region.id) {
    await sdk.store.cart.update(cart.id, { region_id: region.id }, {}, headers)
    const cartCacheTag = await getCacheTag("carts")
    revalidateTag(cartCacheTag)
  }

  return cart
}

/**
 * Update cart - FROM ORIGINAL VERSION
 */
export async function updateCart(data: HttpTypes.StoreUpdateCart) {
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("No existing cart found, please create one before updating")
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return await sdk.store.cart
    .update(cartId, data, {}, headers)
    .then(async ({ cart }) => {
      const cartCacheTag = await getCacheTag("carts")
      await revalidateTag(cartCacheTag)
      return cart
    })
    .catch(medusaError)
}

/**
 * Add to cart - IMPROVED VERSION from new cart
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
  console.log('🔍 IMPROVED addToCart START:', { variantId, quantity, countryCode });

  if (!variantId) {
    throw new Error("Missing variant ID when adding to cart")
  }

  try {
    const cart = await getOrSetCart(countryCode)

    if (!cart) {
      throw new Error("Error retrieving or creating cart")
    }

    const headers = {
      ...(await getAuthHeaders()),
    }

    const currentItem = cart.items?.find((item) => item.variant_id === variantId)

    if (currentItem) {
      console.log('📦 Updating existing item quantity to:', currentItem.quantity + quantity);
      
      await sdk.store.cart
        .updateLineItem(
          cart.id,
          currentItem.id,
          { quantity: currentItem.quantity + quantity },
          {},
          headers
        )
        .then(async () => {
          const cartCacheTag = await getCacheTag("carts")
          revalidateTag(cartCacheTag)
        })
        .catch(medusaError)
    } else {
      console.log('📦 Adding NEW item to cart');
      
      await sdk.store.cart
        .createLineItem(
          cart.id,
          {
            variant_id: variantId,
            quantity,
          },
          {},
          headers
        )
        .then(async () => {
          const cartCacheTag = await getCacheTag("carts")
          revalidateTag(cartCacheTag)
        })
        .catch(medusaError)
    }

    console.log('🎉 addToCart completed successfully!');

  } catch (error: any) {
    console.error('❌ addToCart error:', error);
    throw new Error(`Failed to add to cart: ${error.message}`)
  }
}

/**
 * Update line item - FROM ORIGINAL VERSION
 */
export async function updateLineItem({
  lineId,
  quantity,
}: {
  lineId: string
  quantity: number
}) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when updating line item")
  }

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("Missing cart ID when updating line item")
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdk.store.cart
    .updateLineItem(cartId, lineId, { quantity }, {}, headers)
    .then(async () => {
      const cartCacheTag = await getCacheTag("carts")
      await revalidateTag(cartCacheTag)
    })
    .catch(medusaError)
}

/**
 * Delete line item - FROM ORIGINAL VERSION
 */
export async function deleteLineItem(lineId: string) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when deleting line item")
  }

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("Missing cart ID when deleting line item")
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdk.store.cart
    .deleteLineItem(cartId, lineId, headers)
    .then(async () => {
      const cartCacheTag = await getCacheTag("carts")
      await revalidateTag(cartCacheTag)
    })
    .catch(medusaError)
}

/**
 * Set shipping method - FROM ORIGINAL VERSION
 */
export async function setShippingMethod({
  cartId,
  shippingMethodId,
}: {
  cartId: string
  shippingMethodId: string
}) {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.cart
    .addShippingMethod(cartId, { option_id: shippingMethodId }, {}, headers)
    .then(async () => {
      const cartCacheTag = await getCacheTag("carts")
      revalidateTag(cartCacheTag)
    })
    .catch(medusaError)
}

/**
 * 🔧 RESTORED: Remove shipping method - FROM ORIGINAL VERSION
 */
export async function removeShippingMethod(shippingMethodId: string) {
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("No existing cart found")
  }

  const headers = {
    ...(await getAuthHeaders()),
    "Content-Type": "application/json",
    "x-publishable-api-key": process.env
      .NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY as string,
  }

  return fetch(
    `${process.env.MEDUSA_BACKEND_URL}/store/carts/${cartId}/shipping-methods`,
    {
      method: "DELETE",
      body: JSON.stringify({ shipping_method_ids: [shippingMethodId] }),
      headers,
    }
  )
    .then(async () => {
      const cartCacheTag = await getCacheTag("carts")
      revalidateTag(cartCacheTag)
    })
    .catch(medusaError)
}

/**
 * Initiate payment session - FROM ORIGINAL VERSION
 */
export async function initiatePaymentSession(
  cart: HttpTypes.StoreCart,
  data: {
    provider_id: string
    context?: Record<string, unknown>
  }
) {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.payment
    .initiatePaymentSession(cart, data, {}, headers)
    .then(async (resp) => {
      const cartCacheTag = await getCacheTag("carts")
      revalidateTag(cartCacheTag)
      return resp
    })
    .catch(medusaError)
}

/**
 * Apply promotions - FROM ORIGINAL VERSION
 */
export async function applyPromotions(codes: string[]) {
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("No existing cart found")
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.cart
    .update(cartId, { promo_codes: codes }, {}, headers)
    .then(async () => {
      const cartCacheTag = await getCacheTag("carts")
      revalidateTag(cartCacheTag)
    })
    .catch(medusaError)
}

/**
 * 🔧 RESTORED: Delete promotion code - FROM ORIGINAL VERSION
 */
export async function deletePromotionCode(promoId: string) {
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("No existing cart found")
  }
  const headers = {
    ...(await getAuthHeaders()),
    "Content-Type": "application/json",
    "x-publishable-api-key": process.env
      .NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY as string,
  }

  return fetch(
    `${process.env.MEDUSA_BACKEND_URL}/store/carts/${cartId}/promotions`,
    {
      method: "DELETE",
      body: JSON.stringify({ promo_codes: [promoId] }),
      headers,
    }
  )
    .then(async () => {
      const cartCacheTag = await getCacheTag("carts")
      revalidateTag(cartCacheTag)
    })
    .catch(medusaError)
}

/**
 * 🔧 RESTORED: Set addresses - FROM ORIGINAL VERSION
 */
export async function setAddresses(currentState: unknown, formData: FormData) {
  try {
    if (!formData) {
      throw new Error("No form data found when setting addresses")
    }
    const cartId = getCartId()
    if (!cartId) {
      throw new Error("No existing cart found when setting addresses")
    }

    const data = {
      shipping_address: {
        first_name: formData.get("shipping_address.first_name"),
        last_name: formData.get("shipping_address.last_name"),
        address_1: formData.get("shipping_address.address_1"),
        address_2: "",
        company: formData.get("shipping_address.company"),
        postal_code: formData.get("shipping_address.postal_code"),
        city: formData.get("shipping_address.city"),
        country_code: formData.get("shipping_address.country_code"),
        province: formData.get("shipping_address.province"),
        phone: formData.get("shipping_address.phone"),
      },
      email: formData.get("email"),
    } as any

    data.billing_address = data.shipping_address

    await updateCart(data)
    await revalidatePath("/cart")
  } catch (e: any) {
    return e.message
  }
}

/**
 * Place order - FROM ORIGINAL VERSION
 */
export async function placeOrder(cartId?: string) {
  const id = cartId || (await getCartId())

  if (!id) {
    throw new Error("No existing cart found when placing an order")
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const cartRes: any = await sdk.store.cart
    .complete(id, {}, headers)
    .then(async (cartRes) => {
      const cartCacheTag = await getCacheTag("carts")
      revalidateTag(cartCacheTag)
      return cartRes
    })
    .catch(medusaError)

  if (cartRes?.order_set) {
    removeCartId()
    redirect(`/order/${cartRes?.order_set.orders[0].id}/confirmed`)
  }

  return cartRes.order_set.cart
}

/**
 * 🔧 MODIFIED: Update region - WITHOUT FORCED REDIRECT
 */
export async function updateRegion(countryCode: string, currentPath: string) {
  const cartId = await getCartId()
  const region = await getRegion(countryCode)

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`)
  }

  if (cartId) {
    await updateCart({ region_id: region.id })
    const cartCacheTag = await getCacheTag("carts")
    revalidateTag(cartCacheTag)
  }

  const regionCacheTag = await getCacheTag("regions")
  revalidateTag(regionCacheTag)

  const productsCacheTag = await getCacheTag("products")
  revalidateTag(productsCacheTag)

  // 🔧 COMMENTED OUT: Don't force redirect with country code
  // redirect(`/${countryCode}${currentPath}`)
  
  // Instead, just revalidate without redirect
  console.log(`✅ Region updated to ${countryCode} without URL redirect`)
}

/**
 * 🔧 RESTORED: List cart options - FROM ORIGINAL VERSION
 */
export async function listCartOptions() {
  const cartId = await getCartId()
  const headers = {
    ...(await getAuthHeaders()),
  }
  const next = {
    ...(await getCacheOptions("shippingOptions")),
  }

  return await sdk.client.fetch<{
    shipping_options: HttpTypes.StoreCartShippingOption[]
  }>("/store/shipping-options", {
    query: { cart_id: cartId },
    next,
    headers,
    cache: "force-cache",
  })
}