<script>
	export let patch;

	$: console.log('A', patch)

	patch.messageEvent.subscribe(e => {
		console.log(e)
	});

	setInterval(() => {
		console.log(patch)
	}, 1000);
</script>