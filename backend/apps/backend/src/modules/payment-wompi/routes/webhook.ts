import express from 'express'
const router = express.Router()

// Endpoint para recibir webhooks de Wompi
// POST /webhooks/wompi
// Wompi enviará eventos de pago aquí. Procesa el evento y actualiza el estado del pedido.
router.post('/webhooks/wompi', (req, res) => {
  // TODO: Verifica la firma del webhook si aplica (opcional)
  const event = req.body
  // TODO: Actualiza el estado del pedido en tu base de datos según event.data.transaction.status
  // Ejemplo: status puede ser 'APPROVED', 'DECLINED', 'VOIDED', etc.
  res.status(200).send('OK')
})

export default router
