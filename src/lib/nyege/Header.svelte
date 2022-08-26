<script>
	import RoomPrompt from '$lib/nyege/RoomPrompt.svelte';
	import { num_users } from '$lib/nyege/app';
</script>

<header>
	<div id="title">
		<div class="no-hover">Intersymmetric Works</div>
		<div class="no-hover">Nyege Nyege</div>
	</div>
	<div id="room">
		<RoomPrompt />
	</div>
	<div id="participants">
		<div class="no-hover">Players:</div>
		<div class="no-hover">{$num_users}</div>
	</div>
</header>

<div class="line" />

<style>
	:root {
		--h: 40px;
	}
	header {
		display: grid;
		grid-template-columns: auto auto auto;
		justify-content: space-between;
		max-width: 1005px;
		margin: 0 auto;
		font-size: 10px;
		min-height: var(--h);
		max-height: var(--h);
		padding-top: 10px;
		color: var(--primary);
	}

	@media only screen and (max-width: 1005px) {
		header {
			justify-content: space-around;
		}
	}

	#title {
		text-align: left;
		word-wrap: none;
		display: flex;
		flex-direction: column;
	}

	#participants {
		display: flex;
		flex-direction: column;
		text-align: left;
	}

	.line {
		border-bottom: 1px solid var(--primary);
		position: absolute;
		left: 0;
		right: 0px;
		bottom: 10;
		top: 50px;
	}
</style>
