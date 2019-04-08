import htmlTemplate from './html.js'
import cssTemplate from './css.js'

const template = document.createElement('template')
template.innerHTML = `
`

/**
 * @module - A Calculator application
 *
 * @class Calculator
 * @extends {window.HTMLElement}
 */
class Calculator extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._container = this.shadowRoot.querySelector('#container')
    this._input = this.shadowRoot.querySelector('#inputField')
    this._answer = this.shadowRoot.querySelector('#answer')

    this._firstNumber = ''
    this._secondNumber = ''
    this._sum = ''
    this._operator = ''
  }

  connectedCallback () {
    this._container.addEventListener('click', (e) => {
      this.controler(e)
    })
  }

  /**
   * @method - Controler, sees if the button clicked is a number or operator
   *
   * @param {event} e - Event click
   * @memberof Calculator
   */
  controler (e) {
    let number = parseInt(e.target.value)

    if (e.target.value) {
      if (Number.isInteger(number)) {
        this.storeNumbers(number)
      } else {
        this.operators(e)
      }
    }
  }

  /**
   * @Method - Saves numbers inputed by user
   *
   * @param {number} number
   * @memberof Calculator
   */
  storeNumbers (number) {
    if (!this._operator) {
      this._firstNumber += number
    } else {
      this._secondNumber += number
    }
    this.uppdateInputField()
  }

  /**
   * @Method - Dicides what to do with click events on different operators
   *
   * @param {even} e
   * @memberof Calculator
   */
  operators (e) {
    if (this._firstNumber) {
      switch (e.target.value) {
        case '=':
          this.getSum()
          this.uppdateTotal()
          break
        case 'C':
          this.clear()
          this.uppdateTotal()
          break
        case '√':
          this.sqrtRoot()
          this.uppdateTotal()
          break
        default:
          this._operator = e.target.value
          this.uppdateInputField()
          break
      }
    }
  }

  /**
   * @Method - Uppdates the input fields to the user
   *
   * @memberof Calculator
   */
  uppdateInputField () {
    if (this._sum) {
      this._input.value = `${this._sum} ${this._operator} ${this._secondNumber}`
      this._answer.value = `= ${this._sum}`
    } else if (!this._sum && this._secondNumber) {
      this._input.value = `${this._firstNumber} ${this._operator} ${this._secondNumber}`
    } else {
      this._input.value = `${this._firstNumber} ${this._operator}`
    }
  }

  /**
   * @Method - Uppdate total summary
   *
   * @memberof Calculator
   */
  uppdateTotal () {
    this._input.value = this._sum
    this._answer.value = `= ${this._sum}`
    this._secondNumber = ''
  }

  /**
   * @Method - Reset the calculators values
   *
   * @memberof Calculator
   */
  clear () {
    this._input.value = 0
    this._answer.value = ''
    this._firstNumber = ''
    this._secondNumber = ''
    this._sum = ''
    this._operator = ''
  }

  /**
   * @Method - Calculate the sum of equation input
   *
   * @memberof Calculator
   */
  getSum () {
    if (this._secondNumber) {
      switch (this._operator) {
        case '+':
          this.addition()
          this.uppdateTotal()
          break
        case '-':
          this.subtraction()
          this.uppdateTotal()
          break
        case '/':
          this.division()
          this.uppdateTotal()
          break
        case 'x':
          this.multiplication()
          this.uppdateTotal()
          break
        case '%':
          this.percent()
          this.uppdateTotal()
          break
      }
    }
  }

  /**
   * @Method - Calculate addition
   *
   * @memberof Calculator
   */
  addition () {
    let a = parseInt(this._firstNumber)
    let b = parseInt(this._secondNumber)

    if (this._sum === '') {
      this._sum = a + b
    } else {
      if (typeof this._sum !== 'number') {
        this._sum = parseFloat(this._sum)
      }
      this._sum = this._sum + b
    }
  }

  /**
   * @Method - calculate subtraction
   *
   * @memberof Calculator
   */
  subtraction () {
    let a = parseInt(this._firstNumber)
    let b = parseInt(this._secondNumber)

    if (this._sum === '') {
      this._sum = a - b
    } else {
      this._sum = this._sum - b
    }
  }

  /**
   * @Method - calculate division
   *
   * @memberof Calculator
   */
  division () {
    let a = parseInt(this._firstNumber)
    let b = parseInt(this._secondNumber)

    if (this._sum === '') {
      this._sum = a / b
    } else {
      this._sum = this._sum / b
    }
  }

  /**
   * @Method - calculate multiplication
   *
   * @memberof Calculator
   */
  multiplication () {
    let a = parseInt(this._firstNumber)
    let b = parseInt(this._secondNumber)

    if (this._sum === '') {
      this._sum = a * b
    } else {
      this._sum = this._sum * b
    }
  }

  /**
   * @Method - calculate percentage
   *
   * @memberof Calculator
   */
  percent () {
    let a = parseInt(this._firstNumber)
    let b = parseInt(this._secondNumber)

    if (this._sum === '') {
      this._sum = (a / b * 100).toFixed(4)
    } else {
      this._sum = (this._sum / b * 100).toFixed(4)
    }
  }

  /**
   * @Method - calculate square root of
   *
   * @memberof Calculator
   */
  sqrtRoot () {
    let a = parseInt(this._firstNumber)

    if (this._sum === '') {
      this._sum = Math.sqrt(a).toFixed(4)
    } else {
      this._sum = Math.sqrt(this._sum).toFixed(4)
    }
  }

  /**
   * @Method - Check if param is a number
   *
   * @memberof Calculator
   * @param {str or number} this._firstNumber
   * @param {str or number} this._secondNumber
   * @param {str or number} this._sum
   */
  checkForInterger () {
    if (this._firstNumber !== 'number') {
      this._firstNumber = parseFloat(this._firstNumber)
    }
    if (this._secondNumber !== 'number') {
      this._secondNumber = parseFloat(this._secondNumber)
    }
    if (this._sum !== 'number') {
      this._sum = parseFloat(this._sum)
    }
    this.uppdateTotal()
  }
}

window.customElements.define('mini-calculator', Calculator)
