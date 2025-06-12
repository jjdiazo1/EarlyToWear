"use client"

import { Heading, Text, useToggleState } from "@medusajs/ui"
import { setAddresses } from "@/lib/data/cart"
import compareAddresses from "@/lib/helpers/compare-addresses"
import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState, useEffect, useState, Suspense } from "react"
import { Button } from "@/components/atoms"
import ErrorMessage from "@/components/molecules/ErrorMessage/ErrorMessage"
import Spinner from "@/icons/spinner"
import ShippingAddress from "@/components/organisms/ShippingAddress/ShippingAddress"
import { CheckCircleSolid } from "@medusajs/icons"
import { Link } from "@/i18n/routing"

// Content component that uses searchParams safely
const CartAddressSectionContent = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Safely get search params after hydration
  useEffect(() => {
    setIsClient(true)
    setSearchParams(new URLSearchParams(window.location.search))
  }, [])

  const isAddress = Boolean(
    cart?.shipping_address &&
      cart?.shipping_address.first_name &&
      cart?.shipping_address.last_name &&
      cart?.shipping_address.address_1 &&
      cart?.shipping_address.city &&
      cart?.shipping_address.postal_code &&
      cart?.shipping_address.country_code
  )
  
  // Only determine isOpen after client-side hydration
  const isOpen = isClient 
    ? (searchParams?.get("step") === "address" || !isAddress)
    : !isAddress // fallback for server/initial render

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const [message, formAction] = useActionState(setAddresses, sameAsBilling)

  useEffect(() => {
    if (isClient && !isAddress) {
      router.replace(pathname + "?step=address")
    }
  }, [isAddress, isClient])

  const handleEdit = () => {
    router.replace(pathname + "?step=address")
  }

  return (
    <div className="group relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur opacity-60"></div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full rounded-2xl"></div>
      
      <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
        {/* Header */}
        <div className="flex flex-row items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {!isOpen && (
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <CheckCircleSolid className="text-white" />
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="h-1 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              <Heading
                level="h2"
                className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                Shipping Address
              </Heading>
            </div>
          </div>
          
          {!isOpen && isAddress && (
            <div className="relative group/button">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-25 group-hover/button:opacity-50 transition duration-300"></div>
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

        <form
          action={async (data) => {
            await formAction(data)
            router.replace(`/checkout?step=delivery`)
          }}
        >
          {isOpen ? (
            <div className="pb-8">
              {/* Form container with glassmorphism */}
              <div className="bg-white/50 backdrop-blur-sm border border-gray-200/30 rounded-xl p-6 mb-6">
                <ShippingAddress
                  customer={customer}
                  checked={sameAsBilling}
                  onChange={toggleSameAsBilling}
                  cart={cart}
                />
              </div>
              
              <div className="flex gap-4">
                <div className="relative group/button flex-1">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-25 group-hover/button:opacity-50 transition duration-300"></div>
                  <Button
                    className="relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0"
                    data-testid="submit-address-button"
                    variant="tonal"
                  >
                    Save Address
                  </Button>
                </div>
              </div>
              
              <ErrorMessage
                error={message !== "success" && message}
                data-testid="address-error-message"
              />
            </div>
          ) : (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/50 rounded-xl p-6">
              <div className="text-small-regular">
                {cart && cart.shipping_address ? (
                  <div className="flex items-start gap-x-8">
                    <div className="flex items-start gap-x-1 w-full">
                      <div>
                        <Text className="font-bold text-lg text-gray-800 mb-2">
                          {cart.shipping_address.first_name}{" "}
                          {cart.shipping_address.last_name}
                        </Text>
                        <Text className="text-gray-600 mb-1">
                          {cart.shipping_address.address_1}{" "}
                          {cart.shipping_address.address_2 && `${cart.shipping_address.address_2}, `}
                          {cart.shipping_address.postal_code}{" "}
                          {cart.shipping_address.city},{" "}
                          {cart.shipping_address.country_code?.toUpperCase()}
                        </Text>
                        <Text className="text-gray-600">
                          {cart.email}{cart.shipping_address.phone && `, ${cart.shipping_address.phone}`}
                        </Text>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center py-8">
                    <Spinner />
                  </div>
                )}
              </div>
            </div>
          )}
          
          {isAddress && isClient && !searchParams?.get("step") && (
            <div className="mt-6">
              <Link href="/checkout?step=delivery" className="block">
                <div className="relative group/button">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-25 group-hover/button:opacity-50 transition duration-300"></div>
                  <Button 
                    className="relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0"
                    variant="tonal"
                  >
                    Continue to Delivery →
                  </Button>
                </div>
              </Link>
            </div>
          )}
        </form>

        {/* Corner decorative elements */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  )
}

// Loading skeleton component
const CartAddressSkeleton = () => (
  <div className="group relative">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur opacity-60"></div>
    <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
      </div>
    </div>
  </div>
)

// Main component with proper hydration handling
export const CartAddressSection = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show skeleton until mounted to avoid hydration issues
  if (!mounted) {
    return <CartAddressSkeleton />
  }

  // No Suspense needed since we're handling the mounting manually
  return <CartAddressSectionContent cart={cart} customer={customer} />
}