<script>
	export let WIDTH = 80;
	export let HEIGHT = 60;
	$: style = `height: ${HEIGHT}; width: ${WIDTH};`;

	const offsetX = 25;
	const offsetY = 15;

	const triangle = `${offsetX},${offsetY} ${offsetX},${HEIGHT - offsetY}, ${WIDTH - 30},${
		HEIGHT / 2
	}`;

	export let playing;

	function clickHandler() {
		playing = !playing;
		if (!playing) {
			pause();
		} else {
			start();
		}
	}

	export let start;
	export let pause;
</script>

<div class="container" {style}>
	<div class="text">Play/Pause</div>
	<!-- <button on:click={onClick} class="button" class:pause={playing}></button> -->

	<svg width={WIDTH} height={HEIGHT} on:click={clickHandler}>
		{#if !playing}
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
		fill: var(--primary-color);
	}

	.tri:hover,
	.tri:active {
		fill: var(--primary-color-darker);
	}
</style>
