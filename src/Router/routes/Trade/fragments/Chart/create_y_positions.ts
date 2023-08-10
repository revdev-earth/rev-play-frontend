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

  const removeMissingTicksFromCompras = () => {
    const { compras } = state.grafica

    if (compras.length <= 0) return

    const newCompras = compras.filter((compra) => {
      const isTickPresent = yValues.includes(compra.tick)
      if (!isTickPresent) return
      return isTickPresent
    })

    state.grafica.compras = newCompras
  }

  removeMissingTicksFromCompras()

  return yValues.map((tick, index) => {
    let radius = circleRadius
    let newColor = color

    state.grafica.compras.some((compra) => {
      if (compra.tick === tick) {
        const { type } = compra

        switch (type) {
          case "start":
            newColor = "orange"
            break

          case "inprocess":
            newColor = "skyblue"
            break

          case "open":
            newColor = "orange"
            break

          case "won":
            newColor = "green"
            break

          case "lost":
            newColor = "purple"
            break

          default:
            newColor = color
            break
        }

        if (newColor !== color) radius = circleRadius + 1

        return true
      }

      return false
    })

    const diferencia_entre_el_tick_y_el_minimo = tick - min
    const rangoDeValores = max - min
    const valorNormalizado =
      diferencia_entre_el_tick_y_el_minimo / rangoDeValores

    const heightDeseado = height - margen * 2

    const newY = valorNormalizado * heightDeseado + margen

    const x = index * circleSpacing + margen

    return {
      x,
      y: newY,
      color: newColor,
      radius: radius
    }
  })
}
