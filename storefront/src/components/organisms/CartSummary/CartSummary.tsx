"use client"

import { convertToLocale } from "@/lib/helpers/money"

export const CartSummary = ({
  item_total,
  shipping_total,
  total,
  currency_code,
  tax,
}: {
  item_total: number
  shipping_total: number
  total: number
  currency_code: string
  tax: number
}) => {
  return (
    <div className="relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-xl blur opacity-60"></div>
      
      <div className="relative bg-white/50 backdrop-blur-sm border border-gray-200/30 rounded-xl p-6">
        <div className="space-y-4">
          {/* Items */}
          <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              <span className="text-gray-700 font-medium">Items:</span>
            </div>
            <span className="text-gray-900 font-semibold">
              {convertToLocale({
                amount: item_total,
                currency_code,
              })}
            </span>
          </div>

          {/* Tax */}
          <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <span className="text-gray-700 font-medium">Tax:</span>
            </div>
            <span className="text-gray-900 font-semibold">
              {convertToLocale({
                amount: tax,
                currency_code,
              })}
            </span>
          </div>

          {/* Delivery */}
          <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full"></div>
              <span className="text-gray-700 font-medium">Delivery:</span>
            </div>
            <span className="text-gray-900 font-semibold">
              {convertToLocale({
                amount: shipping_total,
                currency_code,
              })}
            </span>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/50 rounded-lg p-4 mt-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Total:
                </span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {convertToLocale({
                  amount: total,
                  currency_code,
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Corner decorative elements */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  )
}