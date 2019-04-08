const template = document.createElement('template')
template.innerHTML = /* html */ `
<style>
:host

.appWindow {
	min-width: 20em;
	min-height: 10em;
	display: flex;
	flex-direction: column;
	min-width: 20em;
	position: absolute;
	border: 3px solid #333;
	border-radius: 5px;
	resize: both;
	overflow: hidden;
}

.window-heading {
	flex: 1;
	max-height: 40px;
	background-color: #2b175d;
	opacity: 0.6;
}

.closeBtn {
	float: right;
	display: block;
	margin: 0.2em;
	border-radius: 0.8em;
	background: #2b175d;
	color: #fff;
	cursor: pointer;
	height: 1.8em;
	width: 3.8em;
	font-size: 1em;
}
</style>
`
export default template
