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
    <div className="border p-4 rounded-sm bg-ui-bg-interactive">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular gap-x-2 items-baseline items-center"
        >
          {!isOpen && <CheckCircleSolid />} Shipping Address
        </Heading>
        {!isOpen && isAddress && (
          <Text>
            <Button onClick={handleEdit} variant="tonal">
              Edit
            </Button>
          </Text>
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
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />
            <Button
              className="mt-6"
              data-testid="submit-address-button"
              variant="tonal"
            >
              Save
            </Button>
            <ErrorMessage
              error={message !== "success" && message}
              data-testid="address-error-message"
            />
          </div>
        ) : (
          <div>
            <div className="text-small-regular">
              {cart && cart.shipping_address ? (
                <div className="flex items-start gap-x-8">
                  <div className="flex items-start gap-x-1 w-full">
                    <div>
                      <Text className="txt-medium-plus font-bold">
                        {cart.shipping_address.first_name}{" "}
                        {cart.shipping_address.last_name}
                      </Text>
                      <Text>
                        {cart.shipping_address.address_1}{" "}
                        {cart.shipping_address.address_2},{" "}
                        {cart.shipping_address.postal_code}{" "}
                        {cart.shipping_address.city},{" "}
                        {cart.shipping_address.country_code?.toUpperCase()}
                      </Text>
                      <Text>
                        {cart.email}, {cart.shipping_address.phone}
                      </Text>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        )}
        {isAddress && isClient && !searchParams?.get("step") && (
          <Link href="/checkout?step=delivery">
            <Button className="mt-6" variant="tonal">
              Continue to Delivery
            </Button>
          </Link>
        )}
      </form>
    </div>
  )
}

// Loading skeleton component
const CartAddressSkeleton = () => (
  <div className="border p-4 rounded-sm bg-ui-bg-interactive">
    <div className="flex flex-row items-center justify-between mb-6">
      <Heading
        level="h2"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline items-center"
      >
        Shipping Address
      </Heading>
    </div>
    <div>
      <Spinner />
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
    <CartAddressSkeleton />
  }

  return <CartAddressSectionContent cart={cart} customer={customer} />
}