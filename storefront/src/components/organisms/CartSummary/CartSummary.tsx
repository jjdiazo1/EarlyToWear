import { convertToLocale } from "@/lib/helpers/money"
import { calculateCartTotal } from "@/lib/helpers/cart-helpers" // 🔧 Import helper

export const CartSummary = ({
  item_total,
  shipping_total,
  total,
  currency_code,
  tax,
  cart, // 🔧 Add cart prop to calculate totals manually if needed
}: {
  item_total: number
  shipping_total: number
  total: number
  currency_code: string
  tax: number
  cart?: any // Optional cart object for manual calculation
}) => {
  
  // 🔧 Calculate totals manually if they're 0 or undefined
  let calculatedItemTotal = item_total;
  let calculatedTotal = total;
  
  if (cart && cart.items && (item_total === 0 || !item_total)) {
    console.log('🔧 CartSummary: Calculating totals manually');
    const { amount } = calculateCartTotal(cart.items, currency_code);
    calculatedItemTotal = amount;
    calculatedTotal = amount + (shipping_total || 0) + (tax || 0);
    
    console.log('🔍 CartSummary calculated:', {
      original_item_total: item_total,
      calculated_item_total: calculatedItemTotal,
      shipping: shipping_total,
      tax: tax,
      calculated_total: calculatedTotal
    });
  }

  const formattedItemTotal = convertToLocale({
    amount: calculatedItemTotal,
    currency_code,
  })

  const formattedShippingTotal = convertToLocale({
    amount: shipping_total,
    currency_code,
  })

  const formattedTotal = convertToLocale({
    amount: calculatedTotal,
    currency_code,
  })

  const formattedTax = convertToLocale({
    amount: tax,
    currency_code,
  })

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">{formattedItemTotal}</span>
      </div>
      
      {shipping_total > 0 && (
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">{formattedShippingTotal}</span>
        </div>
      )}
      
      {tax > 0 && (
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">{formattedTax}</span>
        </div>
      )}
      
      <div className="flex justify-between items-center py-3 border-t-2 border-gray-200">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {formattedTotal}
        </span>
      </div>
    </div>
  )
}