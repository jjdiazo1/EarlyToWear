"use client"

import PaymentButton from "./PaymentButton"
import { CartItems } from "./CartItems"
import { CartSummary } from "@/components/organisms"
import WompiPaymentButton from "./WompiPaymentButton"

const Review = ({ cart }: { cart: any }) => {
  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  const paymentProviderId = cart.payment_session?.provider_id

  return (
    <div>
      {/* ... (Las secciones de CartItems y CartSummary se quedan igual) ... */}
      <div className="w-full mb-6">
        <CartItems cart={cart} />
      </div>
      <div className="w-full mb-6 border rounded-sm p-4">
        <CartSummary
          item_total={cart?.item_total || 0}
          shipping_total={cart?.shipping_total || 0}
          total={cart?.total || 0}
          currency_code={cart?.currency_code || ""}
          tax={cart?.tax_total || 0}
        />
      </div>

      {/* ✅ LÓGICA CORREGIDA PARA AMBOS BOTONES */}
      {paymentProviderId === "wompi" ? (
        // Para Wompi, el botón siempre es visible pero se deshabilita con 'notReady'
        <WompiPaymentButton
          cart={cart}
          notReady={!previousStepsCompleted}
          data-testid="wompi-payment-button"
        />
      ) : (
        // Para el botón por defecto, lo ocultamos si los pasos no están completos
        previousStepsCompleted && (
          <PaymentButton
            cart={cart}
            data-testid="submit-order-button"
          />
        )
      )}
    </div>
  )
}

export default Review