<script>
    import { browser } from '$app/env';
    import * as Tone from 'tone';
    import Play from "./Play.svelte";
    import Knob from "./Knob.svelte";
    import BoxButton from "./BoxButton.svelte";
    import Clock from "./Control/Clock.svelte";
    
    import patterns from '$lib/presets/velocity.json'
    import { 
        socket, play, states, clockMode, grid, mirrorPoint,
        velocity, length, offset, pitchOffset, bpm,
        clockMultiplierLookup,
        maxCells, userInteracted, params,
        velocityPattern
    } from '$lib/app.js'
    
    import { 
        mirrorWithPoint,
        invertGridVertical,
        clearGrid, randomiseGrid
    } from "$lib/grid/transforms.js";
    
    import { kick, snare, fm1, fm2, metal1, metal2 } from '$lib/instruments/ensemble.js';
    import { wrap } from '$lib/utility.js';
    
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
    function sendVelocityPattern() { socket.emit('velocityPattern', $velocityPattern) };
    
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
    $: selectedPattern = patterns[$velocityPattern];
    
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
                    $velocity * selectedPattern[0],
                    $length
                );
            } 
            
            if ($grid[SNARE][pos] === true) {
                snare.trigger(
                    time, 
                    $velocity * selectedPattern[0],
                    $length
                );
            }
            
            if ($grid[M1][pos] === true) {
                metal1.trigger(
                    time, 
                    $velocity * selectedPattern[0],
                    $length
                );
            }
            
            if ($grid[M2][pos] === true) {
                metal2.trigger(
                    time, 
                    $velocity * selectedPattern[0],
                    $length
                );
            }
            
            if ($grid[FM1][pos] === true) {
                fm1.trigger(
                    time, 
                    $velocity * selectedPattern[0]
                );
            }
            
            if ($grid[FM2][pos] === true) {
                fm2.trigger(
                    time, 
                    $velocity * selectedPattern[0]
                );
            }
            selectedPattern.rotate(1)
            
            prePos = pos;
            
            if ($clockMode === "forward") {
                internalPos += clockMultiplier
                internalPos = wrap(internalPos, $offset.start-1, $offset.end)
                pos = Math.floor(internalPos)
                
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
            pos = Math.floor(internalPos);
            
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
            pos = Math.floor(internalPos);
            pos = Math.min(Math.max(pos, $offset.start-1), $offset.end-1);
        }
    }, "16n").start(0);
}
</script>

<div id="all-controls">
    <div id='left-section'>
    </div>

    <div id='centre-section'>
        <div id='clock' class='control-column-container'>
            <span id='clock-title' class='container-title'>Clock</span>
            <div id='clock-top'>
                <Play bind:playing={$play} start={startLoop} pause={stopLoop}/>
                <Knob enabled={$states.bpm} title="Rate" resetValue={120} min={5} max={300} step={1} bind:value={$bpm} func={sendBpm} />
                <Knob enabled={$states.multiplier} resetValue={0} scale=0.4 title="Multiplier" min={0} max={22} step={1} bind:value={$clockMultiplierLookup} bind:altValue={clockMultiplier} func={sendMultiplier} />
            </div>
            <div id='clock-bottom'>
                <Clock bind:value={$clockMode}/>
                <Knob enabled={$states.offset} scale=0.125 title="Start" min={1} max={16} bind:value={$offset.start} func={sendOffset} />
                <Knob enabled={$states.offset} scale=0.125 title="End" min={1} max={16} bind:value={$offset.end} func={sendOffset} />
            </div>
        </div>
        
        <div id='grid-transforms' class='control-column-container'>
            <span class='container-title'>Transforms</span>
            <div id='max-cells'>
                <Knob enabled={$states.maxCells} resetValue={16} scale=0.25 title="Max Cells" min={1} max={32} step={1} bind:value={$maxCells} func={sendMaxCells} />
            </div>
            <div id='transform-functions'>
                <BoxButton func={ () => invertGridVertical(grid) } text="Flip V" />
                <BoxButton func={ () => randomiseGrid(grid) } text="Randomise" />
                <BoxButton func={ () => clearGrid(grid) } text="Clear" />
            </div>
        </div>
                    
        <div id='mirror' class='control-column-container'>
            <div></div>
            <div id='other-knobs'>
                <Knob 
                title="Mirror Point"
                enabled={$states.mirrorPoint} resetValue={8} 
                scale=0.125 min={1} max={15} 
                bind:value={$mirrorPoint} func={sendMirrorPoint} 
                />
                <Knob 
                title="Velocity"
                enabled={$states.globalVelocity} resetValue={1.0} 
                scale=0.01 min={0} max={1} step={0.01} 
                bind:value={$velocity} func={sendVelocity} 
                />
                <Knob 
                title="Pattern"
                enabled={$states.velocityPattern} resetValue={0.0} 
                scale=0.25 min={1} max={24} step={1} 
                bind:value={$velocityPattern} func={sendVelocityPattern} 
                />
            </div>
            <BoxButton func={ () => mirrorWithPoint(grid, $mirrorPoint) } text="Mirror H" />
        </div>
    </div>

    <div id='right-section' class='control-column-container'>
        <div />
        <div id='global-parameters'>
            <Knob
            enabled={$states.pitchOffset} 
            resetValue={0} 
            title="Pitch Offset" 
            min={-48} max={48} step={1} 
            bind:value={$pitchOffset} 
            func={sendPitchOffset} 
            />
            <Knob 
            enabled={$states.globalLength} 
            scale=0.005 
            resetValue={1.0} 
            title="Shape Scale" 
            min={0.05} max={1} step={0.01} 
            bind:value={$length} 
            func={sendLength} 
            />
        </div>
        <div></div>
    </div>
</div>

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