const template = document.createElement('template')
template.innerHTML = /* html */ `
<style>
:host 

div, h1, h2, h3, h4, h5, p, button, input {
	margin-bottom: 0.5em;
}
#chatContainer {
	display: flex;
	min-width: 30em;
	height: 100%;
	border: 0.1em solid #ccc;
	padding: 0.2em;
	background-color: #fff;
	margin: 0em;
}

#chat {
	overflow: auto;
}

.flex-box {
	display: flex;
	flex-direction: column;
} 

.box-1 {
	flex: 1;
	min-height: 25em;
	border-right: 0.1em solid #ccc;
}

.box-2 {
	flex: 2;
	margin-left: 0.2em;
	margin-right: 0.2em;
}

h1, h2, h3, h4, h5, h6 {
	margin: 0px;
	padding: 0.5em;
}

p {
	margin: 0.2em;
}

.message {
}

.author {
	font-size: 0.9em;
	padding: 0.2em;
}

.text {
	border-radius: 0.5em;
	font-size: 1.2em;
	padding: 0.2em;
}

.send .author {
	text-align: left;
	float: left;
	clear: both;
}

.send .text {
	background-color: #81649d;
	width: 60%;
	overflow: hidden;
	float: left;
	clear: both;
	word-wrap: break-word;
}

.recive .author {
	text-align: right;
	float: right;
	clear: both;
}
.recive .text {
	background-color: #ccc ;
	width: 60%;
	overflow: hidden;
	float: right;
	clear: both;
	word-wrap: break-word;
}

.typer {
	border: 0.1em solid #ccc;
	height: 4em;
	width: 95%;
}

button {
	display: block;
	margin: 0 auto;
	border-radius: 0.8em;
	background: #2b175d;
	color: #fff;
	cursor: pointer;
	height: 1.8em;
	width: 3.8em;
	font-size: 1em;
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
