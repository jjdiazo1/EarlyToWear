import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'
import { createOrderFulfillmentWorkflow } from '@medusajs/medusa/core-flows'

import { VendorCreateFulfillmentType } from '../../validators'

/**
 * @oas [post] /vendor/orders/{id}/fulfillments
 * operationId: "VendorCreateFulfillment"
 * summary: "Create Order Fulfillment"
 * description: "Creates a fulfillment for the authenticated vendor's order."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the Order.
 *     schema:
 *       type: string
 * requestBody:
 *   content:
 *     application/json:
 *       schema:
 *         $ref: "#/components/schemas/VendorCreateFulfillment"
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             fulfillment:
 *               $ref: "#/components/schemas/VendorOrderFulfillment"
 * tags:
 *   - Order
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
export const POST = async (
  req: AuthenticatedMedusaRequest<VendorCreateFulfillmentType>,
  res: MedusaResponse
) => {
  const { id } = req.params

  console.log("🔍 Creating fulfillment with data:", req.validatedBody)

  const { result: fulfillment } = await createOrderFulfillmentWorkflow(
    req.scope
  ).run({
    input: {
      order_id: id,
      created_by: req.auth_context.actor_id,
      location_id: req.validatedBody.location_id,
      items: req.validatedBody.items,
      requires_shipping: req.validatedBody.requires_shipping,
      // Añadir campos opcionales solo si están presentes
      ...(req.validatedBody.shipping_option_id && {
        shipping_option_id: req.validatedBody.shipping_option_id
      }),
      ...(req.validatedBody.no_notification !== undefined && {
        no_notification: req.validatedBody.no_notification
      })
    },
    throwOnError: true
  })

  res.json({ fulfillment })
}