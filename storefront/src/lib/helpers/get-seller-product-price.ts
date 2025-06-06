import { convertToLocale } from "./money"

export const getPricesForVariant = (variant: any) => {
  // Debug what we're receiving
  console.log('getPricesForVariant - variant data:', {
    calculated_price: variant?.calculated_price,
    prices: variant?.prices,
    id: variant?.id
  });

  let amount, currency_code, original_amount;
  
  // Try multiple price structures
  if (variant?.calculated_price?.calculated_amount && variant?.calculated_price?.currency_code) {
    // Structure with calculated_price (preferred)
    amount = variant.calculated_price.calculated_amount;
    currency_code = variant.calculated_price.currency_code;
    original_amount = variant.calculated_price.original_amount || amount;
  } else if (variant?.prices?.length > 0) {
    // Legacy prices array structure
    const price = variant.prices[0];
    if (price?.amount && price?.currency_code) {
      amount = price.amount;
      currency_code = price.currency_code;
      original_amount = price.original_amount || amount;
    }
  } else {
    // No valid price structure found
    console.warn('No valid price found for variant:', variant?.id);
    return null;
  }

  if (!amount || !currency_code) {
    console.warn('Missing amount or currency_code:', { amount, currency_code });
    return null;
  }

  // Ensure we have numbers
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  const numOriginalAmount = typeof original_amount === 'string' ? parseFloat(original_amount) : original_amount;

  try {
    return {
      calculated_price_number: numAmount,
      calculated_price: convertToLocale({
        amount: numAmount,
        currency_code: currency_code,
      }),
      original_price_number: numOriginalAmount,
      original_price: convertToLocale({
        amount: numOriginalAmount,
        currency_code: currency_code,
      }),
      currency_code: currency_code,
    }
  } catch (error) {
    console.error('Error formatting price:', error);
    // Fallback price display
    return {
      calculated_price_number: numAmount,
      calculated_price: `${currency_code.toUpperCase()} ${numAmount}`,
      original_price_number: numOriginalAmount,
      original_price: `${currency_code.toUpperCase()} ${numOriginalAmount}`,
      currency_code: currency_code,
    };
  }
}

export function getSellerProductPrice({
  product,
  variantId,
}: {
  product: any
  variantId?: string
}) {
  if (!product || !product.id) {
    console.warn("No product provided to getSellerProductPrice");
    return { product, cheapestPrice: null, variantPrice: null };
  }

  console.log('getSellerProductPrice - product:', {
    id: product.id,
    title: product.title,
    variants: product.variants?.map((v: any) => ({
      id: v.id,
      hasCalculatedPrice: !!v.calculated_price,
      hasPrices: !!v.prices?.length,
      calculated_price: v.calculated_price,
      prices: v.prices
    }))
  });

  const cheapestPrice = () => {
    if (!product || !product.variants?.length) {
      console.log('No variants found');
      return null
    }

    // Filter variants that have any kind of pricing
    const validVariants = product.variants.filter((v: any) => {
      const hasCalculatedPrice = v.calculated_price?.calculated_amount && v.calculated_price?.currency_code;
      const hasPrices = v.prices?.length > 0 && v.prices[0]?.amount && v.prices[0]?.currency_code;
      return hasCalculatedPrice || hasPrices;
    });

    console.log('Valid variants found:', validVariants.length);

    if (validVariants.length === 0) {
      return null;
    }

    const cheapestVariant: any = validVariants.sort((a: any, b: any) => {
      const aAmount = a.calculated_price?.calculated_amount || a.prices?.[0]?.amount || 0;
      const bAmount = b.calculated_price?.calculated_amount || b.prices?.[0]?.amount || 0;
      return aAmount - bAmount;
    })[0]

    console.log('Cheapest variant:', cheapestVariant);
    return getPricesForVariant(cheapestVariant)
  }

  const variantPrice = () => {
    if (!product || !variantId) {
      return null
    }

    const variant: any = product.variants?.find(
      (v: any) => v.id === variantId || v.sku === variantId
    )

    if (!variant) {
      return null
    }

    return getPricesForVariant(variant)
  }

  return {
    product,
    cheapestPrice: cheapestPrice(),
    variantPrice: variantPrice(),
  }
}