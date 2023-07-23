<script lang='ts'>
	import type RNBO from '@rnbo/js'
	import { grid } from '$lib/seq-2/app'
	import { sendDeviceMessage } from '$lib/common/rnbo/helpers';

	export let device: RNBO.Device;

	function handle_click(i: number, j: number) {
		$grid[i][j] = !$grid[i][j];
		const flat = $grid.flat();
		sendDeviceMessage(device, 'grid', flat);
	}
</script>

<div class="container">
	{#each $grid as row, i}
	<div class="row">
		{#each row as cell, j}
		<div class='col' class:enabled={cell}  on:click={() => handle_click(i, j)}/>
		{/each}
	</div>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}
	.col {
		width: 50px;
		min-width: 50px;
		max-width: 50px;
		height: 50px;
		border: 1px solid var(--primary)
	}
	.enabled {
		background-color: var(--primary)
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 0.25em;
	}


</style>