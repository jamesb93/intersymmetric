<script>
	import { onMount } from 'svelte';
	
	function iOS() {
		return [
		'iPad Simulator',
		'iPhone Simulator',
		'iPod Simulator',
		'iPad',
		'iPhone',
		'iPod'
		].includes(navigator.platform)
		// iPad on iOS 13 detection
		|| (navigator.userAgent.includes("Mac") && "ontouchend" in document)
	}

	let ios = false;
	let dismissed = false;
	$: warn = ios && !dismissed;
	
	onMount(async() => {
		ios = iOS();
	})
</script>


{#if warn}
<div class="container">
	unmute your device
	<button on:click={() => {dismissed=true}}>okay</button>
</div>
{/if}

<style>
	.container {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		top: 100px;
		border: 1px solid var(--primary);
		background: white;
		font-size: 1rem;
		padding: 20%;
		color: var(--primary);
		z-index: 999;
	}
</style>