<script>
    import RSlider from '$lib/nyege/RSlider.svelte';
    import RadioH from '$lib/nyege/RadioH.svelte';
    import RadioV from '$lib/nyege/RadioV.svelte';
    import Blip from '$lib/aaa/Blip.svelte';
    import Knob from '$lib/nyege/Knob.svelte';
    import { send_message } from '$lib/common/patch_helpers';

    export let patch;

    import { buf6, scale, len6, chordfollow, chordspread, chordlow, chordhigh } from '$lib/nyege/app';

    const radioh = {
        options: [1, 2, 3, 4, 5, 6, 7, 8].map(x => ({ display: x, value: x })),
        width: '75px',
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
    const rslider = { min: 0, max: 100, step: 1 };
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

    $: send_message(patch, 'chord_params', [
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
    <div class="row grid">
        <Blip bind:this={blip} />
        <RadioV {...radiov} bind:value={$chordfollow} />
        <div class="centre">
            <RSlider {...rslider} bind:low={$chordlow} bind:high={$chordhigh} />
            <RadioH {...radioh} bind:value={$chordspread} />
        </div>
        <Knob {...soundKnob} bind:value={$buf6} />
        <Knob {...scaleKnob} bind:value={$scale} />
        <Knob {...lenKnob} bind:value={$len6} />
    </div>
</div>

<style>
    .row {
        height: 90px;
    }
</style>
