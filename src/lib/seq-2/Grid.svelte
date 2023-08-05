<script lang='ts'>
	import type RNBO from '@rnbo/js'
	import { grid, grid_step } from '$lib/seq-2/app'
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
		<div class='cell' 
		class:step-active={$grid_step === j}  
		class:enabled={cell}
		on:click={() => handle_click(i, j)}
		on:keydown={() => handle_click(i, j)}
		/>
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
	.row {
		display: flex;
		flex-direction: row;
		gap: 0.25em;
	}

	@media only screen and (max-width: 768px) {
		.container { flex-direction: row }
		.row { flex-direction: column }
	}

	.step-active {
		background-color: rgba(76, 40, 129, 0.232) !important;
   	}
	.cell {
		width: 25px;
		height: 25px;
		min-width: 25px;
		max-width: 25px;
		border: 1px solid var(--primary);
	}

	.enabled {
		background-color: var(--primary)
	}




</style>