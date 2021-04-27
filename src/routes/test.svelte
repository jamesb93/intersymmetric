<script>
    import * as Tone from 'tone';
    import { Env } from '../instruments/envelope.js'

    let meterV;

    let attack = 0.000;
    let release = 2.0;
    let env = new Env(attack, release);
    env.env.toDestination();
    const source = new Tone.Oscillator(220, 'sine').connect(env.out).start();
    setInterval(() => {meterV = env.meter.getValue()}, 10)
    function func() {
        const time = Tone.Time().toSeconds();
        env.trigger(time, 1.0);
    }
</script>
<div>
    {meterV}
    <button on:click={func}>bang</button>
    <input type="range" bind:value={meterV} min=0.0 max=1.0 step=0.0001 />
    <input type="range" bind:value={env.attack} min=0.0 max=0.25 step=0.001 /> {attack}
    <input type="range" bind:value={env.release} min=0.0001 max=10 step=0.001 /> {release}
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        width: 10%;
        margin: 0 auto;
        gap: 20px;
        padding-top: 20px;
    }
</style>

