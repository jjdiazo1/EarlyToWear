import { convertToLocale } from '@/lib/helpers/money';

export const CartItemsFooter = ({
  currency_code,
  price,
}: {
  currency_code: string;
  price: number;
}) => {
  // 🔧 FIXED: Handle NaN and undefined prices
  const formatPrice = (amount: number) => {
    // Check for invalid values
    if (isNaN(amount) || amount === null || amount === undefined) {
      return 'Free';
    }
    
    try {
      return convertToLocale({
        amount: amount,
        currency_code,
      });
    } catch (error) {
      console.error('❌ Error formatting delivery price:', error);
      // Manual formatting fallback
      if (amount === 0) {
        return 'Free';
      }
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    }
  };

  return (
    <div className='border rounded-sm p-4 flex items-center justify-between label-md'>
      <p className='text-secondary'>Delivery</p>
      <p>
        {formatPrice(price)}
      </p>
    </div>
  );
};