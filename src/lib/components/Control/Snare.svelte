<script>
    import { 
        socket, 
        params, 
        length, 
        pitchOffset, 
        trackPitch, trackShape,
    } from "$lib/components/stores.js";
    import { clip } from '$lib/components/utility.js';
    import { snare } from "$lib/instruments/ensemble.js";
    import ASlider from "../ASlider.svelte";
    import VelocityList from "../VelocityList.svelte";
    import ControlTitle from "./ControlTitle.svelte";
    import ControlContainer from "./ControlContainer.svelte";
    import { freqMap } from "../utility.js";

    export let hide = false;

    $: snare.filter.frequency.rampTo(
        $params.snare.frequency * freqMap($pitchOffset + $trackPitch[1]), 0.1
    );
    $: snare.env.attack = $params.snare.attack * $length * $trackShape[1];
    $: snare.env.decay = $params.snare.decay * $length * $trackShape[1];
    $: snare.env.release = $params.snare.release * $length * $trackShape[1];
    $: snare.env.sustain = $params.snare.sustain
    $: snare.membrane.frequency.rampTo($params.snare.membraneFreq * freqMap($pitchOffset), 0.1)
    $: snare.waveshaper.order = clip(Math.round($params.snare.order), 1, 100);

    const uFrequency = () => {
        socket.emit('params::snare', 'frequency', $params.snare.frequency);
    };

    const uAttack = () => {
        socket.emit('params::snare', 'attack', $params.snare.attack);
    }

    const uDecay = () => {
        socket.emit('params::snare', 'decay', $params.snare.decay);
    }

    const uSustain = () => {
        socket.emit('params::snare', 'sustain', $params.snare.sustain);
    }

    const uRelease = () => {
        socket.emit('params::snare', 'release', $params.snare.release);
    }

    const uMembraneFreq = () => {
        socket.emit('params::snare', 'membraneFreq', $params.snare.membraneFreq);
    }

    const uOrder = () => {
        socket.emit('params::snare', 'order', $params.snare.order)
    }

    socket.on('params::snare::attack', data => $params.snare.attack = data);
    socket.on('params::snare::decay', data => $params.snare.decay = data);
    socket.on('params::snare::sustain', data => $params.snare.sustain = data);
    socket.on('params::snare::release', data => $params.snare.release = data);
    socket.on('params::snare::order', data => $params.snare.order = data);
    socket.on('params::snare::membraneFreq', data => $params.snare.membraneFreq = data);
    socket.on('params::snare::frequency', data => $params.snare.frequency = data);
</script>

<ControlContainer hide={ hide }>
    <ControlTitle title="Snare"/>
    <ASlider logScale={true} min="300" max="5000" step="1" title="filter freq" bind:value={$params.snare.frequency} func={uFrequency} />
    <ASlider min="0.001" max="1.0" step="0.001" title="attack" bind:value={$params.snare.attack} func={uAttack} />
    <ASlider min="0.001" max="1.0" step="0.001" title="decay" bind:value={$params.snare.decay} func={uDecay} />
    <ASlider min="0.001" max="1.0" step="0.001" title="sustain" bind:value={$params.snare.sustain} func={uSustain} />
    <ASlider min="0.001" max="1.0" step="0.001" title="release" bind:value={$params.snare.release} func={uRelease} />    
    <ASlider logScale={true} min="30" max="15000" step="1" title="membrane frequency" bind:value={$params.snare.membraneFreq} func={uMembraneFreq} />
    <ASlider min="1" max="50" step="1" title="waveshaping" bind:value={$params.snare.order} func={uOrder} />
    <VelocityList id="snare" bind:value={$params.snare.velocityList}/>
    <!-- <Presets bind:data={$params} key={'snare'} /> -->
</ControlContainer>