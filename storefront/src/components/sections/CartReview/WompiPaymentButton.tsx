// Botón y formulario de pago con Wompi
// Similar a StripePaymentButton, pero usando la API de Wompi

import React, { useState } from 'react'
import { Button } from '@/components/atoms'

const WompiPaymentButton = ({ cart, notReady, "data-testid": dataTestId }) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Ejemplo de datos mínimos requeridos por Wompi
  // Puedes adaptar esto para pedir los datos de tarjeta al usuario
  const wompiPayload = {
    amount_in_cents: cart.total,
    currency: cart.currency_code || 'COP',
    customer_email: cart.email,
    payment_method: {
      type: 'CARD',
      // Aquí deberías pedir los datos de la tarjeta al usuario
      // Ejemplo:
      // number: '4242424242424242',
      // cvc: '123',
      // exp_month: '12',
      // exp_year: '29',
      // card_holder: 'Nombre Apellido',
    },
    reference: `order-${cart.id}`,
    // Otros campos opcionales
  }

  const handlePayment = async () => {
    setSubmitting(true)
    setErrorMessage(null)
    setSuccess(false)
    try {
      const response = await fetch('/api/payments/wompi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wompiPayload),
      })
      const result = await response.json()
      if (result.data && result.data.status === 'APPROVED') {
        setSuccess(true)
        // Aquí puedes actualizar el estado del pedido, redirigir, etc.
      } else {
        setErrorMessage(result.data ? result.data.status_message : 'Error en el pago')
      }
    } catch (err) {
      setErrorMessage(err.message)
    }
    setSubmitting(false)
  }

  return (
    <>
      <Button
        disabled={notReady}
        onClick={handlePayment}
        loading={submitting}
        className="w-full"
      >
        Pagar con Wompi
      </Button>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      {success && <div className="text-green-600">¡Pago aprobado!</div>}
    </>
  )
}

export default WompiPaymentButton
