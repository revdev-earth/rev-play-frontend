import { state } from "+local"
import { store } from "+redux"
import { buy_with_proposal } from "sockets/buyer/sends"
import { SMA } from "technicalindicators"

// Listen for messages
export const message = (messageEvent: MessageEvent<string>) => {
  //

  const data = JSON.parse(messageEvent.data)

  if (data.error) console.log("socket observer ticks message : ", data)

  const { msg_type } = data

  switch (msg_type) {
    case "forget_all":
      break

    case "history":
      set_history(data)
      break

    case "tick":
      update_ticks(data)
      break

    default:
      console.log(":: socket observer ticks message default : ", data)
      break
  }
}

const set_history = (data: {
  echo_req: any
  msg_type: "history"
  pip_size: number // 2,
  subscription: {
    id: string // "adab59d9-a81b-6b1f-9f32-a6967d6e13b8"
  }
  history: {
    prices: number[]
    times: number[]
  }
}) => {
  // console.log(JSON.stringify(data.history.prices, null, 2))
  state.lists.ticks = data.history.prices
}

interface UpdateTicks {
  echo_req: any
  msg_type: "tick"
  subscription: {
    id: string // "adab59d9-a81b-6b1f-9f32-a6967d6e13b8"
  }
  tick: {
    ask: number // 598659.53
    bid: number // 598579.53
    epoch: number // 1692522645
    id: string // "e7739a1d-a698-fa4b-7cdf-d5ac0f2c0490"
    pip_size: number // 2
    quote: number // 598619.53
    symbol: string // "1HZ50V"
  }
}

const update_ticks = (data: UpdateTicks) => {
  state.lists.ticks.shift()
  state.lists.ticks = [...state.lists.ticks, data.tick.quote]

  // set CALL or PUT or wait
  makeDecision()

  const { internal, config } = state

  if (state.habilitado_a_comprar) {
    if (internal.contract_type.length > 0) {
      if (config.buy_with_proposal && state.buyer.is_proposal_ready) {
        buy_with_proposal()
      }
    }
  }
}

// First analyze

interface SMA_ {
  period: number
  price: number[]
  generator: {}
  result: number[]
}

const firstAnalyze = () => {
  const sma = new SMA({
    period: store.getState().editables.sma,
    values: state.lists.ticks
  }) as SMA_

  const sma1 = sma.result[0]
  const sma2 = sma.result[1]

  if (sma1 > sma2) {
    state.internal.contract_type = "CALL"
  } else if (sma1 < sma2) {
    state.internal.contract_type = "PUT"
  } else {
    state.internal.contract_type = ""
  }
}

// Second analyze

const secondAnalyze = (data: number[]) => {
  // Calcula la diferencia promedio entre valores
  const averageDifference = calculateAverageDifference(data)

  // Calcula la tendencia general (1 para ascendente, -1 para descendente)
  const trend = calculateTrend(data)

  if (averageDifference > 0 && trend === 1) {
    state.internal.contract_type = "CALL"
  } else if (averageDifference < 0 && trend === -1) {
    state.internal.contract_type = "PUT"
  } else {
    state.internal.contract_type = ""
  }
}

// Función para calcular la diferencia promedio entre valores
function calculateAverageDifference(data: number[]) {
  let sumDifference = 0
  for (let i = 1; i < data.length; i++) {
    sumDifference += data[i] - data[i - 1]
  }
  return sumDifference / (data.length - 1)
}

// Función para calcular la tendencia general de los valores
function calculateTrend(data: number[]) {
  const trend = data[data.length - 1] - data[0]
  return trend > 0 ? 1 : trend < 0 ? -1 : 0
}

// Third analyze

function makeDecision() {
  const { increasingTrend, decreasingTrend } = determineTrend(
    state.lists.ticks,
    0.55
  )

  if (increasingTrend) {
    // Hacia arriba
    state.internal.contract_type = "CALL"
    return
  }

  if (decreasingTrend) {
    // Hacia abajo
    state.internal.contract_type = "PUT"
    return
  }

  state.internal.contract_type = ""
  // console.log("Esperar")
}

function analyzeData(data: number[]) {
  const results: any = {}

  const { increasingTrend, decreasingTrend } = determineTrend(data, 0.55)

  results.trend = increasingTrend
    ? "Hacia arriba"
    : decreasingTrend
    ? "Hacia abajo"
    : "Sin tendencia clara"

  const threshold = calculateThreshold(data)
  results.thresholdDecision =
    data[0] > threshold ? "Hacia abajo" : "Hacia arriba"

  results.standardDeviation = calculateStandardDeviation(data)

  results.trendAnalysis = analyzeTrend(data)

  results.outliers = detectOutliers(data)

  results.analyzeDifferences = analyzeDifferences(data)
  results.calculateVolatility = calculateVolatility(data)
  results.calculateVolatilityScore = calculateVolatilityScore(data)

  return results
}

function determineTrend(data: number[], threshold: number) {
  const increasingCount = countIncreasingTrend(data)
  const decreasingCount = countDecreasingTrend(data)

  // console.log({
  //   increasingTrend: increasingCount / data.length,
  //   decreasingTrend: decreasingCount / data.length
  // })

  const increasingTrend = increasingCount / data.length >= threshold
  const decreasingTrend = decreasingCount / data.length >= threshold

  return { increasingTrend, decreasingTrend }
}

