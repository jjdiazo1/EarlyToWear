"use client"
import { HttpTypes } from "@medusajs/types"
import { Button, Input } from "@/components/atoms"
import { Heading, Label } from "@medusajs/ui"
import { useState } from "react"
import { applyPromotions } from "@/lib/data/cart"

export default function CartPromotionCode({
  cart,
}: {
  cart:
    | (HttpTypes.StoreCart & { promotions?: HttpTypes.StorePromotion[] })
    | null
}) {
  const [promotionCode, setPromotionCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleApplyPromotionCode = async () => {
    setIsLoading(true)
    try {
      await applyPromotions([promotionCode])
      setPromotionCode("")
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Applied Promotions */}
      {cart?.promotions && cart.promotions.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800 mb-3">Applied Codes:</h4>
          {cart.promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/50 rounded-lg p-3 flex items-center gap-3"
            >
              <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <Label className="font-semibold text-emerald-800 uppercase tracking-wider">
                {promo.code}
              </Label>
            </div>
          ))}
        </div>
      )}

      {/* Input Section */}
      <div className="space-y-4">
        <div className="relative group">
          {/* Input glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-25 group-focus-within:opacity-50 transition duration-300"></div>
          
          <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl p-1">
            <Input
              placeholder="Enter your promotion code"
              value={promotionCode}
              onChange={(e) => setPromotionCode(e.target.value)}
              className="w-full border-0 bg-transparent focus:ring-0 text-base px-4 py-3 placeholder:text-gray-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && promotionCode && !isLoading) {
                  handleApplyPromotionCode()
                }
              }}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <Button
              className="relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 px-6 py-3"
              onClick={handleApplyPromotionCode}
              disabled={isLoading || !promotionCode}
              loading={isLoading}
              variant="tonal"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Applying...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Use promotion code</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Help text */}
      <div className="text-sm text-gray-600 bg-gray-50 border border-gray-200/50 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-500">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Enter a valid promotion code to get a discount on your order.</span>
        </div>
      </div>
    </div>
  )
}