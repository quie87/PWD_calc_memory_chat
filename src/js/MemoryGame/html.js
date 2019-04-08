const template = document.createElement('template')
template.innerHTML = /* html */ `
<!--custom element tag for drag window -->
<open-windows>
	<img src="../../image/memory-icon.png" class="icon">
	<!--Container for the memory application -->
	<div id="memoryContainer"> 
	<!--Container for the start page -->
		<div id="start" class="visible">
			<h1>Memory Game</h1>
			<p>Pick how many game tiles you like to play with</p>
			<select class="gameType">
				<option value="0">2 x 2</option>
				<option value="1">4 x 2</option>
				<option value="2">4 x 4</option>
			</select>
			<button class="startBtn">Start</button>
		</div>
		<!--Start page end -->
		<!--container for game board -->
		<div id="gameBoard" class="hidden">
			<div class="flex-box">
				<div id="memory" class="hidden">
						<template>
							<a href="#"><img src="image/0.png" alt="A memory brick"></a>
						</template>
				</div>
				<div id="timer">
					<p></p>
				</div>
			</div>
		</div>
		<!--Finished game -->
		<div id="finishedGame" class="hidden">
		</div>    
	</div>
</open-window>
`
export default template
