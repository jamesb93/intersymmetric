<script>
    import Knob from '../Knob.svelte';
    import Play from '../Play.svelte';
    import { speed, socket } from '../app';
    import { send_message } from '$lib/aaa/patch_helpers'

    export let patch;
    
    const speed_knob = { 
        title: "rate", 
        min: 0.05, max: 10.0, step: 0.1, 
        scale: 0.1,
        resetValue: 0.5
    }

    $: send_message(patch, 'speed', [$speed]);
</script>

<div class="clock area">
    <div class="label">clock</div>
    <div class="controls">
        <Knob {...speed_knob} bind:value={ $speed } func={ () => { socket.emit('speed', $speed) }} />
        <Play />
    </div>
    
    <div>pattern thing</div>
</div>

<style>
    .clock {
        display: flex;
        flex-direction: column;
        gap: 1em;
        border-left: 1px dashed var(--primary);
    }
    
    .clock > .controls {
        display: flex;
        flex-direction: row;
    }
</style>