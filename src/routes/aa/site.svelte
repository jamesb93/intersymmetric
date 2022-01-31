<script>
    import * as Tone from 'tone';
    import { onMount } from 'svelte';
    import { Tala } from '$lib/aa/tala';
    import MultiSlider from '$lib/aa/MultiSlider.svelte';

    const tala = new Tala([2, 3, 4]);
    let ptn = "";

    let bpm = 120;
    let mainLoop, subLoop;
    let mainLoopInterval = 1;
    let subLoopRatio = 2;
    $: subLoopInterval = mainLoopInterval / subLoopRatio;
    $: if (subLoop) subLoop.interval = subLoopInterval;
    $: if (mainLoop) mainLoop.interval = mainLoopInterval;
    $: if (Tone.Transport.bpm.value) Tone.Transport.bpm.value = bpm;

    let time1 =0, 
        time2 =0;

    onMount(async() => {
        mainLoop = new Tone.Loop(time => {
            time1 = time;
            ptn = tala.next();
        }, 1)

        subLoop = new Tone.Loop(time => {
            time2 = time;
        }, 0.25)

    })
</script>
<MultiSlider />
{bpm}
<input type="range" min={5} max={9000} step={1} bind:value={bpm}>

<button on:click={ () => {
    Tone.start();
    Tone.Transport.start();
    mainLoop.start(0); subLoop.start(0);
}}>start</button>

<button on:click={ () => { subLoopRatio = 2} }>2</button>
<button on:click={ () => { subLoopRatio = 3} }>3</button>
<button on:click={ () => { subLoopRatio = 4} }>4</button>
<button on:click={ () => { tala.pattern = [5, 2, 3]} }>change pattern</button>

{#if subLoop}
{ subLoop.interval }
{/if}
<p>
    {time1.toFixed(2)}
</p>

<p>
    {time2.toFixed(2)}
</p>

<p>
    {ptn}
</p>
