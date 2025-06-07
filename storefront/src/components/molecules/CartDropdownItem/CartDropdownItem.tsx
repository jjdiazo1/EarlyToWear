import { convertToLocale } from "@/lib/helpers/money"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

// 🔧 HELPER: Same price logic as CartDropdown
const getItemPrice = (item: any) => {
  console.log('🔍 CartDropdownItem - Getting price for:', {
    id: item.id,
    title: item.product_title,
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

  // 6. Try variant prices
  const variant = item.variant;
  if (variant?.prices && Array.isArray(variant.prices)) {
    const copPrice = variant.prices.find((p: any) => 
      p.currency_code?.toLowerCase() === 'cop'
    );
    if (copPrice && copPrice.amount) {
      console.log('✅ Using variant COP price:', copPrice.amount);
      return copPrice.amount;
    }
    
    const anyPrice = variant.prices.find((p: any) => p.amount && p.amount > 0);
    if (anyPrice) {
      console.log('✅ Using any variant price:', anyPrice.amount);
      return anyPrice.amount;
    }
  }

  console.log('❌ No price found, using 0');
  return 0;
};

export const CartDropdownItem = ({
  item,
  currency_code,
}: {
  item: HttpTypes.StoreCartLineItem
  currency_code: string
}) => {
  // 🔧 FIXED: Get actual item price using helper
  const itemUnitPrice = getItemPrice(item);
  const itemTotalPrice = itemUnitPrice * item.quantity;

  // Format prices properly
  const formattedUnitPrice = convertToLocale({
    amount: itemUnitPrice,
    currency_code,
  });

  // 🔧 FIXED: Use direct formatting like the total
  const formattedTotalPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(itemTotalPrice);

  // 🔧 FIXED: Original price with direct formatting
  let original_total = null;
  if (item.compare_at_unit_price && item.compare_at_unit_price > 0) {
    original_total = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(item.compare_at_unit_price * item.quantity);
  }

  // Check if there's a discount
  const hasDiscount = original_total && 
    item.compare_at_unit_price && 
    item.compare_at_unit_price > itemUnitPrice;

  console.log('💰 CartDropdownItem prices:', {
    product: item.product_title,
    unitPrice: itemUnitPrice,
    totalPrice: itemTotalPrice,
    formattedTotal: formattedTotalPrice,
    quantity: item.quantity,
    hasDiscount,
    compareAtPrice: item.compare_at_unit_price,
    currency: currency_code
  });

  return (
    <div className="border rounded-sm p-1 flex gap-2 mb-4">
      <div className="w-[100px] h-[132px] flex items-center justify-center">
        {item.thumbnail ? (
          <Image
            src={decodeURIComponent(item.thumbnail)}
            alt={item.product_title || ""}
            width={80}
            height={90}
            className="w-[80px] h-[90px] object-cover rounded-xs"
            priority
          />
        ) : (
          <Image
            src={"/images/placeholder.svg"}
            alt="Product thumbnail"
            width={50}
            height={66}
            className="rounded-xs w-[50px] h-[66px] object-contain opacity-30"
          />
        )}
      </div>

      <div className="py-2">
        <h4 className="heading-xs">{item.product_title}</h4>
        <div className="label-md text-secondary">
          {item.variant?.options?.map(({ option, id, value }) => (
            <p key={id}>
              {option?.title}: <span className="text-primary">{value}</span>
            </p>
          ))}
          <p>
            Quantity: <span className="text-primary">{item.quantity}</span>
          </p>
        </div>
        <div className="pt-2 flex items-center gap-2 mt-4 lg:mt-0">
          {hasDiscount && original_total && (
            <p className="line-through text-secondary label-md">
              {original_total}
            </p>
          )}
          <p className="label-lg font-semibold">
            {formattedTotalPrice}
          </p>
        </div>
      </div>
    </div>
  )
}