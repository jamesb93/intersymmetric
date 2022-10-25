<script>
    import './interface.css';
    import presets from '$lib/aaa/data/presets.json'
    import Knob from '$lib/common/Knob.svelte';
    import Blip from '../Blip.svelte';
    import RadioV from '../RadioV.svelte';
    import { socket } from '../app';
    import { sendDeviceMessage } from '@jamesb93/rnbo-svelte'
    import {
        fm1_freq_preset,
        fm1_mod_preset,
        fm1_shape_preset,
        fm2_freq_preset,
        fm2_mod_preset,
        fm2_shape_preset,
        perc_sound_preset,
        perc_transpose_preset,
        perc_shape_preset,
        fm1_listener,
        fm2_listener,
        perc_listener
    } from '../app';

    export let patch;

    let _fm1_freq_preset = $fm1_freq_preset,
        _fm1_mod_preset = $fm1_mod_preset,
        _fm1_shape_preset = $fm1_shape_preset,
        _fm2_freq_preset = $fm2_freq_preset,
        _fm2_mod_preset = $fm2_mod_preset,
        _fm2_shape_preset = $fm2_shape_preset,
        _perc_sound_preset = $perc_sound_preset,
        _perc_transpose_preset = $perc_transpose_preset,
        _perc_shape_preset = $perc_shape_preset;

    let step = 1;
    let min = 0;

    const knob = {
        WIDTH: 80, 
        HEIGHT: 60,
        SHIFT: 1.1,
        RADIUS: 21,
        showValue: false,
        step: 1,
        scale: 0.1,
        resetValue: 0
    }

    const fm1_freq_knob = Object.assign({
        title: 'sound',
        min: 0,
        max: presets.fm1_freq.length-1,
        func: () => {
            socket.emit('fm1_freq_preset', $fm1_freq_preset);
        }
    }, knob);

    const fm1_mod_knob = Object.assign({
        title: 'mod',
        min: 0,
        max: presets.fm1_mod.length-1,
        func: () => {
            socket.emit('fm1_mod_preset', $fm1_mod_preset);
        }
    }, knob);

    const fm1_shape_knob = Object.assign({
        title: 'shape',
        min: 0,
        max: presets.fm1_shape.length-1,
        func: () => {
            socket.emit('fm1_shape_preset', $fm1_shape_preset);
        }
    }, knob);
    $: _fm1_mod_preset = Math.round(($fm1_mod_preset - min) / step) * step + min;

    const fm2_freq_knob = Object.assign({
        title: 'sound',
        min: 0,
        max: presets.fm2_freq.length-1,
        func: () => {
            socket.emit('fm2_freq_preset', $fm2_freq_preset);
        }
    }, knob);

    const fm2_mod_knob = Object.assign({
        title: 'mod',
        min: 0,
        max: presets.fm2_mod.length-1,
        func: () => {
            socket.emit('fm2_mod_preset', $fm2_mod_preset);
        }
    }, knob);

    const fm2_shape_knob = Object.assign({
        title: 'shape',
        min: 0,
        max: presets.fm2_shape.length-1,
        func: () => {
            socket.emit('fm2_shape_preset', $fm2_shape_preset);
        }
    }, knob);

    const perc_sound_knob = Object.assign({
        title: 'sound',
        min: 0,
        max: presets.perc_sound.length-1,
        func: () => {
            socket.emit('perc_sound_preset', $perc_sound_preset);
        }
    }, knob);

    const perc_transpose_knob = Object.assign({
        title: 'mod',
        min: 0,
        max: presets.perc_sound.length-1,
        func: () => {
            socket.emit('perc_transpose_preset', $perc_transpose_preset);
        }
    }, knob);

    const perc_shape_knob = Object.assign({
        title: 'shape',
        min: 0,
        max: presets.perc_shape.length-1,
        func: () => {
            socket.emit('perc_shape_preset', $perc_shape_preset);
        }
    }, knob);

    $: {
        try {
            if (Number.isInteger(_fm1_freq_preset)) {
                const data = presets.fm1_freq[_fm1_freq_preset];
                for (const [k, v] of Object.entries(data)) {
                    sendDeviceMessage(patch, k, v);
                }
            }
        } catch (e) {
            console.log('fm1_freq_preset err', _fm1_freq_preset, e);
        }
    }

    $: {
        try {
            if (Number.isInteger(_fm1_mod_preset)) {
                const data = presets.fm1_mod[_fm1_mod_preset];
                for (const [k, v] of Object.entries(data)) {
                    sendDeviceMessage(patch, k, v);
                }
            }
        } catch (e) {
            console.log('fm1_mod_preset', _fm1_mod_preset, e);
        }
    }

    $: {
        try {
            if (Number.isInteger(_fm1_shape_preset)) {
                const data = presets.fm1_shape[_fm1_shape_preset];
                for (const [k, v] of Object.entries(data)) {
                    sendDeviceMessage(patch, k, v);
                }
            }
        } catch (e) {
            console.log('fm1_shape_preset', _fm1_shape_preset, e);
        }
    }
    ///////////
    $: {
        try {
            if (Number.isInteger(_fm2_freq_preset)) {
                const data = presets.fm2_freq[_fm2_freq_preset];
                for (const [k, v] of Object.entries(data)) {
                    sendDeviceMessage(patch, k, v);
                }
            }
        } catch (e) {
            console.log('fm2_freq_preset', _fm2_freq_preset, e);
        }
    }

    $: {
        try {
            if (Number.isInteger(_fm2_mod_preset)) {
                const data = presets.fm2_mod[_fm2_mod_preset];
                for (const [k, v] of Object.entries(data)) {
                    sendDeviceMessage(patch, k, v);
                }
            }
        } catch (e) {
            console.log('fm2_mod_preset', _fm2_mod_preset, e);
        }
    }

    $: {
        try {
            if (Number.isInteger(_fm2_shape_preset)) {
                const data = presets.fm2_shape[_fm2_shape_preset];
                for (const [k, v] of Object.entries(data)) {
                    sendDeviceMessage(patch, k, v);
                }
            }
        } catch (e) {
            console.log('fm1_shape_preset', _fm2_shape_preset, e);
        }
    }
    ///////////
    $: {
        try {
            if (Number.isInteger(_perc_sound_preset)) {
                const data = presets.perc_sound[_perc_sound_preset];
                for (const [k, v] of Object.entries(data)) {
                    sendDeviceMessage(patch, k, v);
                }
            }
        } catch (e) {
            console.log('perc_sound_preset', _perc_sound_preset, e);
        }
    }

    $: {
        try {
            if (Number.isInteger(_perc_transpose_preset)) {
                const data = presets.perc_transpose[_perc_transpose_preset];
                for (const [k, v] of Object.entries(data)) {
                    sendDeviceMessage(patch, k, v);
                }
            }
        } catch (e) {
            console.log('perc_transpose_preset', _perc_transpose_preset, e);
        }
    }

    $: {
        try {
            if (Number.isInteger(_perc_shape_preset)) {
                const data = presets.perc_shape[_perc_shape_preset];
                for (const [k, v] of Object.entries(data)) {
                    sendDeviceMessage(patch, k, v);
                }
            }
        } catch (e) {
            console.log('perc_shape_preset', _perc_shape_preset, e);
        }
    }

    $: sendDeviceMessage(patch, 'perc_listener', [$perc_listener]);
    $: sendDeviceMessage(patch, 'fm1_listener', [$fm1_listener]);
    $: sendDeviceMessage(patch, 'fm2_listener', [$fm2_listener]);

    let blip_1, blip_2, blip_3;

    patch.messageEvent.subscribe(e => {
        if (e.tag === 'a_event') {
            if ($perc_listener === 1) blip_1.blink();
            if ($fm1_listener === 1) blip_2.blink();
            if ($fm2_listener === 1) blip_3.blink();
        } else if (e.tag === 'b_event') {
            if ($perc_listener === 2) blip_1.blink();
            if ($fm1_listener === 2) blip_2.blink();
            if ($fm2_listener === 2) blip_3.blink();
        } else if (e.tag === 'c_event') {
            if ($perc_listener === 3) blip_1.blink();
            if ($fm1_listener === 3) blip_2.blink();
            if ($fm2_listener === 3) blip_3.blink();
        }
    });
