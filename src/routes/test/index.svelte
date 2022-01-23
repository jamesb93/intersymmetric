<script>
    import * as Tone from 'tone';
    import { onMount } from 'svelte';
    import { KickSynth } from '$lib/components/test/instruments/kick';
    import { MetalSynth } from '$lib/components/test/instruments/metal';
    import { FMSynth } from '$lib/components/test/instruments/fm';
    import { SnareSynth } from '$lib/components/test/instruments/snare';
    import { Poly } from '$lib/components/test/poly';
    import { socket, length } from '$lib/app';
    
    let error = '';
    let kick, fm, metal, snare;
    
    socket.emit('roomJoin', 'test');
    
    onMount(async() => {
        kick = new Poly(KickSynth, 2);
        fm = new Poly(FMSynth, 4);
        metal = new Poly(MetalSynth, 2);
        snare = new Poly(SnareSynth, 2);
        socket.on('send', (instrument, parameters) => {
        const now = Tone.now();
            if (instrument === 'kick' && kick) {
                kick.trigger(now, $length, parameters);
            } 
            else if (instrument === 'metal' && metal) {
                metal.trigger(now, $length, parameters);
            }
            else if (instrument === 'fm' && fm) {
                fm.trigger(now, null, parameters);
            }
            else if (instrument === 'snare' && snare) {
                snare.trigger(now, $length, parameters);
            }
        })
    })

    function init() {
        Tone.start();
    }
    
    function parseError(e) {
        error = e.message;
    }
</script>

<svelte:window on:error={ parseError } />

<button class='btn' on:click={ init }>
    start audio
</button>

{#if error !== ''}
<p class='error'>Error encountered, please refresh</p>
<p class='error-message'>{ error }</p>
{/if}

<style>
    .error {
        color:tomato
    }
    
    .error-message {
        font-size: 0.75rem;
    }
    
    .btn {
        font-family: monospace;
        font-size: 2rem;
        margin-top: 1em;
        border: 2px solid black;
        background: none;
        box-shadow: none;
        border-radius: 0px;
    }
    
    .btn:hover {
        background-color:darkolivegreen;
        color: white;
    }
    
    .btn:active {
        background-color:rgb(57, 71, 32);
    }
</style>