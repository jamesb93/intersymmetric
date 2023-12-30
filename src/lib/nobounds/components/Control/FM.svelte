<script>
    import { params } from '$lib/nobounds/app';
    import { length, pitchOffset, trackPitch, trackShape } from '$lib/nobounds/firebase-core'
    import { freqMap } from '$lib/utility';

    export let instrument;
    export let id;

    const trackIdx = id === 'fm1' ? 4 : 5;
    $: instrument.fund.rampTo($params[id].frequency * freqMap($pitchOffset + $trackPitch[trackIdx]), 0.1);
    $: instrument.c1ratio.rampTo($params[id].c1ratio, 0.1);
    $: instrument.c2ratio.rampTo($params[id].c2ratio, 0.1);
    $: instrument.c3ratio.rampTo($params[id].c3ratio, 0.1);
    $: instrument.fm2to1.factor.rampTo($params[id].fm2to1, 0.1);
    $: instrument.fm3to2.factor.rampTo($params[id].fm3to2, 0.1);
    $: instrument.fm3to1.factor.rampTo($params[id].fm3to1, 0.1);
    $: instrument.c1env.release = $params[id].c1release * ($length * Math.max($trackShape[trackIdx], 0.01));
    $: instrument.c2env.release = $params[id].c2release * ($length * Math.max($trackShape[trackIdx], 0.01));
    $: instrument.c3env.release = $params[id].c3release * ($length * Math.max($trackShape[trackIdx], 0.01));
    $: instrument.op1gain.gain.rampTo($params[id].op1gain * 0.33, 0.1);
    $: instrument.op2gain.gain.rampTo($params[id].op2gain * 0.33, 0.1);
    $: instrument.op3gain.gain.rampTo($params[id].op3gain * 0.33, 0.1);
</script>
