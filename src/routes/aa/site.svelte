<script>
    import * as Tone from 'tone';
    import { writable } from 'svelte/store';
    import MultiSlider from '$lib/aa/MultiSlider.svelte';
    import { 
        duration_loop, 
        subdiv_loop, 
        tala, ptn, 
        time1, time2, 
        subdiv_ratio, duration_interval,
        base_speed
    } from '$lib/aa/loop';

    const bpm = writable(120);
    $: if (Tone.Transport.bpm) {
        Tone.Transport.bpm.rampTo($bpm, 0.1);
    }
    let beepees = 1;



    // $: if (duration_loop) duration_loop.interval = $duration_interval
    // $: subdiv_interval = $duration_interval / $subdiv_ratio;
    // $: if (subdiv_loop) subdiv_loop.interval = subdiv_interval
</script>


<!-- <MultiSlider /> -->
{ $duration_interval }

{ $base_speed }

{ beepees }
<!-- { $subdiv_interval } -->

<!-- <input 
type="range" 
min={0.01} max={0.05} step={0.001}
bind:value={beepees}
on:input={ () => {
    $bpm = beepees
}}
> -->
<div class='container'>

<input 
type="range" 
min={0.1} max={0.2} step={0.0001}
bind:value={$base_speed}
>

<input 
type="range" 
min={5} max={200} step={1}
bind:value={$bpm}
>

<button on:click={ () => { $base_speed =1 }}>1</button>
<button on:click={ () => { $base_speed =0.5 }}>0.5</button>


<button on:click={ () => {
    Tone.start();
    Tone.Transport.start(0);
    duration_loop.start(0); 
    subdiv_loop.start(0);
}}>start</button>

<button on:click={ () => { tala.pattern = [5, 2, 3]} }>change pattern</button>
</div>

<p>
    {$ptn}
</p>

<style>
    .container {
        display: flex;
        flex-direction: column;
        max-width: 30%;
        margin: 0 auto;
    }
</style>
