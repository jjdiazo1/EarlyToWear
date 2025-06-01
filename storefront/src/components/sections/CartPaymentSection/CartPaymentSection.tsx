"use client"

import ErrorMessage from "@/components/molecules/ErrorMessage/ErrorMessage"
import { initiatePaymentSession } from "@/lib/data/cart"
import { RadioGroup } from "@headlessui/react"
import {
  isStripe as isStripeFunc,
  paymentInfoMap,
} from "../../../lib/constants"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Container, Heading, Text } from "@medusajs/ui"
import PaymentContainer, {
  StripeCardContainer,
} from "../../organisms/PaymentContainer/PaymentContainer"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/atoms"

type StoreCardPaymentMethod = any & {
  service_zone?: {
    fulfillment_set: {
      type: string
    }
  }
}

const CartPaymentSection = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: StoreCardPaymentMethod[] | null
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const isStripe = isStripeFunc(selectedPaymentMethod)

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    if (isStripeFunc(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      })
    }
  }

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard =
        isStripeFunc(selectedPaymentMethod) && !activeSession

      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="group relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-indigo-500/5 rounded-2xl blur opacity-60"></div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full rounded-2xl"></div>
      
      <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
        {/* Header */}
        <div className="flex flex-row items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {!isOpen && paymentReady && (
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <CheckCircleSolid className="text-white"/>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="h-1 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <Heading
                level="h2"
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent"
              >
                Payment
              </Heading>
            </div>
          </div>
          
          {!isOpen && (
            <div className="relative group/button">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover/button:opacity-50 transition duration-300"></div>
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

        <div>
          <div className={isOpen ? "block" : "hidden"}>
            {!paidByGiftcard && availablePaymentMethods?.length && (
              <div className="bg-white/50 backdrop-blur-sm border border-gray-200/30 rounded-xl p-6 mb-6">
                <RadioGroup
                  value={selectedPaymentMethod}
                  onChange={(value: string) => setPaymentMethod(value)}
                >
                  <div className="space-y-4">
                    {availablePaymentMethods.map((paymentMethod) => (
                      <div key={paymentMethod.id} className="relative">
                        {isStripeFunc(paymentMethod.id) ? (
                          <StripeCardContainer
                            paymentProviderId={paymentMethod.id}
                            selectedPaymentOptionId={selectedPaymentMethod}
                            paymentInfoMap={paymentInfoMap}
                            setCardBrand={setCardBrand}
                            setError={setError}
                            setCardComplete={setCardComplete}
                          />
                        ) : (
                          <PaymentContainer
                            paymentInfoMap={paymentInfoMap}
                            paymentProviderId={paymentMethod.id}
                            selectedPaymentOptionId={selectedPaymentMethod}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {paidByGiftcard && (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100/50 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <Text className="font-semibold text-emerald-800">Payment method</Text>
                </div>
                <Text
                  className="text-emerald-700 ml-9"
                  data-testid="payment-method-summary"
                >
                  Gift card
                </Text>
              </div>
            )}

            <ErrorMessage
              error={error}
              data-testid="payment-method-error-message"
            />

            <div className="relative group/button">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover/button:opacity-50 transition duration-300"></div>
              <Button
                onClick={handleSubmit}
                variant="tonal"
                loading={isLoading}
                disabled={
                  (isStripe && !cardComplete) ||
                  (!selectedPaymentMethod && !paidByGiftcard)
                }
                className="relative w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0"
              >
                {!activeSession && isStripeFunc(selectedPaymentMethod)
                  ? "Enter card details"
                  : "Continue to review →"}
              </Button>
            </div>
          </div>

          <div className={isOpen ? "hidden" : "block"}>
            {cart && paymentReady && activeSession ? (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100/50 rounded-xl p-6">
                <div className="flex items-start gap-x-6 w-full">
                  <div className="flex flex-col flex-1">
                    <Text className="font-semibold text-purple-800 mb-1">
                      Payment method
                    </Text>
                    <Text
                      className="text-purple-700"
                      data-testid="payment-method-summary"
                    >
                      {paymentInfoMap[activeSession?.provider_id]?.title ||
                        activeSession?.provider_id}
                    </Text>
                  </div>
                  <div className="flex flex-col flex-1">
                    <Text className="font-semibold text-purple-800 mb-1">
                      Payment details
                    </Text>
                    <div
                      className="flex gap-2 text-purple-700 items-center"
                      data-testid="payment-details-summary"
                    >
                      <Container className="flex items-center h-7 w-fit p-2 bg-white/70 backdrop-blur-sm border border-purple-200/50 rounded-lg">
                        {paymentInfoMap[selectedPaymentMethod]?.icon || (
                          <CreditCard className="text-purple-600" />
                        )}
                      </Container>
                      <Text>
                        {isStripeFunc(selectedPaymentMethod) && cardBrand
                          ? cardBrand
                          : "Another step will appear"}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            ) : paidByGiftcard ? (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100/50 rounded-xl p-6">
                <Text className="font-semibold text-emerald-800 mb-1">
                  Payment method
                </Text>
                <Text
                  className="text-emerald-700"
                  data-testid="payment-method-summary"
                >
                  Gift card
                </Text>
              </div>
            ) : null}
          </div>
        </div>

        {/* Corner decorative elements */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  )
}

export default CartPaymentSection