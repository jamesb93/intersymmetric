<script>
    import { socket, params, length, pitchOffset } from "../stores.js";
    import ASlider from "../ASlider.svelte";
    import VelocityList from "../VelocityList.svelte";
    import ControlTitle from "./ControlTitle.svelte";
    import ControlContainer from "./ControlContainer.svelte";
    import Presets from "./Presets.svelte";
    import { freqMap } from "../utility.js";

    export let instrument;  
    export let id;

    $: instrument.fund.rampTo($params[id].frequency * freqMap($pitchOffset), 0.1);
    $: instrument.c1ratio.rampTo($params[id].c1ratio, 0.1);
    $: instrument.c2ratio.rampTo($params[id].c2ratio, 0.1)
    $: instrument.c3ratio.rampTo($params[id].c3ratio, 0.1)
    $: instrument.fm2to1.factor.rampTo($params[id].fm2to1, 0.1)
    $: instrument.fm3to2.factor.rampTo($params[id].fm3to2, 0.1)
    $: instrument.fm3to1.factor.rampTo($params[id].fm3to1, 0.1)
    $: instrument.c1env.release = $params[id].c1release * ($length)
    $: instrument.c2env.release = $params[id].c2release * ($length)
    $: instrument.c3env.release = $params[id].c3release * ($length)
    $: instrument.op1gain.gain.rampTo($params[id].op1gain * 0.33, 0.1);
    $: instrument.op2gain.gain.rampTo($params[id].op2gain * 0.33, 0.1);
    $: instrument.op3gain.gain.rampTo($params[id].op3gain * 0.33, 0.1);

    const uFrequency = () => {
        socket.emit('params::'+id, 'frequency', $params[id].frequency);
    };
    const uc1ratio = () => {
        socket.emit('params::'+id, 'c1ratio', $params[id].c1ratio);
    };
    const uc2ratio = () => {
        socket.emit('params::'+id, 'c2ratio', $params[id].c2ratio);
    };
    const uc3ratio = () => {
        socket.emit('params::'+id, 'c3ratio', $params[id].c3ratio);
    };
    const ufm2to1 = () => {
        socket.emit('params::'+id, 'fm2to1', $params[id].fm2to1);
    };
    const ufm3to2 = () => {
        socket.emit('params::'+id, 'fm3to2', $params[id].fm3to2);
    };
    const ufm3to1 = () => {
        socket.emit('params::'+id, 'fm3to1', $params[id].fm3to1);
    };
    const uc1env = () => {
        socket.emit('params::'+id, 'release', $params[id].c1release);
    };
    const uc2env = () => {
        socket.emit('params::'+id, 'release', $params[id].c2release);
    };
    const uc3env = () => {
        socket.emit('params::'+id, 'release', $params[id].release);
    };
    const uop1gain = () => {
        socket.emit('params::'+id, 'op1gain', $params[id].op1gain);
    };
    const uop2gain = () => {
        socket.emit('params::'+id, 'op2gain', $params[id].op2gain);
    };
    const uop3gain = () => {
        socket.emit('params::'+id, 'op3gain', $params[id].op3gain);
    };
    
    socket.on('params::'+id+'::frequency', data => $params[id].frequency = data);
    socket.on('params::'+id+'::c1ratio', data => $params[id].c1ratio = data);
    socket.on('params::'+id+'::c2ratio', data => $params[id].c2ratio = data);
    socket.on('params::'+id+'::c3ratio', data => $params[id].c3ratio = data);
    socket.on('params::'+id+'::fm2to1', data => $params[id].fm2to1 = data);
    socket.on('params::'+id+'::fm3to1', data => $params[id].fm3to1 = data);
    socket.on('params::'+id+'::fm3to2', data => $params[id].fm3to2 = data);
    socket.on('params::'+id+'::c1release', data => $params[id].c1release = data);
    socket.on('params::'+id+'::c2release', data => $params[id].c2release = data);
    socket.on('params::'+id+'::c3release', data => $params[id].c3release = data);
    socket.on('params::'+id+'::op1gain', data => $params[id].op1gain = data);
    socket.on('params::'+id+'::op2gain', data => $params[id].op2gain = data);
    socket.on('params::'+id+'::op3gain', data => $params[id].op3gain = data);
</script>

<ControlContainer>
    <ControlTitle title="3OP FM"/>
    <ASlider logScale={true} title="Frequency" min="1" max="100000" bind:value={$params[id].frequency} func={uFrequency} />
    <ASlider title="Ratio 1" min="0.0" max="1000" bind:value={$params[id].c1ratio} func={uc1ratio} />
    <ASlider title="Ratio 2" min="0.0" max="1000" bind:value={$params[id].c2ratio} func={uc2ratio} />
    <ASlider title="Ratio 3" min="0.0" max="1000" bind:value={$params[id].c3ratio} func={uc3ratio} />
    <ASlider title="FB 2to1" min="0" max="200000" bind:value={$params[id].fm2to1} func={ufm2to1} />
    <ASlider title="FB 3to1" min="0" max="200000" bind:value={$params[id].fm3to1} func={ufm3to1} />
    <ASlider title="FB 3to2" min="0" max="200000" bind:value={$params[id].fm3to2} func={ufm3to2} />
    <ASlider title="Envelope Length 1" min="0.01" max="5" bind:value={$params[id].c1release} func={uc1env} />
    <ASlider title="Envelope Length 2" min="0.01" max="5" bind:value={$params[id].c2release} func={uc2env} />
    <ASlider title="Envelope Length 3" min="0.01" max="5" bind:value={$params[id].c3release} func={uc3env} />
    <ASlider title="OP1 Gain" min="0" max="1" step="0.001" bind:value={$params[id].op1gain} func={uop1gain} />
    <ASlider title="OP2 Gain" min="0" max="1" step="0.001" bind:value={$params[id].op2gain} func={uop2gain} />
    <ASlider title="OP3 Gain" min="0" max="1" step="0.001" bind:value={$params[id].op3gain} func={uop3gain} />
    <VelocityList id={id} bind:value={$params[id].velocityList}/>
    <!-- <Presets bind:data={$params} key={id} /> -->
</ControlContainer>