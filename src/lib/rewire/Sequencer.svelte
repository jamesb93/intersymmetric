<script>
    import Cell from "$lib/components/Cell.svelte";
    import Knob from "$lib/components/Knob.svelte";
    import Arrow from '$lib/components/Arrow.svelte';
    
    import { shiftColumnDown, shiftColumnUp, rotateGridColumn } from '$lib/grid/transforms.js';
    import { 
        socket, states, grid, gridValid, euclidSteps, 
        sampleSelectors, trackRates, trackLengths, recentSample
    } from '$lib/components/stores.js';
    import { getPattern } from "$lib/components/euclid.js";

    export let prePos = 0;
    let anyMouseDown = false;
    let cellSnapshot;

    function sendGrid() { socket.emit('grid', $grid) };
    function sendEuclid(idx) {
        $grid[idx] = getPattern($euclidSteps[idx], 16);
        socket.emit('euclid', $euclidSteps);
        sendGrid();
    }

    function updateSample(x) {
        socket.emit('sampleSelectors', $sampleSelectors)
    }

</script>

<svelte:window on:mouseup={()=>{anyMouseDown=false}} />

<div class="sequencer">
    <div class="euclids">
        <span class="knob-category">pattern</span>
        {#each {length: 6} as _, x}
            <Knob WIDTH={50} HEIGHT={50} 
            enabled={states.euclid} 
            scale=0.2 
            title="pattern"
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
    <div class="euclids" id="sample">
        <span class="knob-category">sample</span>
        {#each {length: 6} as _, x}
            <Knob WIDTH={50} HEIGHT={50} 
            enabled={true}
            title="sample"
            showTitle={false}
            scale=0.1 min={0} max={118} 
            bind:value={ $sampleSelectors[x] } 
            func={ () => updateSample(x) } 
            />
        {/each}
    </div>

    <div class="euclids" id="playback-rate">
        <span class="knob-category">rate</span>
        {#each {length: 6} as _, x}
            <Knob WIDTH={50} HEIGHT={50} 
            enabled={true}
            title="rate"
            showTitle={false}
            resetValue={1.0}
            scale=0.1
            step=0.01 min={0.01} max={16.0} 
            bind:value={ $trackRates[x] } 
            func={ () => socket.emit('trackRates', $trackRates) } 
            />
        {/each}
    </div>

    <div class="euclids" id="track-env">
        <span class="knob-category">length</span>
        {#each {length: 6} as _, x}
            <Knob WIDTH={50} HEIGHT={50} 
            enabled={true}
            scale=0.05
            title="length"
            showTitle={false}
            resetValue={1.0}
            step=0.01 min={0.1} max={10.0} 
            bind:value={ $trackLengths[x] } 
            func={ () => socket.emit('trackLengths', $trackLengths) } 
            />
        {/each}
    </div>
</div>

<style>
    .sequencer {
        display: flex;
        flex-direction: row;
        margin: 0 auto;
    }

    .knob-category {
        font-size: 10px;
    }

    .euclids {
        display: grid;
        grid-template-rows: repeat(8, auto);
        grid-template-columns: auto;
        align-items: center;
        padding-top: 50px;
        padding-bottom: 70px;
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
</style>