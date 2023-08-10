export const balance_function = (balance: number) => {
  if (balance == 0) return 0
  return String(balance).split(".")[1]?.length === 1 ? balance + "0" : balance
}
