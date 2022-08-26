<script>
	export let WIDTH = 80;
	export let HEIGHT = 60;
	export let state = false;

	function clickHandler() {
		state = !state;
	}

	const offsetX = 25;
	const offsetY = 15;
	const triangle = `${offsetX},${offsetY} ${offsetX},${HEIGHT - offsetY}, ${WIDTH - 30},${
		HEIGHT / 2
	}`;
</script>

<div class="container" style:height={HEIGHT} style:width={WIDTH}>
	<div class="text no-hover">play/pause</div>

	<svg width={WIDTH} height={HEIGHT} on:click={clickHandler}>
		{#if state === false}
			<polygon class="tri" points={triangle} />
		{:else}
			<g class="tri">
				<rect x={offsetX} y={offsetY} width="6px" height="60px" />
				<rect x={WIDTH - 40} y={offsetY} width="6px" height="60px" />
			</g>
		{/if}
	</svg>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 60px;
		width: 80px;
	}

	.text {
		text-align: center;
		font-size: 10px;
		font-family: var(--font);
	}

	.tri {
		fill: var(--primary);
	}

	.tri:hover,
	.tri:active {
		fill: var(--primary);
	}
</style>
