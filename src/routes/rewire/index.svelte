
<script>
	import { browser } from '$app/env';
	import { fade } from "svelte/transition";
	import { room } from '$lib/components/stores.js';
	import Grid from '$lib/rewire/Grid.svelte';
    import Header from '$lib/components/Header.svelte';
</script>

<Header />

<main>
	{#if $room !== "" && browser}
		<div class="main-layout" transition:fade="{{duration: 300}}">
			<Grid />
		</div>
	{/if}
</main>

	
<style>
	.main-layout {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 25px;
	}
</style>