<script>
    import RSlider from '$lib/nyege/RSlider.svelte';
    import RadioH from '$lib/nyege/RadioH.svelte';
    import RadioV from '$lib/nyege/RadioV.svelte';
    import Blip from '$lib/nyege/Blip.svelte';
    import Knob from '$lib/common/Knob.svelte';
    import { sendMessage } from '$lib/common/patch-helpers';
    import { socket } from '$lib/nyege/app';
    import { buf6, scale, len6, chordfollow, chordspread, chordlow, chordhigh } from '$lib/nyege/app';

    export let patch;

    const radioh = {
        options: [1, 2, 3, 4, 5, 6, 7, 8].map(x => ({ display: x, value: x })),
        height: '50px',
        width: '510px'
    };
    const rslider = {
        min: 0,
        max: 100,
        step: 1,
        width: 448,
        height: '30px'
    };
    const radiov = {
        options: [
            { value: 0, display: 'off' },
            { value: 1, display: 1 },
            { value: 2, display: 2 },
            { value: 3, display: 3 },
            { value: 4, display: 4 }
        ],
        height: '16.4px'
    };
    const soundKnob = {
        min: 20,
        max: 33,
        step: 1,
        scale: 0.25,
        resetValue: 20
    };
    const scaleKnob = {
        min: 0,
        max: 6,
        step: 1,
        scale: 0.05,
        resetValue: 0
    };
    const lenKnob = {
        min: 0,
        max: 1,
        step: 0.01,
        scale: 0.005,
        resetValue: 1
    };

    let blip;

    patch.messageEvent.subscribe(e => {
        if (e.tag === 'blip' && e.payload === 6) {
            blip.blink();
        }
    });

    $: sendMessage(patch, 'chordfollow', [$chordfollow]);
    $: sendMessage(patch, 'chordscale', [$chordspread, $chordlow / 100.0, $chordhigh / 100.0, $scale]);
    $: sendMessage(patch, 'chordsampler', [$buf6, $len6]);
</script>

<div class="grid container">
    <Blip bind:this={blip} />
    <RadioV {...radiov} bind:value={$chordfollow} func={() => socket.emit('chordfollow', $chordfollow)} />
    <div class="centre">
        <RSlider
        {...rslider}
        bind:low={$chordlow}
        bind:high={$chordhigh}
        lofunc={() => socket.emit('chordlow', $chordlow)}
        hifunc={() => socket.emit('chordhigh', $chordhigh)}
        />
        <RadioH {...radioh} bind:value={$chordspread} func={() => socket.emit('chordspread', $chordspread)} />
    </div>
    <div class="box">
        <div class="header">sound</div>
        <Knob {...soundKnob} bind:value={$buf6} func={() => socket.emit('buf6', $buf6)} />
    </div>
    <div class="box">
        <div class="header">scale</div>
        <Knob {...scaleKnob} bind:value={$scale} func={() => socket.emit('scale', $scale)} />
    </div>
    <div class="box">
        <div class="header">length</div>
        <Knob {...lenKnob} bind:value={$len6} func={() => socket.emit('len6', $len6)} />
    </div>
</div>

<style>
    .container {
        height: 94px;
    }
    .box {
        display: flex;
        flex-direction: column;
    }
    .header {
        color: var(--primary);
        width: 35px;
    }
</style>
