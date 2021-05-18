<script>
    import Cell from "./Cell.svelte";
    import Knob from "./Knob.svelte";
    import Arrow from './Arrow.svelte';
    
    import { shiftColumnDown, shiftColumnUp, rotateGridColumn } from '$lib/grid/transforms.js';
    import { 
        socket, states, grid, gridValid, euclidSteps,
        trackPitch, trackSound, trackShape,
        params
    } from './stores.js';
    import { getPattern } from "./euclid.js";

    export let prePos = 0;
    let anyMouseDown = false;
    let cellSnapshot;

    function sendGrid() { socket.emit('grid', $grid) };
    function sendEuclid(idx) {
        $grid[idx] = getPattern($euclidSteps[idx], 16);
        socket.emit('euclid', $euclidSteps);
        sendGrid();
    }

    // 0. Make the JSON files
    // 1. Import the rest of the JSON files 
    // 2. Automatically select the right one depending on which knob was turned
    // 3. Check for any threading wackiness. Can you share this function around?
    import kickPreset from '$lib/presets/kick.json'
    import snarePreset from '$lib/presets/snare.json';
    import metal1Preset from '$lib/presets/metal1.json';
    import metal2Preset from '$lib/presets/metal2.json';
    import fm1Preset from '$lib/presets/fm1.json';
    import fm2Preset from '$lib/presets/fm2.json';


    import { interpolateObject } from 'd3';

    let instrumentMap = [
        'kick','snare',
        'metal1','metal2',
        'fm1','fm2'
    ]

    socket.on('trackSound', x => {
        trackSound.set(x);
        $trackSound.forEach((_, i) => {
            updateSound(i)
        })
    });

    function updateSound(x) {
        let presets;
        if (x === 0)
            presets = kickPreset
        if (x === 1)
            presets = snarePreset
        if (x === 2)
            presets = metal1Preset
        if (x === 3)
            presets = metal2Preset
        if (x === 4)
            presets = fm1Preset
        if (x === 5)
            presets = fm2Preset

        let numPresets = Object.keys(presets).length;
        let preset1 = Math.floor($trackSound[x] * numPresets);
        preset1 = Math.min(preset1, numPresets-2)
        let preset2 = preset1 + 1
        let amount = (Math.min($trackSound[x], 0.99999999) * numPresets-1) % 1.0;
         
		let result = interpolateObject(
			presets[preset1], 
            presets[preset2]
		)(amount)
        for (const [key, value] of Object.entries(result)) {
            $params[instrumentMap[x]][key] = value
        }
    }


</script>

<svelte:window on:mouseup={()=>{anyMouseDown=false}} />

<div class="sequencer">
    <div class="euclids">
        <span class="knob-category">Pattern</span>
        {#each {length: 6} as _, x}
            <Knob WIDTH={50} HEIGHT={50} 
            enabled={states.euclid} 
            scale=0.2 
            title="Pattern"
            showTitle={false}
            min={0} max={16} 
            bind:value={ $euclidSteps[x] } 
            func={ () => sendEuclid(x) } 
            />
        {/each}
    </div>
    <div class="grid">
    {#if $gridValid}
        {#each $grid as row, x}
            <div class="cell-container">
                {#if x === 0}
                    {#each row as _, y}
                        <Arrow direction="up" func={ () => {shiftColumnUp(grid, y)} } />
                    {/each}
                {/if}
            </div>
            <div class="cell-container">
                <Arrow direction="left" func={ () => rotateGridColumn(grid, 1, x) } />
                {#each row as _, y}
                    <Cell
                    bind:cellSnapshot={cellSnapshot}
                    bind:anyMouseDown={anyMouseDown}
                    func={sendGrid}
                    emph={prePos === y}
                    x={x}
                    y={y}
                    />
                {/each}
                <Arrow direction="right" func={ () => rotateGridColumn(grid, -1, x) } />
            </div>
            <div class="cell-container">
                {#if x === $grid.length-1}
                    {#each row as _, y}
                        <Arrow 
                        direction="down" 
                        func={ () => {shiftColumnDown(grid, y)} } 
                        />
                    {/each}
                {/if}
            </div>
        {/each}
    {/if}
    </div>

    <div class="euclids">
        <span class="knob-category">Pitch</span>
        {#each {length: 6} as _, x}
            <Knob WIDTH={50} HEIGHT={50} 
            enabled={true}
            title="Pitch"
            showTitle={false}
            resetValue={0.0}
            scale=0.1
            step=1 min={-24} max={24} 
            bind:value={ $trackPitch[x] } 
            func={ () => socket.emit('trackPitch', $trackPitch) } 
            />
        {/each}
    </div>

    <div class="euclids">
        <span class="knob-category">Sound</span>
        {#each {length: 6} as _, x}
            <Knob WIDTH={50} HEIGHT={50} 
            enabled={true}
            title="Sound"
            showTitle={false}
            scale=0.01 min={0} max={1}
            step={0.001}
            bind:value={ $trackSound[x] } 
            func={ () => {updateSound(x); socket.emit('trackSound', $trackSound)} } 
            />
        {/each}
    </div>

    <div class="euclids">
        <span class="knob-category">Shape</span>
        {#each {length: 6} as _, x}
            <Knob WIDTH={50} HEIGHT={50} 
            enabled={true}
            scale=0.05
            title="Shape"
            showTitle={false}
            resetValue={1.0}
            step=0.01 min={0.0} max={1.0} 
            bind:value={ $trackShape[x] } 
            func={ () => socket.emit('trackShape', $trackShape) } 
            />
        {/each}
    </div>
</div>

<style>
    .sequencer {
        display: grid;
        grid-template-columns: repeat(5, auto);
    }

    .euclids {
        display: grid;
        grid-template-rows: repeat(8, 50px);
        grid-template-columns: auto;
        align-items: center;
    }
    .grid {
        display: grid;
        grid-template-rows: repeat(8, auto);
        grid-template-columns: auto;
        align-items: center;
        align-self: center;
    }

    .cell-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .knob-category {
        font-size: 10px;
    }
</style>