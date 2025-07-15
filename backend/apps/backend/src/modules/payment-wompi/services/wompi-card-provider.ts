// Servicio específico para pagos con tarjeta vía Wompi
// Puede extender WompiProvider o implementar lógica adicional

import { WompiProvider } from '../core/wompi-provider'

export class WompiCardProviderService extends WompiProvider {
  static identifier = 'wompi-card'

  constructor(_, options) {
    super(options)
  }

  // Métodos específicos para pagos con tarjeta
}
