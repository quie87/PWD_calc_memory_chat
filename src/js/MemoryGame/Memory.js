import htmlTemplate from './html.js'
import cssTemplate from './css.js'

const template = document.createElement('template')
template.innerHTML = `
`

/**
 * @module - A memory game
 *
 * @class Memory
 * @extends {window.HTMLElement}
 */
class Memory extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._startPage = this.shadowRoot.querySelector('#start')
    this._template = this.shadowRoot.querySelector('template').content.firstElementChild
    this._startBtn = this.shadowRoot.querySelector('.startBtn')

    this._gameBoard = this.shadowRoot.querySelector('#gameBoard')
    this._finishedGame = this.shadowRoot.querySelector('#finishedGame')
    this._congratz_p = this.shadowRoot.querySelector('#finishedGame p')
    this._containerDiv = this.shadowRoot.querySelector('#memory')

    this._timer = this.shadowRoot.querySelector('#timer')
    this._timer_p = this.shadowRoot.querySelector('#timer p')

    this._h1 = this.shadowRoot.querySelector('h1')
    this._h3 = this.shadowRoot.querySelector('h3')
    this._playerAnswer = ''

    this._rows = 4
    this._cols = 4
    this._deck = []

    this._turn1 = null
    this._turn2 = null
    this._lastTurn = ''
    this._pairs = 0
    this._tries = 0
    this._aTag = ''

    this._counter = 0
    this._totalTime = 0
    this._interVal = ''
  }

  connectedCallback () {
    this._startBtn.addEventListener('click', () => {
      this.startGame()
    })

    this._containerDiv.addEventListener('click', (e) => {
      e.preventDefault()
      this.brickClicked(e)
    })
  }

  disconnectedCallback () {
    this.stopTimer()
  }

  /**
   * @Method - Reset all values
   *
   * @memberof Memory
   */
  clearStart () {
    while (this._containerDiv.hasChildNodes()) {
      this._containerDiv.removeChild(this._containerDiv.lastChild)
    }
    while (this._finishedGame.hasChildNodes()) {
      this._finishedGame.removeChild(this._finishedGame.lastChild)
    }
    if (this._finishedGame.classList.contains('visible')) {
      this._finishedGame.classList.remove('visible')
      this._finishedGame.classList.add('hidden')
    }
    if (this._startPage.classList.contains('visible')) {
      this._startPage.classList.remove('visible')
      this._startPage.classList.add('hidden')
    }
    if (this._gameBoard.classList.contains('hidden')) {
      this._gameBoard.classList.remove('hidden')
      this._gameBoard.classList.add('visible')
    }
    if (this._containerDiv.classList.contains('hidden')) {
      this._containerDiv.classList.remove('hidden')
      this._containerDiv.classList.add('visible')
    }
    this._deck = []

    this._turn1 = null
    this._turn2 = null
    this._lastTurn = ''
    this._pairs = 0
    this._tries = 0
    this._aTag = ''
    this._counter = 0
    this._totalTime = 0
  }

  /**
   * @Method - Creates the gameboard
   *
   * @memberof Memory
   */
  startGame () {
    this.clearStart()

    let gameType = this.shadowRoot.querySelector('.gameType')
    let selected = gameType.options[gameType.selectedIndex].value

    if (selected === '0') {
      this._rows = 2
      this._cols = 2
    } else if (selected === '1') {
      this._rows = 2
      this._cols = 4
    } else {
      this._rows = 4
      this._cols = 4
    }

    this.makeDeck()
  }

  /**
   * @Method - Creates a deck of cards, add it to the DOM and starts the timer
   *
   * @memberof Memory
   */
  makeDeck () {
    this.getPictureArray(this._rows, this._cols)

    this._deck.forEach((tile, index) => {
      this._aTag = document.importNode(this._template, true)
      this._aTag.firstElementChild.setAttribute('data-bricknumber', index)
      this._containerDiv.appendChild(this._aTag)

      if ((index + 1) % this._cols === 0) {
        this._containerDiv.appendChild(document.createElement('br'))
      }
    })
    this.timer()
  }

  /**
   * @Method - Check which brick got clicked
   *
   * @param {event} event
   * @memberof Memory
   */
  brickClicked (event) {
    let img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild

    let index = parseInt(img.getAttribute('data-bricknumber'))
    this.turnBrick(this._deck[index], index, img)
  }
  /**
   * @Method - Game logic for flipping cards
   *
   * @param {Number} tile
   * @param {Number} index - data-bricknumber
   * @param {img} img
   * @memberof Memory
   */
  turnBrick (tile, index, img) {
    if (this._turn2) {
      return
    }
    img.src = 'image/' + tile + '.png'

    if (!this._turn1) {
      this._turn1 = img
      this._lastTile = tile
    } else {
      if (img === this._turn1) {
        return
      }

      this._tries += 1
      this._turn2 = img

      if (tile === this._lastTile) {
        this._pairs += 1
        if (this._pairs === this._deck.length / 2) {
          this.stopTimer()
          this.gameOver()
        }

        window.setTimeout(() => {
          this._turn1.parentNode.classList.add('removed')
          this._turn2.parentNode.classList.add('removed')

          this._turn1 = null
          this._turn2 = null
        }, 400)
      } else {
        window.setTimeout(() => {
          this._turn1.src = 'image/0.png'
          this._turn2.src = 'image/0.png'

          this._turn1 = null
          this._turn2 = null
        }, 500)
      }
    }
  }

  /**
   * @Method - Populate the deck of cards
   *
   * @param {rows} rows
   * @param {cols} cols
   * @memberof Memory
   */
  getPictureArray (rows, cols) {
    for (let i = 1; i <= (rows * cols) / 2; i += 1) {
      this._deck.push(i)
      this._deck.push(i)
    }
    this.shuffle()
  }

  /**
   * @Method - Shuffles the deck of cards
   *
   * @memberof Memory
   */
  shuffle () {
    let currentIndex = this._deck.length
    let tempValue
    let randIndex

    while (currentIndex !== 0) {
      randIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      tempValue = this._deck[currentIndex]
      this._deck[currentIndex] = this._deck[randIndex]
      this._deck[randIndex] = tempValue
    }
  }

  /**
   * @Method - A timer starting at 0
   *
   * @memberof Memory
   */
  timer () {
    this._interVal = setInterval(() => {
      this._counter += 0.1
      this._totalTime = this._counter.toFixed(2)

      this._timer_p.innerText = this._totalTime + ` Seconds`
      this._timer.appendChild(this._timer_p)
    }, 100)
  }

  /**
   * @Method - Stops timer
   *
   * @memberof Memory
   */
  stopTimer () {
    clearInterval(this._interVal)
  }

  /**
   * @Method - Display finished game to the player
   *
   * @memberof Memory
   */
  gameOver () {
    if (this._gameBoard.classList.contains('visible')) {
      this._gameBoard.classList.remove('visible')
      this._gameBoard.classList.add('hidden')
    }
    if (this._containerDiv.classList.contains('visible')) {
      this._containerDiv.classList.remove('visible')
      this._containerDiv.classList.add('hidden')
    }

    let winner = document.createElement('h2')
    winner.innerText = 'Congratulations, you made it!'

    let p = document.createElement('p')
    let p2 = document.createElement('p')
    p.innerText = `You won on ${this._tries} number of tries!`
    p2.innerText = `Your total time was ${this._totalTime} seconds!`

    this._finishedGame.appendChild(winner)
    this._finishedGame.appendChild(p)
    this._finishedGame.appendChild(p2)
    this._finishedGame.classList.toggle('visible')
    this._startPage.classList.toggle('visible')
  }
}

window.customElements.define('memory-game', Memory)
