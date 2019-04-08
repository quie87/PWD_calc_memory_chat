import htmlTemplate from './html.js'
import cssTemplate from './css.js'

const template = document.createElement('template')
template.innerHTML = `
`

/**
 * Module - Chat application
 *
 * @class Chat
 * @extends {window.HTMLElement}
 */
class Chat extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._chatContainer = this.shadowRoot.querySelector('#chatContainer')
    this._chatDiv = this.shadowRoot.querySelector('#chat')
    this._message = this.shadowRoot.querySelector('#message')
    this._submitBtn = this.shadowRoot.querySelector('.submitBtn')
    this._sendBtn = this.shadowRoot.querySelector('.sendBtn')
    this._text = this.shadowRoot.querySelector('.typer')
    this._p = this.shadowRoot.querySelector('#user p')

    this._userNameInput = this.shadowRoot.querySelector('#userName')
    this._userName = 'Guest'
    this._localUserName = []
    this._objToSave = []

    this._socket = null
    this._week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurseday', 'Friday', 'Saturday']
  }

  connectedCallback () {
    this._chatDiv.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        this.sendMessages(this._text.value)
        event.preventDefault()
      }
    })

    this._sendBtn.addEventListener('click', () => {
      this.sendMessages(this._text.value)
    })

    this._submitBtn.addEventListener('click', () => {
      this.addUser()
    })

    this.getLocalStorage()
    this.user()
    this.connect()
  }

  /**
   * @Method - Adds username to DOM and Localstorage
   *
   * @memberof Chat
   */
  addUser () {
    this._userName = this._userNameInput.value
    this._userNameInput.value = ''
    this._p.innerText = `Singed in as ${this._userName}`
    this.addToLocalStorage()
  }

  /**
   * @Method - Adds saved username from localstorage to the DOM, if there is one.
   *
   * @memberof Chat
   */
  user () {
    if (this._localUserName) {
      this._userName = this._localUserName[0].name
      this._p.innerText = `Singed in as ${this._userName}`
    }
  }

  /**
   * @Method - Create a webb socket and add eventlisteners to it.
   *
   * @returns Promise
   * @memberof Chat
   */
  async connect () {
    if (this._socket && this._socket.readyState === 1) {
      return this._socket
    }

    this._socket = await new window.WebSocket('ws://some url')

    this._socket.addEventListener('error', () => {
      console.log('Unable to connect')
    })

    this._socket.addEventListener('message', (event) => {
      let message = JSON.parse(event.data)
      if (message.type === 'message') {
        if (message.username === this._userName) {
          this.printMessages(message)
        } else {
          this.reciveMessages(message)
        }
      }
    })
  }

  /**
   * @Method - Sends messages
   *
   * @param {str} text - The text to be send from user
   * @memberof Chat
   */
  sendMessages (text) {
    this._text.value = ''

    let data = {
      type: 'message',
      data: text,
      username: this._userName,
      key: 'a key'
    }

    this.connect().then(() => {
      this._socket.send(JSON.stringify(data))
    }).catch(() => console.log('Failed to connect to the server'))
  }

  /**
   * @Method - Adds send message to DOM
   *
   * @param {object} message Message to send
   * @memberof Chat
   */
  printMessages (message) {
    let date = new Date()
    let template = this.shadowRoot.querySelectorAll('template')[0].content.firstElementChild.cloneNode(true)
    template.querySelectorAll('.author')[0].textContent = message.username +
    ` ${this._week[date.getDay()]}: ${date.getHours()}: ${date.getMinutes()}`
    template.querySelectorAll('.text')[0].textContent = message.data

    this._message.appendChild(template)
  }

  /**
   * @Method - Adds recived messages to DOM
   *
   * @param {object} message - Message recived
   * @memberof Chat
   */
  reciveMessages (message) {
    let date = new Date()
    let template = this.shadowRoot.querySelectorAll('template')[1].content.firstElementChild.cloneNode(true)
    template.querySelectorAll('.author')[0].textContent = message.username +
    ` ${this._week[date.getDay()]}: ${date.getHours()}: ${date.getMinutes()}`
    template.querySelectorAll('.text')[0].textContent = message.data

    this._message.appendChild(template)
  }

  /**
   * @Method- Adds username to localstorage
   *
   * @memberof Chat
   */
  addToLocalStorage () {
    let nameToSave = {
      name: this._userName
    }
    this._objToSave = []

    this._objToSave.push(nameToSave)
    window.localStorage.setItem('userName', JSON.stringify(this._objToSave))
  }

  /**
   * @Method - Fetch saved username from localstorage.
   *
   * @memberof Chat
   */
  getLocalStorage () {
    let userName = window.localStorage.getItem('userName')
    this._localUserName = JSON.parse(userName)
  }
}

window.customElements.define('instant-message', Chat)
