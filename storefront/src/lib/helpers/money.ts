import { isEmpty } from "./isEmpty"

type ConvertToLocaleParams = {
  amount: number
  currency_code: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = "es-CO", // Colombian Spanish as default
}: ConvertToLocaleParams) => {
  if (!currency_code || isEmpty(currency_code) || amount === null || amount === undefined) {
    return amount?.toString() || "0"
  }

  // Ensure we have a number
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) {
    console.warn(`Invalid amount provided: ${amount}`);
    return "0";
  }

  try {
    const currencyCode = currency_code.toUpperCase();
    
    // Special handling for Colombian Peso
    if (currencyCode === 'COP') {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: minimumFractionDigits ?? 0, // COP typically doesn't use decimals
        maximumFractionDigits: maximumFractionDigits ?? 0,
      }).format(numericAmount)
    }

    // For other currencies
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(numericAmount)
  } catch (error) {
    console.error(`Currency formatting error for ${currency_code}:`, error)
    
    // Fallback formatting - this should always work
    const symbol = currency_code.toUpperCase() === 'COP' ? 'COP' : currency_code.toUpperCase();
    const formattedAmount = numericAmount.toLocaleString(locale);
    return `${symbol} ${formattedAmount}`
  }
}