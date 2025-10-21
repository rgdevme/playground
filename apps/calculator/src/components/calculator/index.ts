import { Component, computed, HostListener, signal } from '@angular/core';

type Key = { values: string[], label: string, name: string }
type Operator = { values: string[], operator: string, label: string, name: string }

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Calculator {
  operation = signal('')

  operators: Operator[] = [
    { values: ['+', 'a'], operator: '+', label: '+', name: 'add' },
    { values: ['-', 's'], operator: '-', label: '-', name: 'sub' },
    { values: ['*', 'x', 'm', '×'], operator: '*', label: '×', name: 'mult' },
    { values: ['/', 'd', '÷'], operator: '/', label: '÷', name: 'div' }
  ]

  numbers: Key[] = [
    { values: ['1'], label: '1', name: 'one' },
    { values: ['2'], label: '2', name: 'two' },
    { values: ['3'], label: '3', name: 'three' },
    { values: ['4'], label: '4', name: 'four' },
    { values: ['5'], label: '5', name: 'five' },
    { values: ['6'], label: '6', name: 'six' },
    { values: ['7'], label: '7', name: 'seven' },
    { values: ['8'], label: '8', name: 'eight' },
    { values: ['9'], label: '9', name: 'nine' },
    { values: ['0'], label: '0', name: 'zero' }
  ]
  decimal: Key = { values: ['.', ','], label: '.', name: 'dec' }

  special: Key[] = [
    { values: ['backspace'], label: 'C', name: 'clear' },
    { values: ['esc'], label: 'CE', name: 'del' }
  ]

  keys = [...this.numbers, this.decimal, ...this.special, ...this.operators]
  allowedKeys = this.keys.flatMap(k => k.values)

  display = computed(() => {
    const op = this.operation()
    let newString = op
    const replaceableOperators = this.operators.filter(x => x.operator !== x.label)

    for (const operator of replaceableOperators) {
      newString = newString.replace(new RegExp(`\\${operator.operator}`, 'g'), operator.label)
    }

    return newString
  })

  result = computed(() => {
    const op = this.operation()
    if (!op.length) return 0
    const lastChar = op.at(-1) ?? ''
    const lastIsNumber = !isNaN(parseInt(lastChar))
    let newVal = 0
    if (lastIsNumber) newVal = (0, eval)(op)
    else newVal = (0, eval)(op.substring(0, op.length - 1))

    let valStr = newVal.toString()

    if (valStr.length > 10) valStr = valStr.substring(0, 14)

    return valStr
  })


  @HostListener('window:keydown', ['$event.key'])
  pressKey = (key: string) => {
    const lowercased = key.toLowerCase()

    console.log(lowercased);


    if (lowercased === 'escape') {
      this.reset()
    } else if (lowercased === 'backspace') {
      this.eraseLastChar()
    } else if (this.decimal.values.includes(lowercased)) {
      this.addDecimal()
    } else if (this.allowedKeys.includes(lowercased)) {
      this.addNumber(lowercased)
      this.addOperator(lowercased)
    }
  }

  reset = () => {
    this.operation.set('')
  }

  eraseLastChar = () => {
    const op = this.operation()
    const canErase = op.length > 0
    if (!canErase) return
    const newVal = op.substring(0, op.length - 1)
    this.operation.set(newVal)
  }

  addNumber = (value: string) => {
    const isNumber = !isNaN(parseInt(value))
    const op = this.operation()
    const isLeadingZero = op[0] === '0'
    if (!isNumber) return
    this.operation.set(isLeadingZero ? value : op + value)
  }

  addOperator = (value: string) => {
    const op = this.operation()
    const hasNumber = !isNaN(parseInt(op.at(-1) ?? ''))
    const operator = this.operators.find(op => op.values.includes(value))
    if (hasNumber && operator) this.operation.set(op + operator.operator)
  }

  addDecimal = () => {
    const op = this.operation()
    let opString = op
    for (const operator of this.operators) {
      opString = opString.replace(new RegExp(`\\${operator.operator}`, 'g'), '|')
    }
    const lastFloat = opString.split('|').at(-1)
    if (!lastFloat || lastFloat.includes('.')) return
    this.operation.set(op + '.')
  }

}
