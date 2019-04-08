const template = document.createElement('template')
template.innerHTML = /* html */ `
<div class="appWindow">
  <div class="window-heading">
    <div><button class="closeBtn">Close</button></div>
  </div>
  <slot class="main-area"></slot>
</div>
`
export default template
