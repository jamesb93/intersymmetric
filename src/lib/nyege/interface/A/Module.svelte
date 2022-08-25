<script>
	import Row from './Row.svelte';
	import RadioH from '$lib/nyege/RadioH.svelte';
	import { 
		range0, range1, range2, range3, 
		buf0, buf1, buf2, buf3,
		pitch0, pitch1, pitch2, pitch3,
		len0, len1, len2, len3,
		div0, div1, div2, div3,
		globalCycle

	} from '$lib/nyege/app';
	import { send_message } from '$lib/common/patch_helpers';

	export let patch;

	const radio = {
		options: [32, 24, 16, 12, 9, 8, 6, 4, 3, 2, 1],
		width: '54.54px',
		func: () => { console.log('foo') }
	}

	$: send_message(patch, 'global_cycle', [$globalCycle]);
	$: send_message(patch, 'polymetric_params', [0, $range0, $div0]);
	$: send_message(patch, 'polymetric_params', [1, $range1, $div1]);
	$: send_message(patch, 'polymetric_params', [2, $range2, $div2]);
	$: send_message(patch, 'polymetric_params', [3, $range3, $div3]);
	$: send_message(patch, 'sampler_params', [0, $buf0, $pitch0, $len0]);
	$: send_message(patch, 'sampler_params', [1, $buf1, $pitch1, $len1]);
	$: send_message(patch, 'sampler_params', [2, $buf2, $pitch2, $len2]);
	$: send_message(patch, 'sampler_params', [3, $buf3, $pitch3, $len3]);

</script>

<div class="container">
	<div class="radio-row">
		<RadioH {...radio} />
		<div class='knob-labels'>
			<div>sound</div>
			<div>pitch</div>
			<div>length</div>
		</div>
	</div>
	<Row bind:patch bind:div={$div0} bind:range={$range0} bind:buf={$buf0} bind:pitch={$pitch0} bind:len={$len0} />
	<Row bind:patch bind:div={$div1} bind:range={$range1} bind:buf={$buf1} bind:pitch={$pitch1} bind:len={$len1} />
	<Row bind:patch bind:div={$div2} bind:range={$range2} bind:buf={$buf2} bind:pitch={$pitch2} bind:len={$len2} />
	<Row bind:patch bind:div={$div3} bind:range={$range3} bind:buf={$buf3} bind:pitch={$pitch3} bind:len={$len3} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
	.radio-row {
		display: grid;
		grid-template-columns: 600px 210px;
		justify-content: center;
		margin-left: 100px;
		display: grid;
	}

	.knob-labels {
		display: grid;
		grid-template-columns: repeat(3, 50px);
		justify-content: space-around;
		width: 210px;
		color: var(--primary);
	}
</style>