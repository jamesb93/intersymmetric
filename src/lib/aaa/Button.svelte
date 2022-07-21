<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const click = () => {
		dispatch('click');
	};

	export let font_size = '10px';
	export let width = '40px';
	export let height = '20px';
</script>

<button style:font-size={font_size} style:height style:width on:click={click}>
	<slot />
</button>

<style>
	button {
		border-radius: 30px;
		background-color: #ffffff;
		border: 1px solid var(--primary);
		font-family: var(--font);
		color: black;
		text-align: center;
	}

	button:hover {
		background-color: var(--grey);
		color: black;
	}
</style>
