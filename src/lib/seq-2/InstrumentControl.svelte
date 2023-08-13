<script lang='ts'>
    import HMeter from './HMeter.svelte';
    import VMeter from './VMeter.svelte';
    import Knob from '$lib/seq-2/Knob.svelte';
	export let instrument;
	const { sound, pitch, shape, level } = instrument;

	const sound_knob = {
		min: sound.get().min,
		max: sound.get().max,
		step: sound.get().step,
		resetValue: sound.init(),
		scale: 0.01,
		title: 'Sound',
		padding: 20
	}

	const pitch_knob = {
		min: pitch.get().min,
		max: pitch.get().max,
		step: pitch.get().step,
		resetValue: pitch.init(),
		scale: 0.5,
		title: 'Pitch',
		padding: 20,
	}

	const shape_knob = {
		min: shape.get().min,
		max: shape.get().max,
		step: shape.get().step,
		resetValue: shape.init(),
		scale: 0.01,
		title: 'Shape',
		padding: 20,
	}
	let containerHeight = 0;
	$: meterHeight = containerHeight-25;
</script>

<div class='container' bind:clientHeight={containerHeight}>
	<div class="knobs">
		<Knob {...sound_knob} bind:value={$sound}/>
		<Knob {...pitch_knob} bind:value={$pitch}/>
		<Knob {...shape_knob} bind:value={$shape}/>
	</div>
	<VMeter bind:level={$level} bind:height={meterHeight} />
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: auto auto;
		width: max-content;
		height: 225px;
		/* height: max-content; */
		gap: 1em;
		border: 1px solid var(--primary);
		padding: 0.5em;
		place-items: center;
	}
	.knobs {
		display: grid;
		grid-template-rows: auto auto auto;
	}
</style>