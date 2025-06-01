import { Button } from "@/components/atoms"
import { CartItems, CartSummary } from "@/components/organisms"
import { Link } from "@/i18n/routing"
import { retrieveCart } from "@/lib/data/cart"
import CartPromotionCode from "../CartReview/CartPromotionCode"

export const Cart = async () => {
  const cart = await retrieveCart()

  return (
    <>
      <div className="col-span-12 lg:col-span-6">
        <CartItems cart={cart} />
      </div>
      <div className="lg:col-span-2"></div>
      <div className="col-span-12 lg:col-span-4 cart-container">
        {/* Enhanced Promotion Code Section */}
        <div className="w-full mb-6 relative group">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl blur opacity-60"></div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full rounded-2xl"></div>
          
          <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
            {/* Header with icon */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M21 12a9 9 0 11-6.219-8.56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-1 w-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                <h3 className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Promotion Code
                </h3>
              </div>
            </div>
            
            <CartPromotionCode cart={cart} />

            {/* Corner decorative elements */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Enhanced Cart Summary Section - ALWAYS ON TOP */}
        <div className="relative group shopping-cart">
          {/* Subtle shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full rounded-2xl"></div>
          
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur opacity-60"></div>
          
          <div className="relative bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-xl p-6 h-fit cart-summary-sticky">
            {/* Summary Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              <h3 className="font-bold text-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Order Summary
              </h3>
            </div>

            {/* Cart Summary */}
            <div className="mb-6">
              <CartSummary
                item_total={cart?.item_total || 0}
                shipping_total={cart?.shipping_total || 0}
                total={cart?.total || 0}
                currency_code={cart?.currency_code || ""}
                tax={cart?.tax_total || 0}
              />
            </div>

            {/* Enhanced Checkout Button */}
            <Link href="/checkout?step=address" className="block">
              <div className="relative group/button">
                {/* Button background glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover/button:opacity-50 transition duration-300"></div>
                
                <Button className="relative w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex justify-center items-center gap-2 border-0">
                  <span>Go to checkout</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </div>
            </Link>

            {/* Security badge */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-500">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Secure checkout guaranteed</span>
            </div>

            {/* Corner decorative elements */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </>
  )
}