import { MedusaRequest, MedusaResponse } from '@medusajs/framework'
import { ContainerRegistrationKeys, MedusaError } from '@medusajs/framework/utils'

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { id } = req.params

  // Solo verificar que el seller existe
  const {
    data: [seller]
  } = await query.graph({
    entity: 'seller',
    fields: ['id', 'name'],
    filters: { id }
  })

  if (!seller) {
    return res.status(404).json({ error: 'Seller not found' })
  }

  // Token súper simple
  const token = `seller_${id}_${Date.now()}`
  
  // URL para abrir el panel vendor (cambiar por la URL correcta de tu vendor panel)
  const vendorUrl = `http://localhost:5173/vendor?impersonate=${token}&seller_id=${id}`

  res.json({
    success: true,
    seller_name: seller.name,
    vendor_url: vendorUrl,
    message: `Ready to impersonate ${seller.name}`
  })
}