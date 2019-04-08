/**
 * @module
 * @Arthur Kristoffer Åberg
 *
 * @export
 * @class DesktopControler
 */
export default class DesktopControler {
  constructor () {
    this._chat = document.querySelector('#chatApp')
    this._memory = document.querySelector('#memoryApp')
    this._calculator = document.querySelector('#calcApp')
    this._wrapper = document.querySelector('#wrapper')

    this._appArray = []
    this.Z_INDEX = 100

    this._chat.addEventListener('click', (e) => {
      this.createChat()
    })

    this._memory.addEventListener('click', (e) => {
      this.createMemoryGame()
    })

    this._calculator.addEventListener('click', (e) => {
      this.createCalculator()
    })

    this._wrapper.addEventListener('click', (e) => {
      if (e.target.parentNode === this._wrapper) {
        this.uppdateArray(e)
        this.uppdateZindex()
      }
    }, true)
  }

  /**
   * @method that create a chat and adds it to the DOM
   *
   * @memberof DesktopControler
   */
  createChat () {
    let chat = document.createElement('instant-message')
    this._wrapper.appendChild(chat)
    this._appArray.push(chat)
    this.uppdateZindex()
    this.btnEvent()
  }

  /**
   *@method that create a MemoryGame and adds it to the DOM
   *
   * @memberof DesktopControler
   */
  createMemoryGame () {
    let memoryGame = document.createElement('memory-game')
    this._wrapper.appendChild(memoryGame)
    this._appArray.push(memoryGame)
    this.uppdateZindex()
    this.btnEvent()
  }

  /**
   *@method that create a Calculator and adds it to the DOM
   *
   * @memberof DesktopControler
   */
  createCalculator () {
    let calculator = document.createElement('mini-calculator')
    this._wrapper.appendChild(calculator)
    this._appArray.push(calculator)
    this.uppdateZindex()
    this.btnEvent()
  }

  /**
   * @method That sort the array of Applications that is open
   * @param {event} e - The event that was triggered
   * @memberof DesktopControler
   */
  uppdateArray (e) {
    let index = this._appArray.indexOf(e.target)
    this._appArray.splice(index, 1)
    this._appArray.push(e.target)
  }

  /**
   * @method that sets zIndex to applications
   *
   * @memberof DesktopControler
   */
  uppdateZindex () {
    if (Array.isArray(this._appArray) && this._appArray.length) {
      for (let i = 0; i < this._appArray.length; i += 1) {
        this._appArray[i].shadowRoot.querySelector('open-windows')
          .shadowRoot.querySelector('.appWindow').style.zIndex = 100 + i
      }
    }
  }

  /**
   * @Method - Adds eventListener to closebtn
   *
   * @memberof DesktopControler
   */
  btnEvent () {
    let closeBtn = this._appArray[this._appArray.length - 1].shadowRoot.querySelector('open-windows').shadowRoot.querySelector('.closeBtn')
    closeBtn.addEventListener('click', (e) => {
      this.closeWindow(e)
    })
  }

  /**
   * @Method - Close the application by removing it from the DOM and appArray
   *
   * @param {e} - Triggerd event
   * @memberof DesktopControler
   */
  closeWindow (e) {
    let appWindow = e.target.parentNode.parentNode.parentNode.parentNode.host.parentNode.host
    appWindow.parentNode.removeChild(appWindow)
    this._appArray.pop()
  }
}
