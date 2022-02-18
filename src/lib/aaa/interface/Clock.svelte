<script>
    import Knob from '../Knob.svelte';
    import Play from '../Play.svelte';
    import { speed, socket, tala } from '../app';
    import { send_message } from '$lib/aaa/patch_helpers'

    export let patch;
    
    const speed_knob = { 
        title: "rate", 
        min: 0.05, max: 10.0, step: 0.1, 
        scale: 0.1,
        resetValue: 0.5
    }

    let state = 0;

    patch.messageEvent.subscribe(e => {
        if (e.tag === 'pattern') {
            $tala[0] = e.payload[0]
        } else if (e.tag === 'b_index') {
            $tala[1] = e.payload
        } else if (e.tag === 'c_index') {
            $tala[2] = e.payload
        }
    })

    $: send_message(patch, 'speed', [$speed]);
    $: send_message(patch, 'state', [state]);
</script>

<div class="clock area">
    <div class="label no_hover">clock</div>
    <div class="controls">
        <Knob {...speed_knob} bind:value={ $speed } func={ () => { socket.emit('speed', $speed) }} />
        <Play bind:state={state}/>
    </div>
    
    <div class='no_hover'>{ $tala }</div>
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