import { convertToLocale } from "@/lib/helpers/money"

// 🔧 HELPER: Same price logic as other components
const getItemPrice = (item: any) => {
  if (item.calculated_price && item.calculated_price > 0) {
    return item.calculated_price;
  }
  if (item.unit_price && item.unit_price > 0) {
    return item.unit_price;
  }
  if (item.original_price && item.original_price > 0) {
    return item.original_price;
  }
  if (item.subtotal && item.subtotal > 0 && item.quantity && item.quantity > 0) {
    return item.subtotal / item.quantity;
  }
  if (item.total && item.total > 0 && item.quantity && item.quantity > 0) {
    return item.total / item.quantity;
  }
  
  const variant = item.variant;
  if (variant?.prices && Array.isArray(variant.prices)) {
    const copPrice = variant.prices.find((p: any) => 
      p.currency_code?.toLowerCase() === 'cop'
    );
    if (copPrice && copPrice.amount) {
      return copPrice.amount;
    }
    
    const anyPrice = variant.prices.find((p: any) => p.amount && p.amount > 0);
    if (anyPrice) {
      return anyPrice.amount;
    }
  }
  
  return 0;
};

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
  
  // 🔧 FIXED: Always calculate from cart items if cart is provided
  let calculatedItemTotal = item_total;
  let calculatedShippingTotal = shipping_total;
  let calculatedTax = tax;
  let calculatedTotal = total;
  
  // Always recalculate if we have cart items
  if (cart && cart.items && cart.items.length > 0) {
    console.log('🔧 CartSummary: Always calculating totals from cart items');
    
    // Calculate item total manually
    calculatedItemTotal = cart.items.reduce((total: number, item: any) => {
      const itemPrice = getItemPrice(item);
      const itemTotal = itemPrice * item.quantity;
      console.log(`💰 Item ${item.product_title}: ${itemPrice} x ${item.quantity} = ${itemTotal}`);
      return total + itemTotal;
    }, 0);
    
    // Handle shipping - clean up NaN values
    calculatedShippingTotal = shipping_total;
    if (isNaN(calculatedShippingTotal) || calculatedShippingTotal === null || calculatedShippingTotal === undefined) {
      calculatedShippingTotal = 0;
    }
    
    // Handle tax
    calculatedTax = tax || 0;
    if (isNaN(calculatedTax)) {
      calculatedTax = 0;
    }
    
    // Calculate final total
    calculatedTotal = calculatedItemTotal + calculatedShippingTotal + calculatedTax;
    
    console.log('🔍 CartSummary calculated:', {
      original_item_total: item_total,
      calculated_item_total: calculatedItemTotal,
      shipping: calculatedShippingTotal,
      tax: calculatedTax,
      calculated_total: calculatedTotal,
      cart_items_count: cart.items.length
    });
  }

  // 🔧 FIXED: Direct Colombian formatting - force correct format
  const formatPrice = (amount: number) => {
    // Always use manual formatting to ensure it works
    const formatted = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
    
    console.log(`💰 CartSummary formatting ${amount} -> ${formatted}`);
    return formatted;
  };

  const formattedItemTotal = formatPrice(calculatedItemTotal);
  const formattedShippingTotal = formatPrice(calculatedShippingTotal);
  const formattedTotal = formatPrice(calculatedTotal);
  const formattedTax = formatPrice(calculatedTax);

  console.log('💰 CartSummary formatted prices:', {
    itemTotal: formattedItemTotal,
    shipping: formattedShippingTotal,
    tax: formattedTax,
    total: formattedTotal
  });

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">{formattedItemTotal}</span>
      </div>
      
      {calculatedShippingTotal >= 0 && (
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {calculatedShippingTotal === 0 ? 'Free' : formattedShippingTotal}
          </span>
        </div>
      )}
      
      {calculatedTax > 0 && (
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