import { useEffect, useRef } from "react"
import { useSelector } from "+redux"
import Purchase from "./Purchase"
import type { PurchaseRedux } from "types"

const purchase_list = [
  "position",
  "buy_price",
  "payout",
  "profit",
  "profit_percentage",
  "sell_price",
  "status",
  "contract_type",
  "is_sold"
]

export default () => {
  const { ids, items } = useSelector((s) => s.purchases)
  const ref_purchases_element = useRef<HTMLDivElement>(null)
  const ref_first_time = useRef(true)

  useEffect(() => {
    const { current } = ref_purchases_element
    if (current === null) return

    const { scrollHeight, scrollTop } = current

    const scroll = () => {
      current.scroll({
        top: scrollHeight,
        behavior: "smooth"
      })
    }

    if (ref_first_time.current) {
      scroll()
      ref_first_time.current = false
    }

    if (scrollHeight - 330 < scrollTop) {
      scroll()
    }
  }, [items])

  return (
    <div className=" flex flex-col gap-2 ">
      <div className=" grid header-table grid-cols-8 gap-1 text-center">
        {purchase_list
          .filter((opcion) => opcion !== "is_sold")
          .map((opcion) => (
            <div
              key={opcion}
              className="overflow-hidden text-ellipsis w-full cursor-default"
            >
              {filter_label_text(opcion)}
            </div>
          ))}
      </div>
      <div
        ref={ref_purchases_element}
        className=" purchases flex flex-col gap-0.5 overflow-scroll h-[14vh] "
      >
        {ids.length > 0 &&
          ids.map((contract_id: number) => (
            <Purchase
              key={contract_id}
              {...{ purchase: item_filter(items[contract_id]) }}
            />
          ))}
      </div>
    </div>
  )
}

const item_filter = (purchase: PurchaseRedux) =>
  purchase_list.reduce((previousValue: Partial<PurchaseRedux>, nombre) => {
    if (purchase[nombre]) previousValue[nombre] = purchase[nombre]
    if (nombre === "sell_price") previousValue[nombre] = purchase[nombre] || 0
    return previousValue
  }, {})

const filter_label_text = (str: string) => str.replace(/_/g, " ")
