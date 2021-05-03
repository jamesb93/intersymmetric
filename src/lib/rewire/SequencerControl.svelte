<script>
    import { browser } from '$app/env';
    import * as Tone from 'tone';
    import Play from "$lib/components/Play.svelte";
    import Knob from "$lib/components/Knob.svelte";
    import BoxButton from "$lib/components/BoxButton.svelte";
    import Clock from "$lib/components/Control/Clock.svelte";

    import { Sampler } from '$lib/rewire/sampler.js';
    
    import { 
        socket, play, states, clockMode, grid, mirrorPoint,
        velocity, length, offset, pitchOffset, bpm,
        clockMultiplierLookup,
        maxCells, userInteracted, 
        sampleSelectors, playbackRate, sampleGains
    } from '$lib/components/stores.js'
    
    import { 
        mirrorWithPoint,
        invertGridVertical,
        clearGrid, randomiseGrid
    } from "$lib/grid/transforms.js";
    
    import { wrap } from '$lib/components/utility.js';
    
    const multiplierTable = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0.875,0.75,0.66,0.5,0.33,0.25,0.125,0];
    $: clockMultiplier = multiplierTable[$clockMultiplierLookup];
    
    let internalPos = 0;
    let clockDirection = 1;
    
    export let pos = 0;
    export let prePos = 0;
    
    // Sending Data Back to the Server
    function sendVelocity() { socket.emit('velocity', $velocity) };
    function sendLength() { socket.emit('length', $length) };
    function sendOffset() { socket.emit('clock::offset', $offset) };
    function sendBpm() { socket.emit('bpm', $bpm) };
    function sendMirrorPoint() { socket.emit('mirrorPoint', $mirrorPoint) };
    function sendMultiplier() { socket.emit('clock::multiplier', $clockMultiplierLookup) };
    function sendPitchOffset() { socket.emit('pitchOffset', $pitchOffset) };
    function sendMaxCells() { socket.emit('maxCells', $maxCells) };
    function sendPlaybackRate() { socket.emit('playbackRate', $playbackRate) };
    
    function updatePlayStatus(status) {
        play.set(status)
        if ($play === true) {
            Tone.start();
            Tone.Transport.start("+0.05");
            loop.start("0.1");
        } else if ($play === false) {
            Tone.Transport.stop();
            loop.stop();
        }
    }
    
    function startLoop() {
        userInteracted.set(true);
        updatePlayStatus(true)
        socket.emit('play', $play)
    }
    
    function stopLoop() {
        userInteracted.set(true);
        updatePlayStatus(false)
        socket.emit('play', $play)
    }
    
    socket.on('play', x => {
        if ($userInteracted) {
            updatePlayStatus(x)
        }
    })
    
    $: if ($offset.start > $offset.end) {
        let t = $offset.end
        $offset.end = $offset.start
        $offset.start = t
    }
    $: Tone.Transport.bpm.value = $bpm;
    
    let loop;

    const numSamples = 86;
    let buffers = [];
    let samplers = [];

    // $: loaded = buffers.length === numSamples;
    let loaded = false;
    let loadedCount = 0;
    
    if (browser) {
        // Load Sounds to Buffers (we'll reuse these everywhere)
        for (let i=0; i < numSamples; i ++) {
            const url = '/rewire_samples/compressed/' + i + '.mp3';
            const buf = new Tone.ToneAudioBuffer(url);
            buffers.push(buf);
        }

        Tone.loaded()
        .then(() => {
            for (let i = 0; i < 6; i++) {
                const x = new Sampler(buffers);
                samplers.push(x);
            }
            loaded = true;
        })
    }

    $: samplers.forEach(sampler => {
        sampler.envelope.release = $length;
    })

    $: samplers.forEach(sampler => {
        sampler.players.forEach(player => {
            player.playbackRate = $playbackRate;
        })
    })

    $: samplers.forEach((sampler, i) => {
        sampler.out.gain.rampTo($sampleGains[i]);
    })

    if (browser) {
        loop = new Tone.Loop(time => {
            if ($grid[0][pos] === true) {
                samplers[0].trigger(time, $sampleSelectors[0], $velocity, $length)
            }

            if ($grid[1][pos] === true) {
                samplers[1].trigger(time, $sampleSelectors[1], $velocity, $length)
                
            }
            if ($grid[2][pos] === true) {
                samplers[2].trigger(time, $sampleSelectors[2], $velocity, $length)
            }

            if ($grid[3][pos] === true) {
                samplers[3].trigger(time, $sampleSelectors[3], $velocity, $length)
            }

            if ($grid[4][pos] === true) {
                samplers[4].trigger(time, $sampleSelectors[4], $velocity, $length)
            }

            if ($grid[5][pos] === true) {
                samplers[5].trigger(time, $sampleSelectors[5], $velocity, $length)
            }
             
                
            prePos = pos;
            
            if ($clockMode === "forward") {
                internalPos += clockMultiplier
                internalPos = wrap(internalPos, $offset.start-1, $offset.end)
                pos = Math.round(internalPos)
                
            } else if ($clockMode === "rebound") {
                
                if (clockDirection === 1) { // if progressing forward
                    if (pos === $offset.end-1) {
                        clockDirection = 0 // change to backward
                    } 
                    else { // anywhere else
                        internalPos += clockMultiplier
                    }
                } 
                if (clockDirection === 0) { // if progressing backward
                    if (pos === $offset.start-1) { // if we're at the left boundary
                    internalPos += clockMultiplier
                    clockDirection = 1 // change to forward
                } 
                else {
                    internalPos -= clockMultiplier
                }   
            }
            internalPos = wrap(internalPos, $offset.start-1, $offset.end)
            pos = Math.round(internalPos);
            
        } else if ($clockMode === "wander") {
            if (pos === $offset.start-1) {
                internalPos += clockMultiplier
            } 
            else if (pos >= $offset.end-1) {
                internalPos  -= clockMultiplier
            } 
            else {
                if (Math.random() <= 0.5) {
                    internalPos += clockMultiplier
                } else {
                    internalPos -= clockMultiplier
                }
            }
            internalPos = wrap(internalPos, $offset.start-1, $offset.end);
            pos = Math.round(internalPos);
            pos = Math.min(Math.max(pos, $offset.start-1), $offset.end-1);
        }
    }, "16n").start(0);
}
    
    
    
