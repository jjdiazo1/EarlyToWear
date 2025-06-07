import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@/lib/helpers/money"
import { DeleteCartItemButton } from "@/components/molecules"
import { Link } from "@/i18n/routing"

// 🔧 HELPER: Same price logic as CartDropdown
const getItemPrice = (item: any) => {
  console.log('🔍 CartItemsProducts - Getting price for:', {
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

export const CartItemsProducts = ({
  products,
  currency_code,
  delete_item = true,
}: {
  products: HttpTypes.StoreCartLineItem[]
  currency_code: string
  delete_item?: boolean
}) => {
  return (
    <div>
      {products.map((product) => {
        const { options } = product.variant ?? {}
        
        // 🔧 FIXED: Get actual item price using helper
        const itemUnitPrice = getItemPrice(product);
        const itemTotalPrice = itemUnitPrice * product.quantity;

        // 🔧 FIXED: Direct Colombian formatting - force correct format
        const formatPrice = (amount: number) => {
          // Always use manual formatting to ensure it works
          const formatted = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(amount);
          
          console.log(`💰 Formatting ${amount} -> ${formatted}`);
          return formatted;
        };

        const total = formatPrice(itemTotalPrice);

        // 🔧 FIXED: Original price formatting with currency
        let original_total = null;
        if (product.compare_at_unit_price && product.compare_at_unit_price > 0) {
          const originalTotalAmount = product.compare_at_unit_price * product.quantity;
          original_total = formatPrice(originalTotalAmount);
        }

        const hasDiscount = original_total && 
          product.compare_at_unit_price && 
          product.compare_at_unit_price > itemUnitPrice;

        console.log('💰 CartItemsProducts item:', {
          product: product.product_title || product.title,
          unitPrice: itemUnitPrice,
          totalPrice: itemTotalPrice,
          formattedTotal: total,
          hasDiscount
        });

        return (
          <div key={product.id} className="border rounded-sm p-1 flex gap-2">
            <Link href={`/products/${product.product_handle}`}>
              <div className="w-[100px] h-[132px] flex items-center justify-center">
                {product.thumbnail ? (
                  <Image
                    src={decodeURIComponent(product.thumbnail)}
                    alt="Product thumbnail"
                    width={100}
                    height={132}
                    className="rounded-xs w-[100px] h-[132px] object-contain"
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
            </Link>

            <div className="w-full p-2">
              <div className="flex justify-between lg:mb-4">
                <Link href={`/products/${product.product_handle}`}>
                  <div className="w-[100px] md:w-[200px] lg:w-[280px] mb-4 lg:mb-0">
                    <h3 className="heading-xs uppercase truncate">
                      {product.subtitle} {product.title}
                    </h3>
                  </div>
                </Link>
                {delete_item && (
                  <div className="lg:flex">
                    <DeleteCartItemButton id={product.id} />
                  </div>
                )}
              </div>
              <Link href={`/products/${product.product_handle}`}>
                <div className="lg:flex justify-between -mt-4 lg:mt-0">
                  <div className="label-md text-secondary">
                    {options?.map(({ option, id, value }) => (
                      <p key={id}>
                        {option?.title}:{" "}
                        <span className="text-primary">{value}</span>
                      </p>
                    ))}
                    <p>
                      Quantity:{" "}
                      <span className="text-primary">{product.quantity}</span>
                    </p>
                  </div>
                  <div className="lg:text-right flex lg:block items-center gap-2 mt-4 lg:mt-0">
                    {hasDiscount && original_total && (
                      <p className="line-through text-secondary label-md">
                        {original_total}
                      </p>
                    )}
                    <p className="label-lg">{total}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}