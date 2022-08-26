<script>
	import { socket, room } from '$lib/aaa/app.js';
	import { goto } from '$app/navigation';
	let ever_used = false;
	let code = '';

	function change_handler() {
		console.log('ever used');
		ever_used = true;
		socket.emit('join_room', `aaa.${code}`);
		$room = code;
		code = '';
		goto(`/aaa/${$room}`);
	}
</script>

<div class="prompt">
	<span id="title" class="no-hover">Room Code:</span>
	<input
		type="text"
		class:init={!ever_used}
		bind:value={code}
		on:change={change_handler}
		placeholder={ever_used === false && $room === '' ? 'enter room code' : $room}
		id="room-input"
	/>
</div>

<style>
	#title {
		text-align: left;
	}
	.prompt {
		display: flex;
		flex-direction: column;
	}

	.init {
		border: 1px solid rgb(204, 204, 204);
	}

	#room-input {
		font-family: var(--font);
		font-size: var(--font-size);
		padding: none;
		background: white;
		border: none;
		width: 100px;
		padding-top: 1px;
	}

	#room-input:focus,
	#room-input:active {
		outline: none !important;
		border: 1px solid rgb(204, 204, 204);
	}
</style>
