import htmlTemplate from './html.js'
import cssTemplate from './css.js'
import '../InstantMessage/Instant-message.js'
import '../MemoryGame/Memory.js'
import '../Calculator/Calculator.js'

const template = document.createElement('template')
template.innerHTML = `
`
/**
 * @Module - Handle container windows
 *
 * @class WinWrapper
 * @extends {window.HTMLElement}
 */
class WinWrapper extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._appWindow = this.shadowRoot.querySelectorAll('.appWindow')
    this._windowHeading = this.shadowRoot.querySelector('.window-heading')
    this._closeBtn = this.shadowRoot.querySelector('.closeBtn')
    this._mainArea = this.shadowRoot.querySelector('.main-area')

    this._wrapper = document.querySelector('#wrapper')

    this._mouseOffSet = { x: 0, y: 0 }
    this._isMouseDown = false
  }

  /**
   * @Method - ConnectedCallback
   *
   * @memberof WinWrapper
   */
  connectedCallback () {
    this.clickToDrag()
  }

  /**
   * @Method - Adds eventListerners to be able to drag AppWindows created
   *
   * @memberof WinWrapper
   */
  clickToDrag () {
    for (let i = 0; i < this._appWindow.length; i++) {
      let item = this._appWindow[i]

      this._windowHeading.addEventListener('mousedown', (e) => {
        this.onMouseDown(e, item)
      })

      window.addEventListener('mousemove', (e) => {
        this.onMouseMove(e, item)
      })

      window.addEventListener('mouseup', (e) => {
        this.onMouseUp(e, item)
      })
    }
  }

  /**
   * @Method - Handles the event while mousebutton is down
   *
   * @param {event} e
   * @param {item} item - The target app window
   * @memberof WinWrapper
   */
  onMouseDown (e, item) {
    this._isMouseDown = true

    this._mouseOffSet = { x: item.offsetLeft - e.clientX, y: item.offsetTop - e.clientY }
  }

  /**
   * @Method - Handles the event on mousemove
   *
   * @param {event} e
   * @param {item} item - The target app window
   * @memberof WinWrapper
   */
  onMouseMove (e, item) {
    e.preventDefault()
    if (this._isMouseDown) {
      item.style.left = e.clientX + this._mouseOffSet.x + 'px'
      item.style.top = e.clientY + this._mouseOffSet.y + 'px'
    }
  }

  /**
   * @Method - Handles the event on mouseup
   *
   * @param {event} e
   * @param {item} item - The target app window
   * @memberof WinWrapper
   */
  onMouseUp (e, item) {
    this._isMouseDown = false
  }
}

window.customElements.define('open-windows', WinWrapper)
