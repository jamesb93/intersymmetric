<script>
    import './interface.css';
    import { socket } from '../app';
    import presets from '../../../../static/aaa/presets.json';
    import Knob from '../Knob.svelte';
    import Blip from '../Blip.svelte';
    import RadioV from '../RadioV.svelte';
    
    import {
        fm1_freq_preset, fm1_mod_preset, fm1_shape_preset,
        fm2_freq_preset, fm2_mod_preset, fm2_shape_preset,
        perc_sound_preset, perc_transpose_preset, perc_shape_preset,
        fm1_listener, fm2_listener, perc_listener
    } from '../app';

    const fm1_freq_knob = {
        title: "freq",
        min: 0,
        max: presets.fm1_freq.length,
        step: 1,
        scale: 0.1,
        resetValue: 0,
        func: () => { socket.emit('fm1_freq_preset', $fm1_freq_preset) }
    }
    const fm1_mod_knob = {
        title: "mod",
        min: 0,
        max: presets.fm1_mod.length,
        step: 1,
        scale: 0.1,
        resetValue: 0,
        func: () => { socket.emit('fm1_mod_preset', $fm1_mod_preset) }    
    }
    const fm1_shape_knob = {
        title: "shape",
        min: 0,
        max: presets.fm1_shape.length,
        step: 1,
        scale: 0.1,
        resetValue: 0,
        func: () => { socket.emit('fm1_shape_preset', $fm1_shape_preset) }    
    }
    const fm2_freq_knob = {
        title: "freq",
        min: 0,
        max: presets.fm2_freq.length,
        step: 1,
        scale: 0.1,
        resetValue: 0,
        func: () => { socket.emit('fm2_freq_preset', $fm2_freq_preset) }    
    }
    const fm2_mod_knob = {
        title: "mod",
        min: 0,
        max: presets.fm2_mod.length,
        step: 1,
        scale: 0.1,
        resetValue: 0,
        func: () => { socket.emit('fm2_mod_preset', $fm2_mod_preset) }  
    }
    const fm2_shape_knob = {
        title: "shape",
        min: 0,
        max: presets.fm2_shape.length,
        step: 1,
        scale: 0.1,
        resetValue: 0,
        func: () => { socket.emit('fm2_shape_preset', $fm2_shape_preset) }  
    }
    const perc_sound_knob = {
        title: "sound",
        min: 0,
        max: presets.perc_sound.length,
        step: 1,
        scale: 0.1,
        resetValue: 0,
        func: () => { socket.emit('perc_sound_preset', $perc_sound_preset) }  
    }
    const perc_transpose_knob = {
        title: "transpose",
        min: 0,
        max: presets.perc_sound.length,
        step: 1,
        scale: 0.1,
        resetValue: 0,
        func: () => { socket.emit('perc_transpose_preset', $perc_transpose_preset) }  
    }
    const perc_shape_knob = {
        title: "shape",
        min: 0,
        max: presets.perc_shape.length,
        step: 1,
        scale: 0.1,
        resetValue: 0,
        func: () => { socket.emit('perc_shape_preset', $perc_shape_preset) }
    }
</script>

<div class="sound_pattern area">
    <div class="label">sound pattern</div>
    <div class="controls">
        <div class='panel'>
            <RadioV func={ () => { socket.emit('perc_listener', $perc_listener) }} bind:value={$perc_listener} />
            <Blip />
            <Knob {...perc_sound_knob}  bind:value={$perc_sound_preset} />
            <Knob {...perc_transpose_knob}   bind:value={$perc_transpose_preset} />
            <Knob {...perc_shape_knob} bind:value={$perc_shape_preset} />
        </div>

        <div class='panel'>
            <RadioV func={ () => { socket.emit('fm1_listener', $fm1_listener) }} bind:value={$fm1_listener} />
            <Blip />
            <Knob {...fm1_freq_knob}  bind:value={$fm1_freq_preset} />
            <Knob {...fm1_mod_knob}   bind:value={$fm1_mod_preset} />
            <Knob {...fm1_shape_knob} bind:value={$fm1_shape_preset} />
        </div>

        <div class='panel'>
            <RadioV func={ () => { socket.emit('fm2_listener', $fm2_listener) }} bind:value={$fm2_listener} />
            <Blip />
            <Knob {...fm2_freq_knob}  bind:value={$fm2_freq_preset} />
            <Knob {...fm2_mod_knob}   bind:value={$fm2_mod_preset} />
            <Knob {...fm2_shape_knob} bind:value={$fm2_shape_preset} />
        </div>
    </div>
</div>

<style>
    .sound_pattern {
        display: flex;
        flex-direction: column;
        gap: 1em;
        border-left: 1px dashed var(--primary);
        border-right: 1px dashed var(--primary);
        place-items: center;
    }

    .sound_pattern > .controls {
        display: grid;
        grid-template-columns: repeat(3, auto);
    }
</style>