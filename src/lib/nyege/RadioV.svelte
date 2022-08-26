<script>
	export let options = ['off', 'a', 'b', 'c'];
	export let value = 0;
	export let func = () => {};

	const set = (i) => {
		value = i;
		func();
	};
</script>

<div class="container">
	{#each options as o, i}
		<button
			class="no-hover"
			on:mousedown={() => set(i)}
			on:touchstart={() => set(i)}
			class:selected={value === i}
		>
			{o}
		</button>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.05em;
	}
	button {
		border-radius: 1em;
		background-color: #ffffff;
		border: 1px solid var(--primary);
		height: 17px;
		width: 55px;
		font-family: var(--font);
		color: var(--primary);
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
