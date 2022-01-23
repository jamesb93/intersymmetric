<script>
    import * as Tone from 'tone';
    import { onMount } from 'svelte';
    import { KickSynth } from '$lib/components/AA/instruments/kick';
    import { MetalSynth } from '$lib/components/AA/instruments/metal';
    import { SnareSynth } from '$lib/components/AA/instruments/snare';
    import { FMSynth } from '$lib/components/AA/instruments/fm';
    import { Poly } from '$lib/components/AA/poly';

    function init() {
        Tone.start();
    }
    
    let synth;
    $: if (synth) { 
        console.log(synth.busy)
    }

    onMount(async() => {
        fm = new Poly(SnareSynth, 8);
        kick = new Poly(KickSynth, 8)
        // synth.out.toDestination();
    })

</script>

<button class='btn' on:click={ init }>
    start audio
</button>

<button on:click={ () => {
    if (!synth.busy) {
        synth.trigger(
            Tone.now(), 
            0.1, 
        // [0, 40, 5.5, 0, 0.75, 0.8, 1.4, 1.0]
        // [600, 0.9, 31.91, 200, 0.75, 1, 0.001, 1.884, 1, 1.0]
        // [5000, 0.001, 0.227, 0.075, 0.143, 1, 340, 1.0]
            [50, 2, 12, 198, 26837, 4908, 3334, 1, 1, 1, 1, 1, 0.322, 1.0]
        )
    }
}}>synth</button>