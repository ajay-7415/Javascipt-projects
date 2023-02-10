const MAX_RGB_VALUE = 255
export default class Rgb {
  constructor(r, g, b) {
    this.r = r
    this.g = g
    this.b = b
  }

  static generate() {
    return new Rgb(
      randomNumber({ max: MAX_RGB_VALUE }),
      randomNumber({ max: MAX_RGB_VALUE }),
      randomNumber({ max: MAX_RGB_VALUE })
    )
  }

  generateSimilar(options) {
    const ranges = validRanges({
      startingValue: this.r,
      maxCuttOff: MAX_RGB_VALUE,
      ...options,
    })

    const range = ranges[randomNumber({ max: ranges.length - 1 })]
    return new Rgb(
      randomValueInRange({
        startingValue: this.r,
        maxCuttOff: MAX_RGB_VALUE,
        ...options,
      }),
      randomValueInRange({
        startingValue: this.b,
        maxCuttOff: MAX_RGB_VALUE,
        ...options,
      }),
      randomValueInRange({
        startingValue: this.g,
        maxCuttOff: MAX_RGB_VALUE,
        ...options,
      })
    )
  }
  toCss() {
    return `rgb(${color.r},${color.g},${color.b})`
  }
}

function randomNumber({ min = 0, max }) {
  return Math.floor(Math.random() * (max - min + 1)) - min
}

function randomValueInRange(options) {
  const ranges = validRanges(options)

  const range = ranges[randomNumber({ max: ranges.length - 1 })]
  return randomNumber(range)
}

function validRanges({
  startingValue,
  maxCuttOff,
  withinTolerance,
  outsideTolrence,
}) {
  const withinTolrenceIncrementor = Math.floor(withinTolerance * maxCuttOff)
  const outsideTolrenceIncrementor = Math.floor(outsideTolrence * maxCuttOff)

  const aboveRangeMin = startingValue + outsideTolrenceIncrementor
  const aboveRangeMax = Math.min(
    startingValue + withinTolrenceIncrementor,
    maxCuttOff
  )

  const belowRangeMin = Math.max(startingValue - withinTolrenceIncrementor, 0)
  const belowRangeMax = startingValue - outsideTolrenceIncrementor

  const ranges = []
  if (aboveRangeMax > aboveRangeMin) {
    ranges.push({ min: aboveRangeMax, max: aboveRangeMax })
  }

  if (belowRangeMax > belowRangeMin) {
    ranges.push({ min: belowRangeMin, max: belowRangeMax })
  }

  return ranges
}
