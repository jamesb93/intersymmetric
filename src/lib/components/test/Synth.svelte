<script>
    import * as Tone from 'tone';
    import { browser } from '$app/env';
    import { Pattern } from '$lib/components/test/pattern';
    import { kick, snare, fm1, fm2, metal1, metal2 } from '$lib/instruments/ensemble';
    import { socket, bpm, params, length } from '$lib/app';
    import { Kick, Snare, Metal, FM} from '$lib/components/Control/controllers';

    let error = '';

    socket.emit('roomJoin', 'test');

    $: {
        if (Tone.Transport.bpm) {
            Tone.Transport.bpm.value = $bpm
        }
    }

    function init() {
        Tone.start();
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

    socket.on('send', (instrument, parameters) => {
        const now = Tone.now();
        if (instrument === 'kick' && kick) {
            $params.kick.distortion = parameters[0];
            $params.kick.frequency = parameters[1];
            $params.kick.octaves = parameters[2];
            $params.kick.attack = parameters[3];
            $params.kick.decay = parameters[4];
            $params.kick.sustain = parameters[5];
            $params.kick.release = parameters[6];
            kick.trigger(now, parameters[7], $length);
        } 
        else if (instrument === 'metal' && metal1) {
            $params.metal1.frequency = parameters[0];
            $params.metal1.harmonicity = parameters[1];
            $params.metal1.modulationIndex = parameters[2];
            $params.metal1.resonance = parameters[3];
            $params.metal1.octaves = parameters[4];
            $params.metal1.order = parameters[5];
            $params.metal1.attack = parameters[6];
            $params.metal1.decay = parameters[7];
            $params.metal1.release = parameters[8];
            metal1.trigger(now, parameters[9], $length);
        }
        else if (instrument === 'fm' && fm1) {
            $params.fm1.frequency = parameters[0];
            $params.fm1.c1ratio = parameters[1];
            $params.fm1.c2ratio = parameters[2];
            $params.fm1.c3ratio = parameters[3];
            $params.fm1.fm2to1 = parameters[4];
            $params.fm1.fm3to1 = parameters[5];
            $params.fm1.fm3to2 = parameters[6];
            $params.fm1.c1release = parameters[7];
            $params.fm1.c2release = parameters[8];
            $params.fm1.c3release = parameters[9];
            $params.fm1.op1gain = parameters[10];
            $params.fm1.op2gain = parameters[11];
            $params.fm1.op3gain = parameters[12];
            fm1.trigger(now, parameters[13]);
        }
        else if (instrument === 'snare' && snare) {
            $params.snare.frequency = parameters[0];
            $params.snare.attack = parameters[1];
            $params.snare.decay = parameters[2];
            $params.snare.sustain = parameters[3];
            $params.snare.release = parameters[4];
            $params.snare.order = parameters[5];
            $params.snare.membraneFreq = parameters[6];
            snare.trigger(now, parameters[7], $length);
        }
    })

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

{#if browser}
<Kick />
<Snare />
<Metal id={'metal1'} instrument={metal1}/>
<FM id={'fm1'} instrument={fm1} />
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