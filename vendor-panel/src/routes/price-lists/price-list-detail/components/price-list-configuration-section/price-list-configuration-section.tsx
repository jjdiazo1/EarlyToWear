import { PencilSquare } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Container, Heading } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { ActionMenu } from "../../../../../components/common/action-menu"
import { DateRangeDisplay } from "../../../../../components/common/date-range-display"
import { ListSummary } from "../../../../../components/common/list-summary"
import { Skeleton } from "../../../../../components/common/skeleton"
import { useCustomerGroups } from "../../../../../hooks/api/customer-groups"

type PriceListConfigurationSectionProps = {
  priceList: HttpTypes.AdminPriceList
}

export const PriceListConfigurationSection = ({
  priceList,
}: PriceListConfigurationSectionProps) => {
  const { t } = useTranslation()

  return (
    <Container className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h2">{t("priceLists.configuration.header")}</Heading>
          <CustomerGroupDisplay priceList={priceList as any} />
        </div>
        <ActionMenu
          groups={[
            {
              actions: [
                {
                  label: t("actions.edit"),
                  to: "configuration",
                  icon: <PencilSquare />,
                },
              ],
            },
          ]}
        />
      </div>
      <DateRangeDisplay
        endsAt={priceList.ends_at}
        startsAt={priceList.starts_at}
        showTime
      />
    </Container>
  )
}

const CustomerGroupDisplay = ({
  priceList,
}: {
  priceList: HttpTypes.AdminPriceList & { price_list_rules: any[] }
}) => {
  const { t } = useTranslation()

  const customerGroupIds =
    priceList.price_list_rules.find(
      (rule) => rule.attribute === "customer.groups.id"
    ).value || ([] as string[])

  const { customer_groups, isPending, isError, error } = useCustomerGroups(
    undefined,
    {
      enabled: !!customerGroupIds?.length,
    }
  )

  if (isError) {
    throw error
  }

  if (!customerGroupIds?.length) {
    return null
  }

  if (isPending || !customer_groups) {
    return <Skeleton className="h-5 w-full max-w-48" />
  }

  const customerGroups = customer_groups
    .map(({ customer_group }) => customer_group)
    .filter((group) => customerGroupIds.includes(group.id))

  return (
    <div className="txt-small-plus text-ui-fg-muted flex items-center gap-x-1.5">
      <span className="text-ui-fg-subtle">
        {t("priceLists.fields.customerAvailability.attribute")}
      </span>
      <span>·</span>
      <ListSummary
        list={customerGroups.map((group) => group.name!)}
        n={1}
        className="txt-small-plus text-ui-fg-muted"
      />
    </div>
  )
}
