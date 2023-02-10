export default class calculator {
  constructor(primaryOperandDisplay, secondryOperandDisplay, operatioDisplay) {
    this.primaryOperandDisplay = primaryOperandDisplay
    this.secondryOperandDisplay = secondryOperandDisplay
    this.operatioDisplay = operatioDisplay

    this.clear()
  }

  get primaryOperand() {
    const operand = this.primaryOperandDisplay.dataset.value ?? ''
    return parseFloat(operand)
  }
  get secondryOperand() {
    const operand = this.secondryOperandDisplay.dataset.value ?? ''
    return parseFloat(operand)
  }

  set primaryOperand(value) {
    this.primaryOperandDisplay.dataset.value = value ?? ''
    this.primaryOperandDisplay.textContent = displayNumber(value)
  }

  set secondaryOperand(value) {
    this.secondryOperandDisplay.dataset.value = value ?? ''
    this.secondryOperandDisplay.textContent = displayNumber(value)
  }
  get operation() {
    return this.operatioDisplay.textContent
  }

  set operation(value) {
    this.operatioDisplay.textContent = value ?? ''
  }

  addDigit(digit) {
    if (digit === '.' && this.primaryOperandDisplay.dataset.value.includes('.'))
      return
    if (this.primaryOperand === 0) {
      this.primaryOperand = digit
      return
    } else {
      this.primaryOperand = this.primaryOperandDisplay.dataset.value + digit
    }
  }

  removeDigit() {
    const numberString = this.primaryOperandDisplay.dataset.value
    if (numberString.length <= 1) {
      this.primaryOperand = 0
      return
    }
    this.primaryOperand = numberString.slice(0, numberString.length - 1)
  }

  chooseOperation(operation) {
    if (this.operation !== '') return
    this.operation = operation

    this.secondaryOperand = this.primaryOperand
    this.primaryOperand = 0
  }

  clear() {
    this.primaryOperandDisplay.textContent = 0
    this.primaryOperandDisplay.dataset.value = '0'
    this.secondryOperandDisplay.textContent = null
    this.operatioDisplay.textContent = null
  }
}

evalute(){
  let result
  switch(this.operation){
    case '*':
      result  = this.secondaryOperand * this.primaryOperand
      break
    case '÷':
      result  = this.secondaryOperand / this.primaryOperand
      break
    case '+':
      result  = this.secondaryOperand + this.primaryOperand
      break
    case '-':
      result  = this.secondaryOperand - this.primaryOperand
      break
default:
  return
  }
  this.clear()
  this.primaryOperand = result
}

const NUMBER_FORMATTER = new Intl.NumberFormat('en', {
  maximunFractionDigits: 20,
})

function displayNumber(number) {
  const stringNumber = number?.toString() || ''
  if (stringNumber === '') return ''
  const [integer, decimal] = stringNumber.split('.')
  if (decimal == null) return NUMBER_FORMATTER.format(integer)
  return NUMBER_FORMATTER.format(integer) + '.' + decimal
}
