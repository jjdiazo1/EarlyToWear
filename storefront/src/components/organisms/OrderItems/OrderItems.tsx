import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

// 🔧 HELPER: Same price logic as other components
const getItemPrice = (item: any) => {
  console.log('🔍 Order Item - Getting price for:', {
    id: item.id,
    title: item.product_title || item.title,
    unit_price: item.unit_price,
    subtotal: item.subtotal,
    total: item.total,
    quantity: item.quantity,
    calculated_price: item.calculated_price,
    original_price: item.original_price
  });

  // 1. Try calculated_price first
  if (item.calculated_price && item.calculated_price > 0) {
    console.log('✅ Using calculated_price:', item.calculated_price);
    return item.calculated_price;
  }

  // 2. Try unit_price 
  if (item.unit_price && item.unit_price > 0) {
    console.log('✅ Using unit_price:', item.unit_price);
    return item.unit_price;
  }

  // 3. Try original_price
  if (item.original_price && item.original_price > 0) {
    console.log('✅ Using original_price:', item.original_price);
    return item.original_price;
  }

  // 4. Calculate from subtotal if we have quantity
  if (item.subtotal && item.subtotal > 0 && item.quantity && item.quantity > 0) {
    const unitFromSubtotal = item.subtotal / item.quantity;
    console.log('✅ Calculated from subtotal/quantity:', unitFromSubtotal);
    return unitFromSubtotal;
  }

  // 5. Calculate from total if we have quantity  
  if (item.total && item.total > 0 && item.quantity && item.quantity > 0) {
    const unitFromTotal = item.total / item.quantity;
    console.log('✅ Calculated from total/quantity:', unitFromTotal);
    return unitFromTotal;
  }

  console.log('❌ No price found, using 0');
  return 0;
};

export const Item = ({
  item,
  currencyCode
}: {
  item: HttpTypes.StoreOrderLineItem
  currencyCode: string
}) => {
  // 🔧 FIXED: Get actual item price using helper
  const itemUnitPrice = getItemPrice(item);
  const itemTotalPrice = itemUnitPrice * item.quantity;

  // 🔧 FIXED: Direct Colombian formatting
  const formatPrice = (amount: number) => {
    const formatted = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
    
    console.log(`💰 Order Item formatting ${amount} -> ${formatted}`);
    return formatted;
  };

  const formattedUnitPrice = formatPrice(itemUnitPrice);
  const formattedTotalPrice = formatPrice(itemTotalPrice);

  console.log('💰 Order Item prices:', {
    product: item.product_title,
    unitPrice: itemUnitPrice,
    totalPrice: itemTotalPrice,
    quantity: item.quantity,
    formattedTotal: formattedTotalPrice
  });

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-100">
      {/* Product Image */}
      <div className="w-16 h-16 flex-shrink-0">
        {item.thumbnail ? (
          <Image
            src={decodeURIComponent(item.thumbnail)}
            alt={item.product_title || ""}
            width={64}
            height={64}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 text-sm">
          {item.product_title}
        </h3>
        
        {/* Variant Options */}
        {item.variant?.options && (
          <div className="text-xs text-gray-600 mt-1">
            {item.variant.options.map(({ option, id, value }) => (
              <span key={id} className="mr-2">
                {option?.title}: {value}
              </span>
            ))}
          </div>
        )}

        {/* Quantity and Unit Price */}
        <div className="text-xs text-gray-600 mt-1">
          Qty: {item.quantity} × {formattedUnitPrice}
        </div>
      </div>

      {/* Total Price */}
      <div className="text-right">
        <div className="font-medium text-gray-900">
          {formattedTotalPrice}
        </div>
      </div>
    </div>
  );
};