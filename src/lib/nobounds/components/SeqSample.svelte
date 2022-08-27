<script>
    import Cell from '$lib/nobounds/components/Cell.svelte';
    import Knob from '$lib/nobounds/components/Knob.svelte';
    import Arrow from '$lib/nobounds/components/Arrow.svelte';

    import { shiftColumnDown, shiftColumnUp, rotateGridColumn } from '$lib/nobounds/grid/transforms';
    import { getPattern } from '$lib/nobounds/grid/euclid';
    import { socket, grid, gridValid, euclidSteps, trackLengths, trackRates, sampleSelectors } from '$lib/nobounds/app';

    import { samplesLoaded, numSamples } from '$lib/nobounds/samplerConfig';

    export let prePos = 0;
    let anyMouseDown = false;
    let cellSnapshot;

    function sendGrid() {
        socket.emit('grid', $grid);
    }
    function sendEuclid(idx) {
        $grid[idx] = getPattern($euclidSteps[idx], 16);
        socket.emit('euclid', $euclidSteps);
        sendGrid();
    }
</script>

<svelte:window
    on:mouseup={() => {
        anyMouseDown = false;
    }}
/>

<div class="sequencer">
    {#if $samplesLoaded === true}
        {#if $gridValid}
            <div class="euclids">
                <span class="knob-category">Pattern</span>
                {#each { length: 6 } as _, x}
                    <Knob
                        WIDTH={50}
                        HEIGHT={50}
                        scale="0.2"
                        title="Pattern"
                        showTitle={false}
                        min={0}
                        max={16}
                        bind:value={$euclidSteps[x]}
                        func={() => sendEuclid(x)}
                    />
                {/each}
            </div>
        {/if}

        <div class="grid">
            {#if $gridValid}
                {#each $grid as row, x}
                    <div class="cell-container">
                        {#if x === 0}
                            {#each row as _, y}
                                <Arrow direction="up" func={() => shiftColumnUp(grid, y)} />
                            {/each}
                        {/if}
                    </div>
                    <div class="cell-container">
                        <Arrow direction="left" func={() => rotateGridColumn(grid, 1, x)} />
                        {#each row as _, y}
                            <Cell bind:cellSnapshot bind:anyMouseDown func={sendGrid} emph={prePos === y} {x} {y} />
                        {/each}
                        <Arrow direction="right" func={() => rotateGridColumn(grid, -1, x)} />
                    </div>
                    <div class="cell-container">
                        {#if x === $grid.length - 1}
                            {#each row as _, y}
                                <Arrow
                                    direction="down"
                                    func={() => {
                                        shiftColumnDown(grid, y);
                                    }}
                                />
                            {/each}
                        {/if}
                    </div>
                {/each}
            {:else}
                <div id="error">Connecting to the server...</div>
            {/if}
        </div>

        {#if $gridValid}
            <div class="euclids">
                <span class="knob-category">Sound</span>
                {#each { length: 6 } as _, x}
                    <Knob
                        WIDTH={50}
                        HEIGHT={50}
                        title="Sound"
                        showTitle={false}
                        scale="0.1"
                        min={0}
                        max={$numSamples[x] - 1}
                        bind:value={$sampleSelectors[x]}
                        func={() => socket.emit('sampleSelectors', $sampleSelectors)}
                    />
                {/each}
            </div>
            <div class="euclids">
                <span class="knob-category">Pitch</span>
                {#each { length: 6 } as _, x}
                    <Knob
                        WIDTH={50}
                        HEIGHT={50}
                        title="Pitch"
                        showTitle={false}
                        resetValue={1.0}
                        scale={0.02}
                        step={0.01}
                        min={0.01}
                        max={4}
                        bind:value={$trackRates[x]}
                        func={() => socket.emit('trackRates', $trackRates)}
                    />
                {/each}
            </div>

            <div class="euclids">
                <span class="knob-category">Shape</span>
                {#each { length: 6 } as _, x}
                    <Knob
                        WIDTH={50}
                        HEIGHT={50}
                        title="Shape"
                        showTitle={false}
                        scale={0.05}
                        resetValue={1.0}
                        step="0.01"
                        min={0.1}
                        max={10.0}
                        bind:value={$trackLengths[x]}
                        func={() => socket.emit('trackLengths', $trackLengths)}
                    />
                {/each}
            </div>
        {/if}
    {/if}
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
