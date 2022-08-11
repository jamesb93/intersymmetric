<script>
	import RNBO from '@rnbo/js';
	import Interface from './Interface.svelte';
	import Button from './Button.svelte';
	import { load_samples } from '$lib/common/patch_helpers';

	let ctx, d, patcher, context;
	let samples_loaded = false;

	const start = async () => {
		ctx = window.AudioContext || window.webkitAudioContext;
		context = new ctx();
		let outputNode = context.createGain();
		outputNode.connect(context.destination);

		await fetch('/nyege/code/patch.export.json')
			.then((response) => response.json())

			.then((response) => {
				patcher = response;
				return RNBO.createDevice({ context, patcher });
			})

			.then((device) => {
				d = device;
				d.node.connect(outputNode);
				load_samples(d, context, 33, 'b', '/nyege/samples/');
				d.messageEvent.subscribe((e) => {
					if (e.tag.includes('debug')) {
						console.log(e.tag, e.payload);
					}
				});
			})
			.then(() => {
				samples_loaded = true;
			})
			.catch((err) => {
				console.error(err);
			});
	};
</script>

{#if d && samples_loaded}
	<Interface bind:patch={d} />
{:else}
	<div class="loading">
		<Button on:click={start} height={'60px'} width={'150px'} font_size={'24px'}>load</Button>
	</div>
{/if}

<style>
	.loading {
		margin: 10em;
	}
</style>
