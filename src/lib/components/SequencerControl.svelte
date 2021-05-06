<script>
    import { browser } from '$app/env';
    import * as Tone from 'tone';
    import Play from "./Play.svelte";
    import Knob from "./Knob.svelte";
    import BoxButton from "./BoxButton.svelte";
    import Clock from "./Control/Clock.svelte";
    
    import { 
        socket, play, states, clockMode, grid, mirrorPoint,
        velocity, length, offset, pitchOffset, bpm,
        clockMultiplierLookup,
        maxCells, userInteracted, params
    } from './stores.js'
    
    import { 
        mirrorWithPoint,
        invertGridVertical,
        clearGrid, randomiseGrid
    } from "$lib/grid/transforms.js";
    
    import { kick, snare, fm1, fm2, metal1, metal2 } from '$lib/instruments/ensemble.js';
    import { wrap } from './utility.js';
    
    const multiplierTable = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0.875,0.75,0.66,0.5,0.33,0.25,0.125,0];
    $: clockMultiplier = multiplierTable[$clockMultiplierLookup];
    
    // Sending Data Back to the Server
    function sendVelocity() { socket.emit('velocity', $velocity) };
    function sendLength() { socket.emit('length', $length) };
    function sendOffset() { socket.emit('clock::offset', $offset) };
    function sendBpm() { socket.emit('bpm', $bpm) };
    function sendMirrorPoint() { socket.emit('mirrorPoint', $mirrorPoint) };
    function sendMultiplier() { socket.emit('clock::multiplier', $clockMultiplierLookup) };
    function sendPitchOffset() { socket.emit('pitchOffset', $pitchOffset) };
    function sendMaxCells() { socket.emit('maxCells', $maxCells) };
    
    function updatePlayStatus(status) {
        play.set(status)
        if ($play === true) {
            Tone.start();
            Tone.Transport.start("+0.05");
            loop.start();
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

    
    // Declare indices here so you can easily swap the order.
    const FM1 = 4
    const FM2 = 5
    const M1 = 2
    const M2 = 3
    const SNARE = 1;
    const KICK = 0;
    
    let internalPos = 0;
    let clockDirection = 1;
    
    export let pos = 0;
    export let prePos = 0;
    
    let loop;
    
    if (browser) {
        loop = new Tone.Loop(time => {
            if ($grid[KICK][pos] === true) {
                kick.trigger(
                time, 
                $velocity * $params.kick.velocityList[0], 
                $length
                );
                $params.kick.velocityList.rotate(1);
            } 
            
            if ($grid[SNARE][pos] === true) {
                snare.trigger(
                time, 
                $velocity * $params.snare.velocityList[0],
                $length
                );
                $params.snare.velocityList.rotate(1);
            }
            
            if ($grid[M1][pos] === true) {
                metal1.trigger(
                time, 
                $velocity * $params.metal1.velocityList[0],
                $length
                );
                $params.metal1.velocityList.rotate(1);
            }
            
            if ($grid[M2][pos] === true) {
                metal2.trigger(
                time, 
                $velocity * $params.metal2.velocityList[0],
                $length
                );
                $params.metal2.velocityList.rotate(1);
            }
            
            if ($grid[FM1][pos] === true) {
                fm1.trigger(
                time, 
                $velocity * $params.fm1.velocityList[0]
                );
                $params.fm1.velocityList.rotate(1);
            }
            
            if ($grid[FM2][pos] === true) {
                fm2.trigger(
                time, 
                $velocity * $params.fm2.velocityList[0],
                );
                $params.fm2.velocityList.rotate(1);
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
                        <!-- <Knob enabled={$states.offset} scale=0.125 title="start" min={1} max={16} bind:value={$offset.start} func={sendOffset} /> -->
                        <!-- <Knob enabled={$states.offset} scale=0.125 title="end" min={1} max={16} bind:value={$offset.end} func={sendOffset} /> -->
                        <div class='control-row-top'>
                            <Knob enabled={$states.globalVelocity} resetValue={1.0} scale=0.01 title="Velocity" min={0} max={1} step={0.01} bind:value={$velocity} func={sendVelocity} />
                            <Knob enabled={$states.globalLength} resetValue={1.0} scale={0.1 * 0.04}  title="Shape Scale" min={0.01} max={2} step={0.01} bind:value={$length} func={sendLength} />
                        </div>
                        <div class='control-row-bottom'>
                            <Knob enabled={$states.maxCells} resetValue={16} scale=0.25 title="Max Cells" min={1} max={32} step={1} bind:value={$maxCells} func={sendMaxCells} />
                            <Knob enabled={$states.pitchOffset} resetValue={0} title="Pitch Offset" min={-48} max={48} step={1} bind:value={$pitchOffset} func={sendPitchOffset} />
                        </div>
                    </div>
                </div>
                
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