import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import * as zod from "zod"

import { AdminOrder, HttpTypes } from "@medusajs/types"
import { Alert, Button, Select, Switch, toast } from "@medusajs/ui"
import { useForm, useWatch } from "react-hook-form"

import { OrderLineItemDTO } from "@medusajs/types"
import { Form } from "../../../../../components/common/form"
import {
  RouteFocusModal,
  useRouteModal,
} from "../../../../../components/modals"
import { KeyboundForm } from "../../../../../components/utilities/keybound-form"
import { useCreateOrderFulfillment } from "../../../../../hooks/api/orders"
import { useStockLocations } from "../../../../../hooks/api/stock-locations"
import { getFulfillableQuantity } from "../../../../../lib/order-item"
import { CreateFulfillmentSchema } from "./constants"
import { OrderCreateFulfillmentItem } from "./order-create-fulfillment-item"
import {
  useReservationItems,
  useShippingOptions,
} from "../../../../../hooks/api"

type OrderCreateFulfillmentFormProps = {
  order: AdminOrder
  requiresShipping: boolean
}

export function OrderCreateFulfillmentForm({
  order,
  requiresShipping,
}: OrderCreateFulfillmentFormProps) {
  const { t } = useTranslation()
  const { handleSuccess } = useRouteModal()

  const { mutateAsync: createOrderFulfillment, isPending: isMutating } =
    useCreateOrderFulfillment(order.id)

  const { reservations: reservationsRaw } = useReservationItems()

  const reservations = reservationsRaw?.filter((r) =>
    order.items.some((i) => i.id === r.line_item_id)
  )

  const itemReservedQuantitiesMap = useMemo(
    () =>
      new Map((reservations || []).map((r) => [r.line_item_id, r.quantity])),
    [reservations]
  )

  const [fulfillableItems, setFulfillableItems] = useState(() =>
    (order.items || []).filter(
      (item) =>
        item.requires_shipping === requiresShipping &&
        getFulfillableQuantity(item as any) > 0
    )
  )

  const form = useForm<zod.infer<typeof CreateFulfillmentSchema>>({
    defaultValues: {
      quantity: fulfillableItems.reduce(
        (acc, item) => {
          acc[item.id] = getFulfillableQuantity(item as any)
          return acc
        },
        {} as Record<string, number>
      ),
      send_notification: true,
    },
    resolver: zodResolver(CreateFulfillmentSchema),
  })

  const selectedLocationId = useWatch({
    name: "location_id",
    control: form.control,
  })

  const { stock_locations = [] } = useStockLocations()

  const { shipping_options = [], isLoading: isShippingOptionsLoading } =
    useShippingOptions({
      fields: "+service_zone.fulfillment_set.location.id,+shipping_profile",
    })

  // Filter shipping options by selected location
  const filteredShippingOptions = useMemo(() => {
    if (!selectedLocationId) return []
    
    return shipping_options.filter((option) => {
      return option?.service_zone?.fulfillment_set?.location?.id === selectedLocationId
    })
  }, [shipping_options, selectedLocationId])

  const shippingOptionId = useWatch({
    name: "shipping_option_id",
    control: form.control,
  })

  // DEBUG: Log shipping profiles
  useEffect(() => {
    console.log("🔍 DEBUG: Shipping Options:", filteredShippingOptions.map(o => ({
      id: o?.id,
      name: o?.name,
      shipping_profile_id: o?.shipping_profile_id,
      shipping_profile: o?.shipping_profile
    })))
    
    console.log("🔍 DEBUG: Order Items Shipping Profiles:", order.items.map(item => ({
      id: item.id,
      title: item.title,
      shipping_profile_id: item.variant?.product?.shipping_profile?.id,
      shipping_profile_name: item.variant?.product?.shipping_profile?.name,
      requires_shipping: item.requires_shipping
    })))
  }, [filteredShippingOptions, order.items])

  // Reset shipping option when location changes
  useEffect(() => {
    if (selectedLocationId) {
      form.setValue("shipping_option_id", "")
    }
  }, [selectedLocationId, form])

  const handleSubmit = form.handleSubmit(async (data) => {
    // DEBUG logging
    console.log("🚀 SUBMIT DEBUG:")
    console.log("Selected Location:", selectedLocationId)
    console.log("Selected Shipping Option ID:", shippingOptionId)
    console.log("Requires Shipping:", requiresShipping)
    console.log("Form Data:", data)

    if (requiresShipping) {
      const selectedShippingOption = filteredShippingOptions.find(
        (o) => o?.id === shippingOptionId
      )

      if (!selectedShippingOption) {
        form.setError("shipping_option_id", {
          type: "manual",
          message: t("orders.fulfillment.error.noShippingOption"),
        })
        return
      }

      console.log("Selected Shipping Option:", selectedShippingOption)
      console.log("Shipping Profile ID:", selectedShippingOption.shipping_profile_id)
    }

    if (!selectedLocationId) {
      form.setError("location_id", {
        type: "manual",
        message: t("orders.fulfillment.error.noLocation"),
      })
      return
    }

    // For non-shipping fulfillments, just include all items with quantities
    if (!requiresShipping) {
      const payload: HttpTypes.AdminCreateOrderFulfillment & {
        requires_shipping: boolean
      } = {
        location_id: selectedLocationId,
        requires_shipping: false,
        items: Object.entries(data.quantity)
          .filter(([id, value]) => !!value)
          .map(([id, quantity]) => ({ id, quantity })),
      }

      console.log("Non-shipping payload:", payload)

      try {
        await createOrderFulfillment(payload)
        toast.success(t("orders.fulfillment.toast.created"))
        handleSuccess(`/orders/${order.id}`)
      } catch (e: any) {
        console.error("Fulfillment error:", e)
        toast.error(e.message)
      }
      return
    }

    // For shipping fulfillments, check compatibility
    const selectedShippingOption = filteredShippingOptions.find(
      (o) => o?.id === shippingOptionId
    )
    
    const selectedShippingProfileId = selectedShippingOption?.shipping_profile_id
    
    console.log("Checking profile compatibility...")
    console.log("Selected profile ID:", selectedShippingProfileId)

    // Get unique shipping profiles from items
    const itemShippingProfiles = new Set(
      order.items
        .filter(item => requiresShipping ? item.requires_shipping : !item.requires_shipping)
        .map(item => item.variant?.product?.shipping_profile?.id)
        .filter(Boolean)
    )

    console.log("Item shipping profiles:", Array.from(itemShippingProfiles))

    // If we have items with different shipping profiles, we need to create separate fulfillments
    // OR allow fulfillment without strict profile matching (depending on your business logic)
    
    // OPTION 1: Strict matching (current approach)
    const compatibleItems = Object.entries(data.quantity).filter(([id, value]) => {
      if (!value) return false
      
      const item = order.items.find(item => item.id === id)
      if (!item) return false
      
      const itemShippingProfileId = item.variant?.product?.shipping_profile?.id
      const isCompatible = itemShippingProfileId === selectedShippingProfileId
      
      console.log(`Item ${item.title}:`, {
        itemProfileId: itemShippingProfileId,
        selectedProfileId: selectedShippingProfileId,
        compatible: isCompatible
      })
      
      return isCompatible
    })

    // OPTION 2: Relaxed matching - allow fulfillment regardless of profile
    // const compatibleItems = Object.entries(data.quantity).filter(([id, value]) => !!value)

    if (compatibleItems.length === 0) {
      console.log("❌ No compatible items found")
      
      // Show detailed error
      const itemProfiles = order.items.map(item => ({
        title: item.title,
        profileId: item.variant?.product?.shipping_profile?.id,
        profileName: item.variant?.product?.shipping_profile?.name
      }))
      
      console.log("Available item profiles:", itemProfiles)
      
      toast.error(`No hay items compatibles. Perfiles encontrados: ${Array.from(itemShippingProfiles).join(", ")}. Perfil seleccionado: ${selectedShippingProfileId}`)
      return
    }

    const payload: HttpTypes.AdminCreateOrderFulfillment & {
      requires_shipping: boolean
    } = {
      location_id: selectedLocationId,
      requires_shipping: true,
      shipping_option_id: shippingOptionId,
      items: compatibleItems.map(([id, quantity]) => ({ id, quantity })),
    }

    console.log("Final payload:", payload)

    try {
      await createOrderFulfillment(payload)
      toast.success(t("orders.fulfillment.toast.created"))
      handleSuccess(`/orders/${order.id}`)
    } catch (e: any) {
      console.error("Fulfillment error:", e)
      toast.error(e.message)
    }
  })

  useEffect(() => {
    if (stock_locations?.length && shipping_options?.length) {
      const initialShippingOptionId =
        order.shipping_methods?.[0]?.shipping_option_id

      if (initialShippingOptionId && requiresShipping) {
        const shippingOption = shipping_options.find(
          (o) => o?.id === initialShippingOptionId
        )

        if (shippingOption) {
          const locationId =
            shippingOption.service_zone.fulfillment_set.location.id

          form.setValue("location_id", locationId)
          form.setValue("shipping_option_id", initialShippingOptionId)
        }
      }
    }
  }, [stock_locations?.length, shipping_options?.length])

  const fulfilledQuantityArray = (order.items || []).map(
    (item) =>
      item.requires_shipping === requiresShipping &&
      item.detail.fulfilled_quantity
  )

  useEffect(() => {
    const itemsToFulfill =
      order?.items?.filter(
        (item) =>
          item.requires_shipping === requiresShipping &&
          getFulfillableQuantity(item as OrderLineItemDTO) > 0
      ) || []

    setFulfillableItems(itemsToFulfill)

    if (itemsToFulfill.length) {
      form.clearErrors("root")
    } else {
      form.setError("root", {
        type: "manual",
        message: t("orders.fulfillment.error.noItems"),
      })
    }

    const quantityMap = itemsToFulfill.reduce(
      (acc, item) => {
        acc[item.id] = getFulfillableQuantity(item as OrderLineItemDTO)
        return acc
      },
      {} as Record<string, number>
    )

    form.setValue("quantity", quantityMap)
  }, [...fulfilledQuantityArray, requiresShipping])

  const differentOptionSelected =
    shippingOptionId &&
    order.shipping_methods?.[0]?.shipping_option_id !== shippingOptionId

  return (
    <RouteFocusModal.Form form={form}>
      <KeyboundForm
        onSubmit={handleSubmit}
        className="flex h-full flex-col overflow-hidden"
      >
        <RouteFocusModal.Header />

        <RouteFocusModal.Body className="flex h-full w-full flex-col items-center divide-y overflow-y-auto">
          <div className="flex size-full flex-col items-center overflow-auto p-16">
            <div className="flex w-full max-w-[736px] flex-col justify-center px-2 pb-2">
              
              {/* DEBUG INFO */}
              <div className="mb-4 p-4 bg-blue-50 rounded border">
                <h3 className="font-bold text-blue-800">🔍 DEBUG INFO</h3>
                <p><strong>Selected Location:</strong> {selectedLocationId}</p>
                <p><strong>Selected Shipping Option:</strong> {shippingOptionId}</p>
                <p><strong>Requires Shipping:</strong> {requiresShipping ? "Yes" : "No"}</p>
                <p><strong>Available Shipping Options:</strong> {filteredShippingOptions.length}</p>
                {filteredShippingOptions.map(opt => (
                  <div key={opt?.id} className="ml-4">
                    • {opt?.name} (Profile: {opt?.shipping_profile_id})
                  </div>
                ))}
                <p><strong>Item Shipping Profiles:</strong></p>
                {order.items.map(item => (
                  <div key={item.id} className="ml-4">
                    • {item.title}: {item.variant?.product?.shipping_profile?.id || "No profile"}
                  </div>
                ))}
              </div>

              <div className="flex flex-col divide-y divide-dashed">
                <div className="pb-8">
                  <Form.Field
                    control={form.control}
                    name="location_id"
                    render={({ field: { onChange, ref, ...field } }) => {
                      return (
                        <Form.Item>
                          <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
                            <div className="flex-1">
                              <Form.Label>{t("fields.location")}</Form.Label>
                              <Form.Hint>
                                {t("orders.fulfillment.locationDescription")}
                              </Form.Hint>
                            </div>
                            <div className="flex-1">
                              <Form.Control>
                                <Select onValueChange={onChange} {...field}>
                                  <Select.Trigger
                                    className="bg-ui-bg-base"
                                    ref={ref}
                                  >
                                    <Select.Value />
                                  </Select.Trigger>
                                  <Select.Content>
                                    {stock_locations.map((l) => (
                                      <Select.Item key={l.id} value={l.id}>
                                        {l.name}
                                      </Select.Item>
                                    ))}
                                  </Select.Content>
                                </Select>
                              </Form.Control>
                            </div>
                          </div>
                          <Form.ErrorMessage />
                        </Form.Item>
                      )
                    }}
                  />
                </div>

                {requiresShipping && (
                  <div className="py-8">
                    <Form.Field
                      control={form.control}
                      name="shipping_option_id"
                      render={({ field: { onChange, ref, ...field } }) => {
                        return (
                          <Form.Item>
                            <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
                              <div className="flex-1">
                                <Form.Label>
                                  {t("fields.shippingMethod")}
                                </Form.Label>
                                <Form.Hint>
                                  {t("orders.fulfillment.methodDescription")}
                                </Form.Hint>
                              </div>
                              <div className="flex-1">
                                <Form.Control>
                                  <Select
                                    onValueChange={onChange}
                                    {...field}
                                    disabled={!selectedLocationId}
                                  >
                                    <Select.Trigger
                                      className="bg-ui-bg-base"
                                      ref={ref}
                                    >
                                      {isShippingOptionsLoading ? (
                                        <span className="text-right">
                                          {t("labels.loading")}
                                          ...
                                        </span>
                                      ) : (
                                        <Select.Value placeholder={
                                          filteredShippingOptions.length === 0 && selectedLocationId
                                            ? "No hay opciones de envío disponibles"
                                            : undefined
                                        } />
                                      )}
                                    </Select.Trigger>
                                    <Select.Content>
                                      {filteredShippingOptions.map((o) => (
                                        <Select.Item key={o?.id} value={o?.id}>
                                          {o?.name} (Profile: {o?.shipping_profile_id})
                                        </Select.Item>
                                      ))}
                                    </Select.Content>
                                  </Select>
                                </Form.Control>
                              </div>
                            </div>
                            <Form.ErrorMessage />
                          </Form.Item>
                        )
                      }}
                    />

                    {differentOptionSelected && (
                      <Alert className="mt-4 p-4" variant="warning">
                        <span className="-mt-[3px] block font-medium">
                          {t("labels.beaware")}
                        </span>
                        <span className="text-ui-fg-muted">
                          {t("orders.fulfillment.differentOptionSelected")}
                        </span>
                      </Alert>
                    )}
                  </div>
                )}
                
                <div>
                  <Form.Item className="mt-8">
                    <Form.Label>
                      {t("orders.fulfillment.itemsToFulfill")}
                    </Form.Label>
                    <Form.Hint>
                      {t("orders.fulfillment.itemsToFulfillDesc")}
                    </Form.Hint>

                    <div className="flex flex-col gap-y-1">
                      {fulfillableItems.map((item) => {
                        const selectedShippingOption = filteredShippingOptions.find(
                          (o) => o?.id === shippingOptionId
                        )
                        
                        const isShippingProfileMatching = !requiresShipping || (
                          selectedShippingOption?.shipping_profile_id ===
                          item.variant?.product?.shipping_profile?.id
                        )

                        return (
                          <OrderCreateFulfillmentItem
                            key={item.id}
                            form={form}
                            item={item}
                            locationId={selectedLocationId}
                            currencyCode={order.currency_code}
                            onItemRemove={() => {}}
                            disabled={!isShippingProfileMatching}
                            itemReservedQuantitiesMap={
                              itemReservedQuantitiesMap
                            }
                          />
                        )
                      })}
                    </div>
                  </Form.Item>
                  {form.formState.errors.root && (
                    <Alert
                      variant="error"
                      dismissible={false}
                      className="flex items-center"
                    >
                      {form.formState.errors.root.message}
                    </Alert>
                  )}
                </div>

                <div className="mt-8 pt-8 ">
                  <Form.Field
                    control={form.control}
                    name="send_notification"
                    render={({ field: { onChange, value, ...field } }) => {
                      return (
                        <Form.Item>
                          <div className="flex items-center justify-between">
                            <Form.Label>
                              {t("orders.returns.sendNotification")}
                            </Form.Label>
                            <Form.Control>
                              <Form.Control>
                                <Switch
                                  checked={!!value}
                                  onCheckedChange={onChange}
                                  {...field}
                                />
                              </Form.Control>
                            </Form.Control>
                          </div>
                          <Form.Hint className="!mt-1">
                            {t("orders.fulfillment.sendNotificationHint")}
                          </Form.Hint>
                          <Form.ErrorMessage />
                        </Form.Item>
                      )
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </RouteFocusModal.Body>
        <RouteFocusModal.Footer>
          <div className="flex items-center justify-end gap-x-2">
            <RouteFocusModal.Close asChild>
              <Button size="small" variant="secondary">
                {t("actions.cancel")}
              </Button>
            </RouteFocusModal.Close>
            <Button
              size="small"
              type="submit"
              isLoading={isMutating}
              disabled={requiresShipping ? !shippingOptionId : !selectedLocationId}
            >
              {t("orders.fulfillment.create")}
            </Button>
          </div>
        </RouteFocusModal.Footer>
      </KeyboundForm>
    </RouteFocusModal.Form>
  )
}