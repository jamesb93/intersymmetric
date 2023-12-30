<script>
    import { params } from '$lib/nobounds/app';
    import { length, pitchOffset, trackPitch, trackShape } from '$lib/nobounds/firebase-core'
    import { clip, freqMap } from '$lib/utility';
    import { snare } from '$lib/nobounds/instruments/ensemble';

    $: snare.filter.frequency.rampTo($params.snare.frequency * freqMap($pitchOffset + $trackPitch[1]), 0.1);
    $: snare.env.attack = $params.snare.attack * $length * $trackShape[1];
    $: snare.env.decay = $params.snare.decay * $length * $trackShape[1];
    $: snare.env.release = $params.snare.release * $length * $trackShape[1];
    $: snare.env.sustain = $params.snare.sustain;
    $: snare.membrane.frequency.rampTo($params.snare.membraneFreq * freqMap($pitchOffset), 0.1);
    $: snare.waveshaper.order = clip(Math.round($params.snare.order), 1, 100);
</script>
