"use client"

import ErrorMessage from "@/components/molecules/ErrorMessage/ErrorMessage"
import { setShippingMethod } from "@/lib/data/cart"
import { calculatePriceForShippingOption } from "@/lib/data/fulfillment"
import { convertToLocale } from "@/lib/helpers/money"
import { CheckCircleSolid, ChevronUpDown, Loader } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { clx, Heading, Text } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Fragment, useEffect, useState } from "react"
import { Button } from "@/components/atoms"
import { Modal, SelectField } from "@/components/molecules"
import { CartShippingMethodRow } from "./CartShippingMethodRow"
import { Listbox, Transition } from "@headlessui/react"
import clsx from "clsx"

// Extended cart item product type to include seller
type ExtendedStoreProduct = HttpTypes.StoreProduct & {
  seller?: {
    id: string
    name: string
  }
}

// Cart item type definition
type CartItem = {
  product?: ExtendedStoreProduct
  // Include other cart item properties as needed
}

export type StoreCardShippingMethod = HttpTypes.StoreCartShippingOption & {
  seller_id?: string
  service_zone?: {
    fulfillment_set: {
      type: string
    }
  }
}

type ShippingProps = {
  cart: Omit<HttpTypes.StoreCart, "items"> & {
    items?: CartItem[]
  }
  availableShippingMethods:
    | (StoreCardShippingMethod &
        { rules: any; seller_id: string; price_type: string; id: string }[])
    | null
}

