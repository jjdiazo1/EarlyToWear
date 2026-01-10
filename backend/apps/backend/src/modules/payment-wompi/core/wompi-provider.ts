import axios from 'axios'

// Proveedor de pagos Wompi: lógica para crear transacciones y consultar estado
export class WompiProvider {
  private publicKey: string
  private privateKey: string
  private env: string

  constructor(options) {
    this.publicKey = options.publicKey || process.env.WOMPI_PUBLIC_KEY
    this.privateKey = options.privateKey || process.env.WOMPI_PRIVATE_KEY
    this.env = options.env || process.env.WOMPI_ENV || 'sandbox'
  }

  // Crea una transacción en Wompi
  async createTransaction(data) {
    const url = this.env === 'production'
      ? 'https://production.wompi.co/v1/transactions'
      : 'https://sandbox.wompi.co/v1/transactions'
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${this.privateKey}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data
  }

  // Consulta el estado de una transacción en Wompi
  async getTransactionStatus(transactionId) {
    const url = this.env === 'production'
      ? `https://production.wompi.co/v1/transactions/${transactionId}`
      : `https://sandbox.wompi.co/v1/transactions/${transactionId}`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.privateKey}`,
      },
    })
    return response.data
  }
}
