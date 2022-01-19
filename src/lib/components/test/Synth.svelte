<script>
    import * as Tone from 'tone';
    import { browser } from '$app/env';
    import { wrap } from '$lib/utility';
    import { kick, snare, fm1, fm2, metal1, metal2 } from '$lib/instruments/ensemble';
    import { socket, bpm, params  } from '$lib/app';
    import Kick from '$lib/components/Control/Kick.svelte';
    // Declare indices here so you can easily swap the order.
    const KICK = 0;
    const SNARE = 1;
    const M1 = 2
    const M2 = 3
    const FM1 = 4
    const FM2 = 5

    socket.emit('roomJoin', 'test');

    let toggle = new Array(6).fill(0);
    toggle[0] = 1;
    
    let loop;
    let velocity = 1.0;
    let length = 0.1;
    let counter = 0;

    $: {
        if (Tone.Transport.bpm) {
            Tone.Transport.bpm.value = $bpm
        }
    }

    function init() {
        Tone.start();
        Tone.Transport.start("+0.15");
        if (loop) {
            loop.start();
        }
    }

    class Pattern {
        constructor(pattern) {
            this.pattern = pattern;
        }

        value(count) {
            const index = wrap(count, 0, this.pattern.length);
            return this.pattern[index]
        }
    }

    let patterns = {
        kick : {
            distortion : new Pattern([1.0]),
            frequency: new Pattern([40])
        }
    }

    socket.on('pattern', (instrument, parameter, data) => {
        patterns[instrument][parameter].pattern = data;
    })
    
    if (browser) {
        Tone.context.lookAhead = 0.2;
        loop = new Tone.Loop(time => {
            counter += 1;
            kick.distortion.distortion = patterns.kick.distortion.value(counter);
            kick.membrane.frequency.value = patterns.kick.frequency.value(counter);


            if (toggle[KICK]) {
                kick.trigger(time, velocity, length);
            } 
            
            if (toggle[SNARE]) {
                snare.trigger(time, velocity, length);
            }
            
            if (toggle[M1]) {
                metal1.trigger(time, velocity, length);
            }
            
            if (toggle[M2]) {
                metal2.trigger(time, velocity, length);
            }
            
            if (toggle[FM1]) {
                fm1.trigger(time, velocity);
            }
            
            if (toggle[FM2]) {
                fm2.trigger(time, velocity);
            }
    }, "16n").start(0);
}
</script>

<button on:click={ init }>
    start audio + looping
</button>

{#if browser}<Kick />{/if}

{counter}
<p>
    {$params.kick.distortion}
</p>

<style>
    :root {
        --button-gap: 2px;
        --pad: 30px;
    }
    
    #all-controls {
        display: grid;
        grid-template-columns: 100px auto 200px;
        padding-top: 10px;
    }

    #clock {
        min-width: 250px;
        max-width: 250px;
    }

    #clock-title {
        padding-left: 10px;
    }

    #grid-transforms {
        min-width: 80px;
        max-width: 80px;
    }

    #centre-section {
        display: flex;
        flex-direction: row;
    }
    
    .control-column-container {
        display: grid;
        grid-template-rows: 30px 85px 100px;
        border-left: 1px dashed #40ac47;
        padding-left: var(--pad);
        padding-right: var(--pad);
    }
    
    .container-title {
        color: #40ac47;
        font-size: 10px;
    }

    #clock-top, #clock-bottom {
        display: grid;
        grid-template-columns: 1.1fr 0.9fr 1fr;
    }

    #transform-functions {
        display: flex;
        flex-direction: column;
        gap: var(--button-gap)
    }

    #max-cells {
        margin: 0 auto;
    }

    #global-parameters {
        display: flex;
        flex-direction: row;
        gap: 20px;
        height: 100%;
        padding-left: 4px;
    }

    #other-knobs {
        display: flex;
        flex-direction: row;
    }

</style>