<script>
    /** @type {import('@rnbo/js').Device} */
    export let device;

    import { sendDeviceMessage } from '../common/rnbo/helpers';
    import Knob from '$lib/seq-2/Knob.svelte';
    import Toggle from '$lib/seq-2/Toggle.svelte';
    import Button from './Button.svelte';
    import Grid from './Grid.svelte';
    import InstrumentControl from './InstrumentControl.svelte';
    import { 
        state, 
        bpm,
        direction,
        multiplier,
        grid_end,
        grid_start,
        grid,
        kick, snare, metal, fm
    } from './app';

    const bpm_knob = {
        min: bpm.get().min,
        max: bpm.get().max,
        step: bpm.get().step,
        resetValue: bpm.init(),
        scale: 1,
        title: 'bpm'
    }
    const multiplier_knob = {
        min: 0,
        max: multiplier.get_options().length-1,
        step: 1,
        resetValue: 0,
        scale: 0.25,
        title: 'multiplier'
    }

    const randomise_everything = () => {
        $grid = $grid.map(row => row.map(() => Math.random() > 0.5))
        sendDeviceMessage(device, 'randomise', [0]);
        sendDeviceMessage(device, 'grid', $grid.flat());
    }
    $: sendDeviceMessage(device, 'state', [$state])
    $: sendDeviceMessage(device, 'bpm', [$bpm])
    $: sendDeviceMessage(device, 'direction', [$direction])
    $: sendDeviceMessage(device, 'multiplier', [multiplier.get_value($multiplier)])
    $: sendDeviceMessage(device, 'grid_start', [$grid_start])
    $: sendDeviceMessage(device, 'grid_end', [$grid_end])
</script>

<div class="container">
    <div class='controls'>
        <Toggle bind:enabled={$state}/>
        <Button on:click={randomise_everything}>
            rand
        </Button>
        <Knob { ...bpm_knob} bind:value={$bpm} />
        <Knob {...multiplier_knob} bind:value={$multiplier} displayValue={multiplier.get_value($multiplier)} />
    </div>
    <Grid bind:device />
    <div class="instrument-controllers">
        <InstrumentControl instrument={kick}/>
        <InstrumentControl instrument={snare}/>
        <InstrumentControl instrument={fm}/>
        <InstrumentControl instrument={metal}/>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1em;
        place-items: center;
    }

    .controls {
        display: flex;
        flex-direction: row;
        gap: 2em;
    }
    .instrument-controllers {
        display: grid;
        grid-template-columns: repeat(4, auto);
        justify-content: space-around;
        gap: 2em;
    }
</style>
