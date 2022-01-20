<script>
    import * as Tone from 'tone';
    import { Pattern } from '$lib/components/test/pattern';
    import { kick, snare, fm1, metal1 } from '$lib/instruments/ensemble';
    import { socket, bpm, params, length } from '$lib/app';

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
        console.log('received message')
        const now = Tone.now();
        if (instrument === 'kick' && kick) {
            kick.distortion.distortion = parameters[0];
            kick.membrane.frequency.value = parameters[1];
            kick.membrane.octaves = parameters[2];
            kick.membrane.envelope.attack = parameters[3];
            kick.membrane.envelope.decay = parameters[4];
            kick.membrane.envelope.sustain = parameters[5];
            kick.membrane.envelope.release = parameters[6];
            kick.trigger(now, parameters[7], $length);
        } 
        else if (instrument === 'metal' && metal1) {
            metal1.source.frequency.value = parameters[0];
            metal1.source.harmonicity = parameters[1];
            metal1.source.modulationIndex = parameters[2];
            metal1.source.resonance = parameters[3];
            metal1.source.octaves = parameters[4];
            metal1.source.order = parameters[5];
            metal1.source.envelope.attack = parameters[6];
            metal1.source.envelope.decay = parameters[7];
            metal1.source.envelope.release = parameters[8];
            metal1.trigger(now, parameters[9], $length);
        }
        else if (instrument === 'fm' && fm1) {
            fm1.fund.value = parameters[0];
            fm1.c1ratio.value = parameters[1];
            fm1.c2ratio.value = parameters[2];
            fm1.c3ratio.value = parameters[3];
            fm1.fm2to1.factor.value = parameters[4];
            fm1.fm3to1.factor.value = parameters[5];
            fm1.fm3to2.factor.value = parameters[6];
            fm1.c1env.release = parameters[7];
            fm1.c2env.release = parameters[8];
            fm1.c3env.release = parameters[9];
            fm1.op1gain.gain.value = parameters[10];
            fm1.op2gain.gain.value = parameters[11];
            fm1.op3gain.gain.value = parameters[12];
            fm1.trigger(now, parameters[13]);
        }
        else if (instrument === 'snare' && snare) {
            snare.filter.frequency.value = parameters[0];
            snare.env.attack = parameters[1];
            snare.env.decay = parameters[2];
            snare.env.release = parameters[3];
            snare.env.sustain = parameters[4];
            snare.waveshaper.order = parameters[5];
            snare.membrane.frequency.value = parameters[6];
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