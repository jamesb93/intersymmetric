<script>
    import * as Tone from 'tone';
    import { browser } from '$app/env';
    import { Pattern } from '$lib/components/test/pattern';
    import { kick, snare, fm1, fm2, metal1, metal2 } from '$lib/instruments/ensemble';
    import { socket, bpm, params } from '$lib/app';
    import { Kick, Snare, Metal, FM} from '$lib/components/Control/controllers';
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
        // Tone.Transport.start("+0.15");
        // if (loop) {
        //     loop.start();
        // }
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
            kick.trigger(now, 1.0, 1.0);
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
            metal1.trigger(now, 1.0, 4);
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
            fm1.trigger(now, 1.0);
        }
        else if (instrument === 'snare') {

        }
    })
    
    if (browser) {
        loop = new Tone.Loop(time => {
            counter += 1;

            kick.distortion.distortion = patterns.kick.distortion.next(counter);
            kick.membrane.frequency.value = patterns.kick.frequency.next(counter);


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
<button on:click={ () => { kick.trigger(Tone.now(), 1.0, 1.0) }}></button>
<button on:click={ init }>
    start audio + looping
</button>

{#if browser}
<Kick />
<Metal id={'metal1'} instrument={metal1}/>
<FM id={'fm1'} instrument={fm1} />
{/if}