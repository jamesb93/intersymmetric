<script>
    import * as Tone from 'tone';
    import MultiSlider from '$lib/aa/MultiSlider.svelte';
    import { main_loop, sub_loop, tala, ptn, time1, time2 } from '$lib/aa/loop';

    let bpm = 900;
    let mainLoopInterval = 1;
    let subLoopRatio = 2;

    $: subLoopInterval = mainLoopInterval / subLoopRatio;
    $: if (sub_loop) sub_loop.interval = subLoopInterval;
    $: if (main_loop) main_loop.interval = mainLoopInterval;
</script>


<!-- <MultiSlider /> -->
{bpm}
<input type="range" min={5} max={50000} step={1} bind:value={bpm} on:input={ () => { Tone.Transport.bpm.value = bpm }}>

<button on:click={ () => {
    Tone.start();
    Tone.Transport.start();
    main_loop.start(0); 
    sub_loop.start(0);
}}>start</button>

<button on:click={ () => { subLoopRatio = 2} }>2</button>
<button on:click={ () => { subLoopRatio = 3} }>3</button>
<button on:click={ () => { subLoopRatio = 4} }>4</button>
<button on:click={ () => { tala.pattern = [5, 2, 3]} }>change pattern</button>

{#if sub_loop}
{ sub_loop.interval }
{/if}

<p>
    { $time1.toFixed(2) }
</p>

<p>
    { $time2.toFixed(2) }
</p>

<p>
    {$ptn}
</p>
