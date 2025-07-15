// Exporta el módulo para que pueda ser registrado en medusa-config.ts

import { WompiCardProviderService } from './services/wompi-card-provider'
import paymentRoutes from './routes/payment'
import webhookRoutes from './routes/webhook'

export default {
  services: [WompiCardProviderService],
  routes: [paymentRoutes, webhookRoutes],
}
