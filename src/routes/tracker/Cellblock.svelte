<script>
	import { clip } from '$lib/utility.js'
	let kickptn = new Array(8).fill(0);
	let kickcells = new Array(8);
	let ptr = -1;
	let committed = false;

	function handleKeyDown(e) {
		if (ptr !== -1 && !committed) 
		{
			if (e.key === 'ArrowDown') 
				ptr++;
			else if (e.key === 'ArrowUp')
				ptr--;

			ptr = clip(ptr, 0, kickcells.length-1);
			kickcells[ptr].focus();
		}
		if (ptr !== -1 && committed) {
			if (e.key === 'ArrowDown') 
				kickptn[ptr]--;
			else if (e.key === 'ArrowUp')
				kickptn[ptr]++;
			kickptn[ptr] = clip(kickptn[ptr], 0, 127);
		}

		if (committed && e.key === 'Escape') 
		{
			console.log('escape')
		}
		if (!committed && e.key === 'Enter' && ptr !== -1) 
		{
			committed = true
		}
	}

	function handleCellKeyDown(e) {
		if (ptr !== -1) {
			const key = e.key;
			if (/^\d$/.test(key)) {

			}
		}
	}

	function cellBlur(i) {
		ptr = i
		committed = false;
	}
</script>

<svelte:window on:keydown={handleKeyDown}/>
<div class='container'>
	{#each kickptn as val, i}
	<div 
		class='cell' 
		tabindex=0 
		bind:this={kickcells[i]}
		on:focus={() => ptr = i} 
		on:blur={() => cellBlur(i)}
		on:keydown={handleCellKeyDown}
		class:commit={committed && ptr===i}
	>
		{ val }
	</div>
	{/each}

</div>

<style>
	.cell {
		display: grid;
		place-items: center;
		width: 50px;
		height: 25px;
		border: 1px solid black;
	}

	.cell:focus, .cell:active {
		border: 1px solid orange;
		outline: 1px solid orange;
	}

	.commit {
		background: rgb(171, 171, 171);
	}
</style>