<script>
    import { socket, params, length, pitchOffset, trackPitch, trackShape } from '$lib/nobounds/app';
    import { freqMap } from '$lib/utility.js';

    export let instrument;
    export let id;

    const trackIdx = id === 'metal1' ? 2 : 3;

    $: instrument.source.frequency.rampTo($params[id].frequency * freqMap($pitchOffset + $trackPitch[trackIdx]), 0.1);
    $: instrument.source.harmonicity = $params[id].harmonicity;
    $: instrument.source.modulationIndex = $params[id].modulationIndex;
    $: instrument.source.resonance = $params[id].resonance;
    $: instrument.source.octaves = $params[id].octaves;
    $: instrument.source.envelope.attack =
        $params[id].attack * Math.max($length, 0.1) * Math.max($trackShape[trackIdx], 0.01);
    $: instrument.source.envelope.decay =
        $params[id].decay * Math.max($length, 0.1) * Math.max($trackShape[trackIdx], 0.01);
    $: instrument.source.envelope.release = Math.max(
        $params[id].release * Math.max($length, 0.1) * Math.max($trackShape[trackIdx], 0.01),
        0
    );

    socket.on('params::' + id + '::frequency', data => {
        $params[id].frequency = data;
    });
    socket.on('params::' + id + '::harmonicity', data => {
        $params[id].harmonicity = data;
    });
    socket.on('params::' + id + '::modulationIndex', data => {
        $params[id].modulationIndex = data;
    });
    socket.on('params::' + id + '::resonance', data => {
        $params[id].resonance = data;
    });
    socket.on('params::' + id + '::octaves', data => {
        $params[id].octaves = data;
    });
    socket.on('params::' + id + '::order', data => {
        $params[id].order = data;
    });
    socket.on('params::' + id + '::attack', data => {
        $params[id].attack = data;
    });
    socket.on('params::' + id + '::decay', data => {
        $params[id].decay = data;
    });
    socket.on('params::' + id + '::release', data => {
        $params[id].release = data;
    });
</script>
