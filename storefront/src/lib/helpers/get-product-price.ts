import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "./money"

// 🔧 HELPER: Get prices from variant without relying on calculated_price
export const getPricesForVariant = (variant: any) => {
  console.log('🔍 getPricesForVariant called with:', {
    id: variant.id,
    calculated_price: variant.calculated_price,
    prices: variant.prices,
    calculated_price_type: typeof variant.calculated_price,
    calculated_price_keys: variant.calculated_price ? Object.keys(variant.calculated_price) : []
  });

  // Try calculated_price first if available
  if (variant.calculated_price && variant.calculated_price.calculated_amount) {
    console.log('✅ Using calculated_price structure')
    return {
      calculated_price_number: variant.calculated_price.calculated_amount,
      original_price_number: variant.calculated_price.original_amount || variant.calculated_price.calculated_amount,
      currency_code: variant.calculated_price.currency_code || 'cop',
      calculated_price: convertToLocale({
        amount: variant.calculated_price.calculated_amount,
        currency_code: variant.calculated_price.currency_code || 'cop'
      }),
      original_price: convertToLocale({
        amount: variant.calculated_price.original_amount || variant.calculated_price.calculated_amount,
        currency_code: variant.calculated_price.currency_code || 'cop'
      })
    };
  }

  // 🔧 FALLBACK: Use prices array and find COP price
  if (variant.prices && Array.isArray(variant.prices) && variant.prices.length > 0) {
    console.log('⚡ Using prices array fallback')
    
    // Find COP price specifically
    const copPrice = variant.prices.find((price: any) => 
      price.currency_code?.toLowerCase() === 'cop'
    );
    
    const priceToUse = copPrice || variant.prices[0]; // Fallback to first price
    
    if (priceToUse && priceToUse.amount) {
      console.log('💰 Found price:', priceToUse.amount, priceToUse.currency_code)
      
      return {
        calculated_price_number: priceToUse.amount,
        original_price_number: priceToUse.amount,
        currency_code: priceToUse.currency_code || 'cop',
        calculated_price: convertToLocale({
          amount: priceToUse.amount,
          currency_code: priceToUse.currency_code || 'cop'
        }),
        original_price: convertToLocale({
          amount: priceToUse.amount,
          currency_code: priceToUse.currency_code || 'cop'
        })
      };
    }
  }

  console.log('❌ No valid price found for variant:', variant.id)
  return null;
};

export type ProductPrice = {
  calculated_price: string
  original_price?: string
  calculated_price_number: number
  original_price_number?: number
  currency_code: string
}

export const getProductPrice = ({
  product,
  variantId,
}: {
  product: HttpTypes.StoreProduct | Partial<HttpTypes.StoreProduct> | any
  variantId?: string
}) => {
  console.log('🔍 getProductPrice called for product:', product.id)

  if (!product.variants || product.variants.length === 0) {
    console.log('❌ No variants found')
    return {
      variantPrice: undefined,
      cheapestPrice: undefined,
    }
  }

  console.log('📦 Processing', product.variants.length, 'variants')

  const variants = product.variants as any[]

  // Get prices for all variants
  const variantsWithPrices = variants
    .map((variant) => {
      const priceInfo = getPricesForVariant(variant);
      return priceInfo ? { ...variant, priceInfo } : null;
    })
    .filter(Boolean);

  console.log('💰 Found', variantsWithPrices.length, 'variants with prices')

  if (variantsWithPrices.length === 0) {
    console.log('❌ No variants have valid prices')
    return {
      variantPrice: undefined,
      cheapestPrice: undefined,
    }
  }

  // Find cheapest variant
  const cheapestVariant = variantsWithPrices.reduce((cheapest, current) => {
    if (!cheapest) return current;
    return (current as any).priceInfo.calculated_price_number < (cheapest as any).priceInfo.calculated_price_number 
      ? current 
      : cheapest;
  });

  console.log('🏆 Cheapest variant:', (cheapestVariant as any).id, 'Price:', `$ ${((cheapestVariant as any).priceInfo.calculated_price_number / 100).toLocaleString()}`)

  // If specific variant requested, find its price
  let selectedVariantPrice = undefined;
  if (variantId) {
    const selectedVariant = variantsWithPrices.find(v => (v as any).id === variantId);
    selectedVariantPrice = selectedVariant ? (selectedVariant as any).priceInfo : undefined;
  }

  return {
    variantPrice: selectedVariantPrice,
    cheapestPrice: (cheapestVariant as any).priceInfo,
  }
}