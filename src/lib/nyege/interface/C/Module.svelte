<script>
    import RSlider from '$lib/nyege/RSlider.svelte';
    import RadioH from '$lib/nyege/RadioH.svelte';
    import RadioV from '$lib/nyege/RadioV.svelte';
    import Blip from '$lib/aaa/Blip.svelte';
    import Knob from '$lib/nyege/Knob.svelte';
    import { sendMessage } from '$lib/common/patch_helpers';
    import { socket } from '$lib/nyege/app';
    import { buf6, scale, len6, chordfollow, chordspread, chordlow, chordhigh } from '$lib/nyege/app';

    export let patch;

    const radioh = {
        options: [1, 2, 3, 4, 5, 6, 7, 8].map(x => ({ display: x, value: x })),
        height: '40px'
    };
    const radiov = {
        options: [
            { value: 0, display: 'off' },
            { value: 1, display: 1 },
            { value: 2, display: 2 },
            { value: 3, display: 3 },
            { value: 4, display: 4 }
        ]
    };
    const rslider = { 
        min: 0, 
        max: 100, 
        step: 1,
        width: 598
    };
    const soundKnob = {
        min: 0,
        max: 33,
        step: 1,
        scale: 0.25
    };
    const scaleKnob = {
        min: 0,
        max: 6,
        step: 1,
        scale: 0.5
    };
    const lenKnob = {
        min: 0,
        max: 1,
        step: 0.01,
        scale: 0.005
    };

    let blip;

    patch.messageEvent.subscribe(e => {
        if (e.tag === 'blip' && e.payload === 6) {
            blip.blink();
        }
    });

    $: sendMessage(patch, 'chord_params', [
        $chordfollow,
        $chordspread,
        $chordlow / 100.0,
        $chordhigh / 100.0,
        $scale,
        $buf6,
        $len6
    ]);
</script>

<div class="container">
    <div class="grid">
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
        <div class="sound">
            <div>sound</div>
            <Knob {...soundKnob} bind:value={$buf6} func={() => socket.emit('buf6', $buf6)} />
        </div>
        <div class="scale">
            <div>scale</div>
            <Knob {...scaleKnob} bind:value={$scale} func={() => socket.emit('scale', $scale)} />
        </div>
        <div class="length">
            <div>length</div>
            <Knob {...lenKnob} bind:value={$len6} func={() => socket.emit('len6', $len6)} />
        </div>
        </div>
</div>

<style>
    .container {
        height: 94px;
    }
    .row {
        height: 90px;
    }
</style>
