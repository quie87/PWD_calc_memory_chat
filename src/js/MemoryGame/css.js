const template = document.createElement('template')
template.innerHTML = /* html */ `
<style>
:host

#memoryContainer {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #ccc;
}

#gameBoard {
  flex-direction: row;
  background-color: #ccc;
}

.flexBox {
  flex: 1;
  align-items: center;
}

#memory {
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 0.2em;
}

#timer {
  flex: 1;
  align-items: center;
}

#finnishedGame {
  padding: 0.2em;
}

.gameType {
  width: 35%;
  margin-bottom: 0.4em;
}

.select-game-type {
margin-bottom: 20px;
}

.hidden {
display: none;
}

.removed {
visibility: hidden;
}

.visible {
display: block;
visibility: visible;
}

img {
  width: 100px;
}

button {
    display: block;
    margin: 0 auto;
    margin-bottom: 0.2em;
    border-radius: 15px;
    background: #2b175d;
    color: #fff;
    cursor: pointer;
    height: 2em;
    width: 5em;
    font-size: 1.4em;
  }

  h1 {
    margin: 0px;
  }

  .icon {
    height: 30px;
    width: 30px;
    position: absolute;
    top: 5px;
    left: 5px;
  }
</style>
`
export default template
