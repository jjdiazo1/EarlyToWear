"use client"

import { Button } from "@/components/atoms"
import { BinIcon } from "@/icons"
import { removeShippingMethod } from "@/lib/data/cart"
import { convertToLocale } from "@/lib/helpers/money"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

export const CartShippingMethodRow = ({
  method,
  currency_code,
}: {
  method: HttpTypes.StoreCartShippingMethod
  currency_code: string
}) => {
  const handleRemoveShippingMethod = async () => {
    await removeShippingMethod(method.id)
  }

  return (
    <div className="group relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl blur opacity-60"></div>
      
      <div className="relative bg-white/70 backdrop-blur-sm border border-blue-200/30 rounded-xl p-4 hover:bg-white/80 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Shipping icon */}
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M16 3h5v5M21 3l-7 7M13 13l7-7M8 13h8M8 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div>
              <Text className="font-semibold text-blue-800 mb-1">
                {method?.name}
              </Text>
              <Text className="text-blue-700 font-medium">
                {convertToLocale({
                  amount: method?.amount!,
                  currency_code: currency_code,
                })}
              </Text>
            </div>
          </div>

          {/* Remove button */}
          <div className="relative group/button">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg blur opacity-0 group-hover/button:opacity-25 transition duration-300"></div>
            <Button
              variant="tonal"
              size="small"
              className="relative bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 hover:text-red-700 p-2 rounded-lg hover:scale-105 transition-all duration-200"
              onClick={handleRemoveShippingMethod}
            >
              <BinIcon size={16} />
            </Button>
          </div>
        </div>

        {/* Delivery time estimate (if available) */}
        <div className="mt-3 pt-3 border-t border-blue-200/30">
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-blue-500">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Standard delivery time applies</span>
          </div>
        </div>

        {/* Corner decorative elements */}
        <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  )
}