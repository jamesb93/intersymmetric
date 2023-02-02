<script>
	import { grid } from '$lib/seq-2/app';

	export let step = 0;
	export let x = 0;
	export let y = 0;

	function updateCell() {
		$grid[x][y] = !$grid[x][y];
		$grid = $grid;
	}
</script>

<button 
	class="cell" 
	class:active={ step === y }
	class:off={ !$grid[x][y] }
	class:on={  $grid[x][y] }
	on:mousedown={ updateCell }
>	
	{ $grid[x][y] }
</button>

<style>
	.cell {
		border: none;
		outline: none;
		width: 30px;
		height: 30px;
		font-size: 8px;
		background-color: rgba(128, 128, 128, 0.081);
		border: 1px solid rgb(29, 29, 29);
	}

	.on {
		background-color: rgba(218, 112, 214, 0.227);
		border: 1px solid orchid
	}

	.active {
		background-color: rgba(0, 128, 0, 0.278);
		border: 1px solid green;
	}



	/*
	.off {
		background-color: rgba(128, 128, 128, 0.081);
		border: 1px solid rgb(29, 29, 29);
	} */
</style>