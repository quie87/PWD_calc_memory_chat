const template = document.createElement('template')
template.innerHTML = /* html */ `
<open-windows>
	<img src="../../image/calculator.png" class="icon">
	<div id="container">
		<table>
			<tr>
				<tr>
					<td class="heading">
						Simple calculator
					</td>
				</tr>

				<td class="input">
				<input id="answer" readonly>
				<br>
				<input id="inputField" placeholder="0" readonly>
				</td>
		<!-- Buttons section-->
				<tr>
					<td class="buttons">
						<input type="button" value="C">
						<input type="button" value="√">
						<input type="button" value="%">
						<input type="button" value="/">
						<br>
						<input type="button" value="7">
						<input type="button" value="8">
						<input type="button" value="9">
						<input type="button" value="x">
						<br>
						<input type="button" value="4">
						<input type="button" value="5">
						<input type="button" value="6">
						<input type="button" value="-">
						<br>
						<input type="button" value="1">
						<input type="button" value="2">
						<input type="button" value="3">
						<input type="button" value="+">
						<br>
						<input type="button" value="0">
						<input type="button" value="=">
					</td>
				</tr>
			</tr>
		</table>
	</div>
</open-windows>
`
export default template
