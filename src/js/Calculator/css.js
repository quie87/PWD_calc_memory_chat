const template = document.createElement('template')
template.innerHTML = /* html */ `
<style>
:host 

div, h1, h2, h3, h4, h5, p, button, input {
	margin-bottom: 0.5em;
}
#container {
	width: 100%;
	height: 100%;
	text-align: center;
	display: flex;
	padding: 0.2em;
	background-color: #fff;
	margin: 0em;
}

table {
	flex: 1;
}

#inputField, #answer {
	text-align: right;
	border: none;
}

.input {
	border: 1px dotted #ccc;
	border-radius: 1em;
}

.buttons input {
	width: 24%;
	height: 3em;
	border-radius: 0.5em;
	font-size: 120%;
	background: #2b175d;
	color: #fff;
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
