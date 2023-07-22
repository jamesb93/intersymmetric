<script>
	export let rows = 4;
	export let columns = 16;
</script>

<div class="container">
	{#each new Array(rows) as i}
	<div class="row">
		{#each new Array(columns) as i}
		<div class='col'></div>
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
		border: 0.25px solid var(--primary)
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 0.25em;
	}
</style>