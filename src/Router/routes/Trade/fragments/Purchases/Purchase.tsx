import { PurchaseRedux } from "types"

export default ({
  purchase: {
    position,
    buy_price,
    payout,
    profit,
    profit_percentage,
    sell_price,
    status,
    contract_type,
    is_sold
  }
}: {
  purchase: Partial<PurchaseRedux>
}) => (
  <div
    className={`
      grid grid-cols-8 gap-1 cursor-default
      ${is_sold && "sold"}
      ${status} `}
  >
    {position && <div>{position}</div>}
    {buy_price && <div>{buy_price}</div>}
    {payout && <div>{payout}</div>}
    {profit && <div>{profit}</div>}
    <div>
      {(profit_percentage &&
        profit_percentage > 0 &&
        profit_percentage + "%") ||
        " "}
    </div>
    {typeof sell_price !== "undefined" && (
      <div>{sell_price === 0 ? "  " : sell_price}</div>
    )}
    {status && <div>{status}</div>}
    {contract_type && <div>{contract_type}</div>}
  </div>
)