function countIncreasingTrend(data: number[]) {
  return data.reduce(
    (count, value, index, arr) =>
      index === 0 || value > arr[index - 1] ? count + 1 : count,
    0
  )
}

function countDecreasingTrend(data: number[]) {
  return data.reduce(
    (count, value, index, arr) =>
      index === 0 || value < arr[index - 1] ? count + 1 : count,
    0
  )
}

function calculateThreshold(data: number[]) {
  const sum = data.reduce((total, value) => total + value, 0)
  return sum / data.length
}

function calculateStandardDeviation(data: number[]) {
  const mean = data.reduce((sum, value) => sum + value, 0) / data.length
  const squaredDifferences = data.map((value) => Math.pow(value - mean, 2))
  const variance =
    squaredDifferences.reduce((sum, value) => sum + value, 0) / data.length
  const standardDeviation = Math.sqrt(variance)
  return standardDeviation
}

function analyzeTrend(data: number[]) {
  for (let i = 1; i < data.length; i++) {
    if (data[i] > data[i - 1]) {
      return "Hacia arriba"
    } else if (data[i] < data[i - 1]) {
      return "Hacia abajo"
    }
  }
  return "Sin tendencia clara"
}

function detectOutliers(data: number[]) {
  const standardDeviation = calculateStandardDeviation(data)
  const mean = data.reduce((sum, value) => sum + value, 0) / data.length
  const lowerThreshold = mean - 2 * standardDeviation
  const upperThreshold = mean + 2 * standardDeviation

  const outliers = data.filter(
    (value) => value < lowerThreshold || value > upperThreshold
  )
  return outliers
}

function analyzeDifferences(data: number[]) {
  let differences = []

  for (let i = 1; i < data.length; i++) {
    differences.push(Math.abs(data[i] - data[i - 1]))
  }

  const averageDifference =
    differences.reduce((sum, diff) => sum + diff, 0) / differences.length
  const maxDifference = Math.max(...differences)
  const minDifference = Math.min(...differences)

  return {
    averageDifference,
    maxDifference,
    minDifference,
    lastDifference: differences[differences.length - 1]
  }
}

function calculateVolatility(data: number[]) {
  let differences = []

  for (let i = 1; i < data.length; i++) {
    differences.push(Math.abs(data[i] - data[i - 1]))
  }

  const averageDifference =
    differences.reduce((sum, diff) => sum + diff, 0) / differences.length

  // Calcular la desviación estándar
  const squaredDifferences = differences.map((diff) =>
    Math.pow(diff - averageDifference, 2)
  )
  const variance =
    squaredDifferences.reduce((sum, squaredDiff) => sum + squaredDiff, 0) /
    squaredDifferences.length
  const standardDeviation = Math.sqrt(variance)

  return {
    averageDifference,
    standardDeviation
  }
}

function calculateVolatilityScore(data: number[]) {
  let differences = []

  for (let i = 1; i < data.length; i++) {
    differences.push(Math.abs(data[i] - data[i - 1]))
  }

  const averageDifference =
    differences.reduce((sum, diff) => sum + diff, 0) / differences.length

  // Calcular la desviación estándar
  const squaredDifferences = differences.map((diff) =>
    Math.pow(diff - averageDifference, 2)
  )
  const variance =
    squaredDifferences.reduce((sum, squaredDiff) => sum + squaredDiff, 0) /
    squaredDifferences.length
  const standardDeviation = Math.sqrt(variance)

  // Normalizar la volatilidad en una escala del 1 al 10
  const maxPossibleDeviation = Math.max(...differences)
  const minPossibleDeviation = Math.min(...differences)
  const normalizedDeviation =
    ((standardDeviation - minPossibleDeviation) /
      (maxPossibleDeviation - minPossibleDeviation)) *
      9 +
    1

  return {
    averageDifference,
    standardDeviation,
    normalizedDeviation
  }
}

function calculateConsecutiveDirectionPercentage(data: number[]) {
  let consecutiveUpCount = 0
  let consecutiveDownCount = 0

  for (let i = 1; i < data.length; i++) {
    if (data[i] > data[i - 1]) {
      consecutiveUpCount++
    } else if (data[i] < data[i - 1]) {
      consecutiveDownCount++
    }
  }

  const totalConsecutive = consecutiveUpCount + consecutiveDownCount
  const percentageUp = (consecutiveUpCount / totalConsecutive) * 100
  const percentageDown = (consecutiveDownCount / totalConsecutive) * 100

  return {
    percentageUp: percentageUp.toFixed(2),
    percentageDown: percentageDown.toFixed(2)
  }
}

function consecutiveMoreThreshold(data: number[], threshold = 3) {
  let consecutiveCount = 1

  for (let i = 1; i < data.length; i++) {
    if (data[i] > data[i - 1] === data[i - 1] > data[i - 2]) {
      consecutiveCount++
    } else {
      consecutiveCount = 1
    }

    if (consecutiveCount > threshold) return true
  }

  return false
}
