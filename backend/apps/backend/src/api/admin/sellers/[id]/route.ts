import { MedusaRequest, MedusaResponse } from '@medusajs/framework'
import { ContainerRegistrationKeys } from '@medusajs/framework/utils'

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  try {
    // Build filters
    const filters: any = {}
    
    if (req.query.q) {
      filters.$or = [
        { name: { $ilike: `%${req.query.q}%` } },
        { email: { $ilike: `%${req.query.q}%` } }
      ]
    }

    if (req.query.status) {
      filters.status = req.query.status
    }

    const { data: sellers, metadata } = await query.graph({
      entity: 'seller',
      fields: [
        'id',
        'name', 
        'handle',
        'email',
        'phone',
        'description',
        'photo',
        'address_line',
        'city',
        'postal_code',
        'country_code',
        'tax_id',
        'created_at',
        'updated_at',
        '*members.id',
        '*members.name',
        '*members.email',
        '*members.role'
      ],
      filters,
      pagination: {
        take: req.query.limit ? parseInt(req.query.limit as string) : 50,
        skip: req.query.offset ? parseInt(req.query.offset as string) : 0
      }
    })

    // Add computed fields
    const sellersWithStats = sellers.map(seller => ({
      ...seller,
      members_count: seller.members?.length || 0
    }))

    res.json({
      sellers: sellersWithStats,
      count: metadata?.count || 0,
      offset: metadata?.skip || 0,
      limit: metadata?.take || 50
    })
  } catch (error) {
    console.error('Error fetching sellers:', error)
    res.status(500).json({ 
      error: 'Failed to fetch sellers',
      sellers: [], // Siempre devolver array vacío en error
      count: 0
    })
  }
}