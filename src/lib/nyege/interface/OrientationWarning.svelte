<script>
	import { onMount } from 'svelte';
	import Button from '$lib/nyege/Button.svelte';

	let portrait = false;
	let ignore = false;

	function resizeHandler() {
		portrait = window.matchMedia("(orientation: portrait)").matches
	}

	onMount(async() => {
		resizeHandler()
	})
</script>

<svelte:window on:resize={resizeHandler}/>

{#if portrait && !ignore}
<div class="container">

	<div class='text'>Rotate your device to landscape</div>
	<Button on:click={() => ignore=true}>okay</Button>
</div>
{/if}

<style>
	.container {
		opacity: 1.0 !important;
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		top: 100px;
		border: 1px solid var(--primary);
		background: white;
		font-size: 1rem;
		width: 80%;
		padding: 5%;
		color: var(--primary);
		z-index: 998;
	}
	.text {
		width: 100%;
	}
</style>