</script>

<div class="sound_pattern area">
    <div class="label no-hover">sound pattern</div>
    <div class="controls">
        <div class="panel">
            <RadioV
                func={() => {
                    socket.emit('perc_listener', $perc_listener);
                }}
                bind:value={$perc_listener}
            />
            <Blip bind:this={blip_1} />
            <Knob {...perc_sound_knob} bind:internal={$perc_sound_preset} bind:value={_perc_sound_preset} />
            <Knob {...perc_transpose_knob} bind:internal={$perc_transpose_preset} bind:value={_perc_transpose_preset} />
            <Knob {...perc_shape_knob} bind:internal={$perc_shape_preset} bind:value={_perc_shape_preset} />
        </div>

        <div class="panel">
            <RadioV
                func={() => {
                    socket.emit('fm1_listener', $fm1_listener);
                }}
                bind:value={$fm1_listener}
            />
            <Blip bind:this={blip_2} />
            <Knob {...fm1_freq_knob} bind:internal={$fm1_freq_preset} bind:value={_fm1_freq_preset} />
            <Knob {...fm1_mod_knob} bind:internal={$fm1_mod_preset} bind:value={_fm1_mod_preset} />
            <Knob {...fm1_shape_knob} bind:internal={$fm1_shape_preset} bind:value={_fm1_shape_preset} />
        </div>

        <div class="panel">
            <RadioV
                func={() => {
                    socket.emit('fm2_listener', $fm2_listener);
                }}
                bind:value={$fm2_listener}
            />
            <Blip bind:this={blip_3} />
            <Knob {...fm2_freq_knob} bind:internal={$fm2_freq_preset} bind:value={_fm2_freq_preset} />
            <Knob {...fm2_mod_knob} bind:internal={$fm2_mod_preset} bind:value={_fm2_mod_preset} />
            <Knob {...fm2_shape_knob} bind:internal={$fm2_shape_preset} bind:value={_fm2_shape_preset} />
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
        color: hsl(324, 100%, 63%);
    }

    .sound_pattern > .controls {
        display: grid;
        grid-template-columns: repeat(3, auto);
    }
</style>
