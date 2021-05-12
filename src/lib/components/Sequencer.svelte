<script>
    import Cell from "./Cell.svelte";
    import Knob from "./Knob.svelte";
    import Arrow from './Arrow.svelte';
    
    import { shiftColumnDown, shiftColumnUp, rotateGridColumn } from '$lib/grid/transforms.js';
    import { 
        socket, states, grid, gridValid, euclidSteps,
        trackPitch, trackSound, trackShape 
    
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
            scale=0.1 min={0} max={1} 
            bind:value={ $trackSound[x] } 
            func={ () => socket.emit('trackSound', $trackSound) } 
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
        justify-content: center;
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