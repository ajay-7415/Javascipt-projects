import Rgb from './Rgb.js'

const COLOR_MAP = {
  rgb: Rgb,
}

const colorGrid = document.querySelector('[data-color-grid]')

colorGrid.innerHTML = ''

const DIFFICULTY_MAP = {
  easy: { withinTolerance: 1, outsideTolrence: 0.2 },
  medium: { withinTolerance: 0.5, outsideTolrence: 0.2 },
  hard: { withinTolerance: 0.2, outsideTolrence: 0.2 },
}

function render() {
  const format = document.querySelector('[name="format"]:checked').value
  const difficulty = document.querySelector('[name="difficulty"]:checked').value
  const colors = generateColors({ format, difficulty })
  console.log(colors)
  colors.forEach((color) => {
    const element = document.createElement('button')
    element.style.backgroundColor = color.toCss()
    colorGrid.append(element)
  })
}

function generateColors({ format, difficulty }) {
  const colorClass = COLOR_MAP[format]
  const difficultyRules = DIFFICULTY_MAP[difficulty]
  const correctColor = colorClass.generate()
  const colors = [correctColor]
  for (let i = 0; i < 5; i++) {
    colors.push(colorClass.generateSimilar(difficultyRules))
  }
  return colors
}

document.addEventListener('change', (e) => {
  if (e.target.matches('input[type="radio"]')) render()
})

const rgb = Rgb.generate()
