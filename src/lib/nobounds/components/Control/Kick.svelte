<script>
    import { params } from '$lib/nobounds/app';
    import { length, pitchOffset, pitch0, shape0 } from '$lib/nobounds/firebase-core';
    import { kick } from '$lib/nobounds/instruments/ensemble.js';
    import { freqMap, clip } from '$lib/utility';

    $: kick.distortion.distortion = clip($params.kick.distortion, 0.0, 1.0);
    $: {
        let calculatedFreq = Math.max(
            0,
            $params.kick.frequency * freqMap($pitchOffset + $pitch0)
        );
        if (!Number.isNaN(calculatedFreq) && Math.sign(calculatedFreq) === 1) {
            kick.membrane.frequency.rampTo(calculatedFreq, 0.1);
        }
    }

    $: kick.membrane.octaves = clip($params.kick.octaves, 0, 999);
    $: kick.membrane.envelope.attack = Math.max(
        $params.kick.attack * $length * Math.max($shape0, 0.01),
        0
    );
    $: kick.membrane.envelope.sustain = clip($params.kick.sustain, 0.0, 1.0);

    $: kick.membrane.envelope.decay = Math.max(
        $params.kick.decay * $length * Math.max($shape0, 0.01),
        0
    );
    $: kick.membrane.envelope.release = Math.max(
        $params.kick.release * $length * Math.max($shape0, 0.01),
        0
    );
</script>
