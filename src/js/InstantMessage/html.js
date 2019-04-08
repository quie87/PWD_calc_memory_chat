const template = document.createElement('template')
template.innerHTML = /* html */ `
<open-windows>
	<img src="../../image/chat-icon.png" class="icon">
	<div id="chatContainer">
			<div id="user" class="box-1">
				<div class="box-1-1">
					<h3>Pick a user name</h3>
					<input id="userName" placeholder="Pick a username">
					<button class="submitBtn" class="button">Submit</button>
					<p>Singed in as Guest</p>
				</div>
			</div>
			<div id="chat" class="box-2">
			<h3>Chat</h3>
				<div id="message">
					<template>
							<div class="send">
								<p class="author"></p>
								<p class="text"></p>
							</div>
					</template>
					<template>
						<div class="recive">
							<p class="author"></p>
							<p class="text"></p>
						</div>
					</template>
				</div>
				<div class="messageArea">
					<textarea class="typer" placeholder="Skriv text här..."></textarea>
					<button class="sendBtn" class="button">Skicka</button>
				</div>
			</div>
	</div>
</open-windows>
`
export default template
