<script>
	import Stepper from '$lib/nyege/Stepper.svelte';
	import Knob from '$lib/nyege/Knob.svelte';
	import Blip from '$lib/aaa/Blip.svelte';
	import RadioH from '$lib/nyege/RadioH.svelte';
	import { socket } from '$lib/nyege/app';
	import { 
		range0, range1, range2, range3, 
		buf0, buf1, buf2, buf3,
		pitch0, pitch1, pitch2, pitch3,
		len0, len1, len2, len3,
		div0, div1, div2, div3,
		globalCycle, pips
		
	} from '$lib/nyege/app';
	import { send_message } from '$lib/common/patch_helpers';
	
	export let patch;
	
	let blips = new Array(4).fill(null);
	
	const divKnob = {
		min: 1, max: 16, step: 1, scale: 0.25,
	}
	const stepper = {
		min: 1, max: 16, step: 1,
		width: '600', height: '40'
	}
	const soundKnob = {
		showValue: true,
		min: 0, max: 33, step: 1, scale: 0.25
	}
	const pitchKnob = {
		showValue: true,
		min: -36, max: 36, step: 1, scale: 0.5
	}
	const lenKnob = {
		showValue: true,
		min: 0, max: 1, step: 0.01, scale: 0.005
	}
	
	const radio = {
		options: [
			{ value: 32, display: 32 },
			{ value: 24, display: 24 },
			{ value: 16, display: 16 },
			{ value: 12, display: 12 },
			{ value: 9, display: 9 },
			{ value: 8, display: 8 },
			{ value: 6, display: 6 },
			{ value: 4, display: 4 },
			{ value: 3, display: 3 },
			{ value: 2, display: 2 },
			{ value: 1, display: 1 }
		],
		width: '54.54px',
		height: '20px'
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
	$: send_message(patch, 'global_cycle', [$globalCycle]);

	patch.messageEvent.subscribe(e => {
		if (e.tag === 'pips') {
			$pips = e.payload;
		}

		if (e.tag === 'blip') {
			if (e.payload <= 3) {
				blips[e.payload].blink();
			}
		}
	});
</script>

<div class="container">
	<div class="radio-row">
		<RadioH {...radio} bind:value={$globalCycle} />
		<div class='knob-labels'>
			<div>sound</div>
			<div>pitch</div>
			<div>length</div>
		</div>
	</div>
	
	<div class="row">
		<Blip bind:this={blips[0]} />
		<Knob {...divKnob} bind:value={$div0} />
		<Stepper {...stepper} bind:value={$range0} bind:div={$div0} pos={$pips[0]} />
		<Knob {...soundKnob} bind:value={$buf0} />
		<Knob {...pitchKnob} bind:value={$pitch0} />
		<Knob {...lenKnob} bind:value={$len0} />
	</div>
	<div class="row">
		<Blip bind:this={blips[1]} />
		<Knob {...divKnob} bind:value={$div1} />
		<Stepper {...stepper} bind:value={$range1} bind:div={$div1} pos={$pips[1]} />
		<Knob {...soundKnob} bind:value={$buf1} />
		<Knob {...pitchKnob} bind:value={$pitch1} />
		<Knob {...lenKnob} bind:value={$len1} />
	</div>
	<div class="row">
		<Blip bind:this={blips[2]} />
		<Knob {...divKnob} bind:value={$div2} />
		<Stepper {...stepper} bind:value={$range2} bind:div={$div2} pos={$pips[2]} />
		<Knob {...soundKnob} bind:value={$buf2} />
		<Knob {...pitchKnob} bind:value={$pitch2} />
		<Knob {...lenKnob} bind:value={$len2} />
	</div>
	<div class="row">
		<Blip bind:this={blips[3]} />
		<Knob {...divKnob} bind:value={$div3} />
		<Stepper {...stepper} bind:value={$range3} bind:div={$div3} pos={$pips[3]} />
		<Knob {...soundKnob} bind:value={$buf3} />
		<Knob {...pitchKnob} bind:value={$pitch3} />
		<Knob {...lenKnob} bind:value={$len3} />
	</div>
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
	
	.row {
		display: grid;
		align-items: center;
		justify-content: center;
		grid-template-columns: var(--grid);
		height: 55px;
	}
</style>
