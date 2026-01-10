import express from 'express'
import { WompiProvider } from '../core/wompi-provider'

const router = express.Router()

// Endpoint para crear una transacción Wompi
// POST /api/payments/wompi
// Espera en el body: { amount_in_cents, currency, customer_email, payment_method, reference, ... }
router.post('/api/payments/wompi', async (req, res) => {
  try {
    const wompi = new WompiProvider({})
    const wompiData = req.body // Debe contener los datos requeridos por Wompi
    const result = await wompi.createTransaction(wompiData)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