</script>

{#if loaded === true}
<div id="all-controls">
    <div class='control-column-container'>
        <span class='container-title'>clock</span>
        
        <div class='control-row-top'>
            <Play bind:playing={$play} start={startLoop} pause={stopLoop}/>
            <Knob enabled={$states.bpm} title="Rate" resetValue={120} min={5} max={300} step={1} bind:value={$bpm} func={sendBpm} />
            <Knob enabled={$states.multiplier} resetValue={0} scale=0.4 title="Multiplier" min={0} max={22} step={1} bind:value={$clockMultiplierLookup} bind:altValue={clockMultiplier} func={sendMultiplier} />
        </div>
        <div class='control-row-bottom'>
            <Clock bind:value={$clockMode}/>
        </div>
    </div>
    
    <div id='grid-transforms' class='control-column-container'>
        <span class='container-title'>transforms</span>
        <BoxButton func={ () => invertGridVertical(grid) } text="Flip V" />
        <BoxButton func={ () => randomiseGrid(grid) } text="randomise" />
        <BoxButton func={ () => clearGrid(grid) } text="clear" />
    </div>
                
    <div id='mirror' class='control-column-container'>
        <div class='control-row-top'>
            <Knob enabled={$states.mirrorPoint} resetValue={8} scale=0.125 title="Mirror Point" min={0} max={15} bind:value={$mirrorPoint} func={sendMirrorPoint} />
        </div>
        <div class='control-row-bottom'>
            <BoxButton func={ () => mirrorWithPoint(grid, $mirrorPoint) } text="mirror H" />
        </div>
    </div>
                    
    <div id='other-knobs' class='control-column-container'>
        <div class='control-row-top'>
            <Knob enabled={$states.globalVelocity} resetValue={1.0} scale=0.01 title="Velocity" min={0} max={1} step={0.01} bind:value={$velocity} func={sendVelocity} />
            <Knob enabled={$states.globalLength} scale=0.008 resetValue={1.0} title="Shape Scale" min={0.05} max={5} step={0.01} bind:value={$length} func={sendLength} />
            <Knob enabled={$states.playbackRate} scale=0.1 resetValue={1} title="Playback Rate" min={0.1} max={8} step={0.01} bind:value={$playbackRate} func={sendPlaybackRate} />
        </div>
        <div class='control-row-bottom'>
            <Knob enabled={$states.offset} scale=0.125 title="start" min={1} max={16} bind:value={$offset.start} func={sendOffset} />
            <Knob enabled={$states.offset} scale=0.125 title="end" min={1} max={16} bind:value={$offset.end} func={sendOffset} />
            <Knob enabled={$states.maxCells} resetValue={16} scale=0.25 title="Max Cells" min={1} max={32} step={1} bind:value={$maxCells} func={sendMaxCells} />
        </div>
    </div>
</div>
{/if}
<style>
    
    #all-controls {
        display: grid;
        grid-template-columns: auto auto auto auto;
        padding-bottom: 30px;
        margin: 0 auto;
    }
    
    .control-row-top {
        display: flex;
        flex-direction: row;
        margin: 0 auto;
    }
    
    .control-row-bottom {
        display: flex;
        flex-direction: row;
        margin: 0 auto;
    }
    
    .control-column-container {
        display: grid;
        grid-template-rows: auto auto;
        gap: 15px;
        border-left: 1px dotted #59a245;
        border-right: 1px dotted #59a245;
        
        padding: 10px;
        align-items: center;
        margin: 0 auto;
    }
    
    .container-title {
        color: #59a245
    }
</style>