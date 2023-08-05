<script lang='ts'>
	export let width = 16;
	export let height = 128;
	export let level = 0.0;
</script>

<div style:width={`${width}px`} style:height={`${height}px`}>
	<svg height=100% width=100%>
		<rect x=0 y={height*(1-level)} width={width} height={height*level} />
	</svg>
</div>

<style>

	div {
		border: 1px solid var(--primary);
	}

	rect {
		fill: var(--primary);
	}
	
</style>

