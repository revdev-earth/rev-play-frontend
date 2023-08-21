import { state } from "+local"

interface Props {
  width: number
  height: number
  yValues: number[]
  color: string
  circleRadius: number
}

export default ({ height, width, yValues, color, circleRadius }: Props) => {
  const max = Math.max(...yValues)
  const min = Math.min(...yValues)

  const numCircles = yValues.length

  const margen = 25

  const circleSpacing = (width - margen * 2) / (numCircles - 1)

  const remove_missing_ticks_from_contracts = () => {
    const { compras: contracts } = state.grafica

    if (contracts.length <= 0) return

    const new_contracts = contracts.filter((contract) =>
      yValues.includes(contract.tick)
    )

    state.grafica.compras = new_contracts
  }

  remove_missing_ticks_from_contracts()

  return yValues.map((tick, index) => {
    let radius = circleRadius
    let newColor = color

    state.grafica.compras.some((contract) => {
      if (contract.tick === tick) {
        const { type } = contract
        newColor = color_selector(type, color)
        if (newColor !== color) radius = circleRadius + 1
        return true
      }
      return false
    })

    const difference_between_max_and_tick = max - tick
    const value_range = max - min
    const normalized_value = difference_between_max_and_tick / value_range
    const desired_high = height - margen * 2
    const newY = normalized_value * desired_high + margen
    const x = index * circleSpacing + margen

    return {
      x,
      y: newY,
      color: newColor,
      radius: radius
    }
  })
}

const color_selector = (type: string, color: string) => {
  let newColor = color
  switch (type) {
    case "start":
      newColor = "orange"
      break

    case "inprocess":
      newColor = "purple"
      break

    case "open":
      newColor = "purple"
      break

    case "won":
      newColor = "green"
      break

    case "lost":
      newColor = "red"
      break

    default:
      newColor = color
      break
  }
  return newColor
}