const CartShippingMethodsSection: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoadingPrices, setIsLoadingPrices] = useState(false)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [error, setError] = useState<string | null>(null)
  const [missingModal, setMissingModal] = useState(false)
  const [missingShippingSellers, setMissingShippingSellers] = useState<
    string[]
  >([])

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) =>
      sm.rules?.find((rule: any) => rule.attribute === "is_return")?.value !==
      "true"
  )

  useEffect(() => {
    const set = new Set<string>()
    cart.items?.forEach((item) => {
      if (item?.product?.seller?.id) {
        set.add(item.product.seller.id)
      }
    })

    const sellerMethods = _shippingMethods?.map(({ seller_id }) => seller_id)

    const missingSellerIds = [...set].filter(
      (sellerId) => !sellerMethods?.includes(sellerId)
    )

    setMissingShippingSellers(Array.from(missingSellerIds))

    if (missingSellerIds.length > 0 && !cart.shipping_methods?.length) {
      setMissingModal(true)
    }
  }, [cart])

  useEffect(() => {
    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => (pricesMap[p.value?.id || ""] = p.value?.amount!))

          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      }
    }
  }, [availableShippingMethods])

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const handleSetShippingMethod = async (id: string | null) => {
    setIsLoadingPrices(true)
    setError(null)

    if (!id) {
      setIsLoadingPrices(false)
      return
    }

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id }).catch(
      (err) => {
        setError(err.message)
      }
    )

    setIsLoadingPrices(false)
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  const groupedBySellerId = _shippingMethods?.reduce((acc: any, method) => {
    const sellerId = method.seller_id!

    if (!acc[sellerId]) {
      acc[sellerId] = []
    }

    acc[sellerId].push(method)
    return acc
  }, {})

  const handleEdit = () => {
    router.replace(pathname + "?step=delivery")
  }

  const missingSellers = cart.items
    ?.filter((item) =>
      missingShippingSellers.includes(item.product?.seller?.id!)
    )
    .map((item) => item.product?.seller?.name)

  return (
    <div className="group relative">
      {missingModal && (
        <Modal
          heading="Missing seller shipping option"
          onClose={() => router.push("/cart")}
        >
          <div className="bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Some of the sellers in your cart do not have shipping options.
            </h2>

            <p className="text-gray-700 leading-relaxed">
              Please remove the{" "}
              <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {missingSellers?.map(
                  (seller, index) =>
                    `${seller}${
                      index === missingSellers.length - 1 ? " " : ", "
                    }`
                )}
              </span>{" "}
              items or contact{" "}
              {missingSellers && missingSellers?.length > 1 ? "them" : "him"} to
              get the shipping options.
            </p>
          </div>
        </Modal>
      )}

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-2xl blur opacity-60"></div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full rounded-2xl"></div>
      
      <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
        {/* Header */}
        <div className="flex flex-row items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <CheckCircleSolid className="text-white" />
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              <Heading
                level="h2"
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
              >
                Delivery
              </Heading>
            </div>
          </div>
          
          {!isOpen && (
            <div className="relative group/button">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-25 group-hover/button:opacity-50 transition duration-300"></div>
              <Button 
                onClick={handleEdit} 
                variant="tonal"
                className="relative bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:bg-white hover:scale-105 transition-all duration-300"
              >
                Edit
              </Button>
            </div>
          )}
        </div>

        {isOpen ? (
          <>
            <div className="grid">
              <div data-testid="delivery-options-container">
                <div className="pb-8 md:pt-0 pt-2">
                  {Object.keys(groupedBySellerId).map((key) => {
                    return (
                      <div key={key} className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white">
                              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <Heading level="h3" className="text-lg font-semibold text-gray-800">
                            {groupedBySellerId[key][0].seller_name}
                          </Heading>
                        </div>
                        
                        <Listbox
                          value={cart.shipping_methods?.[0]?.id}
                          onChange={(value) => {
                            handleSetShippingMethod(value)
                          }}
                        >
                          <div className="relative">
                            <Listbox.Button
                              className={clsx(
                                "relative w-full flex justify-between items-center px-4 h-12 bg-white/70 backdrop-blur-sm border border-gray-200/50 text-left cursor-default focus:outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75 focus-visible:border-blue-500 text-base hover:bg-white hover:scale-[1.01] transition-all duration-200"
                              )}
                            >
                              {({ open }) => (
                                <>
                                  <span className="block truncate font-medium">
                                    Choose delivery option
                                  </span>
                                  <ChevronUpDown
                                    className={clx(
                                      "transition-transform duration-200 text-gray-500",
                                      {
                                        "transform rotate-180": open,
                                      }
                                    )}
                                  />
                                </>
                              )}
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options
                                className="absolute z-20 w-full overflow-auto bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-xl max-h-60 focus:outline-none mt-1"
                                data-testid="shipping-address-options"
                              >
                                {groupedBySellerId[key].map((option: any) => {
                                  return (
                                    <Listbox.Option
                                      className="cursor-pointer select-none relative px-6 py-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-b border-gray-100/50 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                                      value={option.id}
                                      key={option.id}
                                    >
                                      <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-800">{option.name}</span>
                                        <span className="font-semibold text-blue-600">
                                          {option.price_type === "flat" ? (
                                            convertToLocale({
                                              amount: option.amount!,
                                              currency_code: cart?.currency_code,
                                            })
                                          ) : calculatedPricesMap[option.id] ? (
                                            convertToLocale({
                                              amount: calculatedPricesMap[option.id],
                                              currency_code: cart?.currency_code,
                                            })
                                          ) : isLoadingPrices ? (
                                            <Loader className="animate-spin" />
                                          ) : (
                                            "-"
                                          )}
                                        </span>
                                      </div>
                                    </Listbox.Option>
                                  )
                                })}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                    )
                  })}
                  {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
                    <div className="bg-white/50 backdrop-blur-sm border border-gray-200/30 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Selected Methods:</h4>
                      <div className="flex flex-col gap-3">
                        {cart.shipping_methods?.map((method) => (
                          <CartShippingMethodRow
                            key={method.id}
                            method={method}
                            currency_code={cart.currency_code}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <ErrorMessage
                error={error}
                data-testid="delivery-option-error-message"
              />
              <div className="relative group/button mt-6">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-25 group-hover/button:opacity-50 transition duration-300"></div>
                <Button
                  onClick={handleSubmit}
                  variant="tonal"
                  disabled={!cart.shipping_methods?.[0]}
                  loading={isLoadingPrices}
                  className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0"
                >
                  Continue to payment →
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="text-small-regular">
              {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/50 rounded-xl p-4">
                  <div className="flex flex-col gap-4">
                    {cart.shipping_methods?.map((method) => (
                      <div key={method.id} className="bg-white/70 backdrop-blur-sm border border-blue-200/30 rounded-lg p-4">
                        <Text className="font-semibold text-blue-800 mb-1">
                          Method
                        </Text>
                        <Text className="text-blue-700">
                          {method.name}{" "}
                          <span className="font-semibold">
                            {convertToLocale({
                              amount: method.amount!,
                              currency_code: cart?.currency_code,
                            })}
                          </span>
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Corner decorative elements */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  )
}

export default CartShippingMethodsSection