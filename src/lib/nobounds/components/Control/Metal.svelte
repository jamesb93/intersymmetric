<script>
    import { params } from '$lib/nobounds/app';
    import {
        length,
        pitchOffset,
        pitch2,
        pitch3,
        shape2,
        shape3
    } from '$lib/nobounds/firebase-core';
    import { freqMap } from '$lib/utility';

    export let instrument;
    export let id;

    const pitch = id === 'metal1' ? pitch2 : pitch3;
    const shape = id === 'metal1' ? shape2 : shape3;

    $: instrument.source.frequency.rampTo(
        $params[id].frequency * freqMap($pitchOffset + $pitch),
        0.1
    );
    $: instrument.source.harmonicity = $params[id].harmonicity;
    $: instrument.source.modulationIndex = $params[id].modulationIndex;
    $: instrument.source.resonance = $params[id].resonance;
    $: instrument.source.octaves = $params[id].octaves;
    $: instrument.source.envelope.attack =
        $params[id].attack * Math.max($length, 0.1) * Math.max($shape, 0.01);
    $: instrument.source.envelope.decay =
        $params[id].decay * Math.max($length, 0.1) * Math.max($shape, 0.01);
    $: instrument.source.envelope.release = Math.max(
        $params[id].release * Math.max($length, 0.1) * Math.max($shape, 0.01),
        0
    );
</script>
