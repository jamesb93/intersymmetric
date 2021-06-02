<script>
    import { 
        socket, 
        params, 
        length, 
        pitchOffset, 
        trackPitch, trackShape 
    } from "../stores.js";
    import ASlider from "../ASlider.svelte";
    import VelocityList from "../VelocityList.svelte";
    import ControlTitle from "./ControlTitle.svelte";
    import ControlContainer from "./ControlContainer.svelte";
    import { kick } from '$lib/instruments/ensemble.js';
    import { freqMap, clip } from "$lib/components/utility.js";

    export let hide = false;

    $: kick.membrane.octaves = Math.max($params.kick.octaves, 0);
    $: {
        let calculatedFreq = Math.max(
            0, 
            $params.kick.frequency * freqMap($pitchOffset + $trackPitch[0])
        );
        if ( !Number.isNaN(calculatedFreq) && Math.sign(calculatedFreq) === 1) {
            kick.membrane.frequency.rampTo(calculatedFreq, 0.1)
        }
    }
    $: kick.membrane.envelope.attack = Math.max(
        $params.kick.attack * $length * Math.max($trackShape[0], 0.1), 
        0
        );
    $: kick.membrane.envelope.sustain = clip($params.kick.sustain, 0.0, 1.0);

    $: kick.membrane.envelope.decay = Math.max(
        $params.kick.decay * $length * Math.max($trackShape[0], 0.1), 0
        );
    $: kick.membrane.envelope.release = Math.max(
        $params.kick.release * $length * Math.max($trackShape[0], 0.1), 
        0
        );
    $: kick.distortion.distortion = clip($params.kick.distortion, 0.0, 1.0);

    const uFrequency = () => {
        socket.emit('params::kick', 'frequency', $params.kick.frequency);
    };

    const uOctaves = () => {
        socket.emit('params::kick', 'octaves', $params.kick.octaves)
    }

    const uAttack  = () => {
        socket.emit('params::kick', 'attack', $params.kick.attack);
    };

    const uDecay   = () => {
        socket.emit('params::kick', 'decay', $params.kick.decay);
    };

    const uRelease = () => {
        socket.emit('params::kick', 'release', $params.kick.release);
    };
    const uSustain = () => {
        socket.emit('params::kick', 'sustain', $params.kick.sustain);
    };

    const uDistortion = () => {
        socket.emit('params::kick', 'distortion', $params.kick.distortion);
    }
    
    socket.on('params::kick::distortion', (data) => {$params.kick.distortion = data});
    socket.on('params::kick::frequency', (data) => {$params.kick.frequency = data});
    socket.on('params::kick::octaves', (data) => {$params.kick.octaves = data});
    socket.on('params::kick::attack', (data) => {$params.kick.attack = data});
    socket.on('params::kick::decay', (data) => {$params.kick.decay = data});
    socket.on('params::kick::release', (data) => {$params.kick.release = data});
    socket.on('params::kick::sustain', (data) => {$params.kick.sustain = data});
</script>

<ControlContainer hide={ hide }>
    <ControlTitle title="Kick Synth"/>
    <ASlider logScale={true} title="Frequency" min="35" max="90" bind:value={$params.kick.frequency} func={uFrequency} />
    <ASlider title="Octaves" min="0.5" max="8" step="0.5" bind:value={$params.kick.octaves} func={uOctaves}/>
    <ASlider title="Attack" min="0.0" max="0.1" step="0.001" bind:value={$params.kick.attack} func={uAttack} />
    <ASlider title="Decay" min="0.0" max="1.0" step="0.05" bind:value={$params.kick.decay} func={uDecay} />
    <ASlider title="Sustain" min="0.0" max="1.0" step="0.05" bind:value={$params.kick.sustain} func={uSustain} />
    <ASlider title="Release" min="0.0" max="1.4" step="0.05" bind:value={$params.kick.release} func={uRelease} />
    <ASlider title="Distortion" min="0.0" max="1.0" step="0.01" bind:value={$params.kick.distortion} func={uDistortion} />
    <VelocityList id="kick" bind:value={$params.kick.velocityList}/>
</ControlContainer>