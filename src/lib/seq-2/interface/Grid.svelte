<script>
	import { grid } from '$lib/seq-2/app';
	import { sendDeviceMessage } from '@jamesb93/rnbo-svelte';
	import Cell from './Cell.svelte';

	export let device;

	$: sendDeviceMessage(device, 'grid', $grid.flat());


	let step = 0;
	const listeners = {
		"step" : (v) => { step = v }
	};
	device.messageEvent.subscribe(e => {
		if (e.tag in listeners) {
			listeners[e.tag](e.payload);
		}
	})
</script>

{ step }

<div class="grid">
	{#each $grid as row, rowIndex}
	<div class="row">
		{#each row as _, cellIndex}
			<Cell 
				x={rowIndex} 
				y={cellIndex}
				bind:step
			/>
		{/each}
	</div>
	{/each}
</div>

<style>
	.grid {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.5em;
	}
	.row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 0.5em;
	}

	.cell {
		width: 50px;
		height: 50px;
		border: 1px solid grey;
	}
</style>