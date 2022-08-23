<script>
	export let options = ['>', '<', '<>', '?'];
	export let value = 0;
	export let func = () => {};
	export let width = '50px'
	export let height = '50px'

	const set = (i) => {
		value = i;
		func();
	};
</script>

<div class="container">
	{#each options as o, i}
	<button style:width={width} style:height={height} class="no_hover" on:click={() => set(i)} class:selected={value === i}>
		{o}
	</button>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		gap: 0;
		justify-content: space-around;
		width: 600px;
		gap: 1px;
	}
	button {
		border-radius: 1rem;
		background-color: #ffffff;
		border: 1px solid var(--primary);
		height: 20px;
		font-family: var(--font);
		color: black;
		font-size: 10px;
		text-align: center;
	}

	button:hover:not(.selected) {
		background-color: var(--grey);
		color: black;
	}

	.selected {
		background-color: var(--primary);
		color: white;
	}
</style>
