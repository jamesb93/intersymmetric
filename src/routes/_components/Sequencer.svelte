<script>
    import Cell from "./Cell.svelte";
    import Knob from "./Knob.svelte";
    import Arrow from './Arrow.svelte';
    
    import { shiftColumnDown, shiftColumnUp } from '$lib/grid/transforms.js';
    import { socket, states, grid, gridValid, euclidSteps } from './stores.js';
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
        {#each {length: 6} as _, x}
            <Knob WIDTH={50} HEIGHT={50} enabled={states.euclid} scale=0.2 min={0} max={16} showValue={false} bind:value={$euclidSteps[x]} func={ () => sendEuclid(x) } />
        {/each}
        </div>
        <div class="grid">
        <!-- <TwoThumb /> -->
        {#if $gridValid}
            {#each $grid as row, x}
                <div class="cell-container">
                    {#if x === 0}
                        {#each row as _, y}
                            <!-- <Arrow direction="up" func={() => {shiftColumnUp(grid, y)}}/> -->
                        {/each}
                    {/if}
                </div>
                <div class="cell-container">
                    <!-- <Arrow direction="left" func={() => {grid[x] = rotate(grid[x], 1); sendGrid()}}/> -->
                    <Arrow direction="left" func={() => {grid[x].rotate(1); sendGrid()}}/>

                    {#each row as step, y}
                        <Cell
                        bind:cellSnapshot={cellSnapshot}
                        bind:anyMouseDown={anyMouseDown}
                        func={sendGrid}
                        emph={prePos === y}
                        x={x}
                        y={y}
                        />
                    {/each}
                    <!-- <Arrow direction="right" func={() => {grid[x] = rotate(grid[x], -1); sendGrid()}}/> -->
                </div>
                <div class="cell-container">
                    {#if x === $grid.length-1}
                        {#each row as _, y}
                            <!-- <Arrow 
                            direction="down" 
                            func={ () => {shiftColumnDown(grid, y)} } 
                            /> -->
                        {/each}
                    {/if}
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
    .sequencer {
        display: flex;
        flex-direction: row;
        margin: 0 auto;
    }

    .euclids {
        display: grid;
        grid-template-rows: repeat(8, auto);
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
</style>