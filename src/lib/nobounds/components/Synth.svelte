<script>
    import { interpolateObject } from 'd3-interpolate';
    import { get } from 'svelte/store';
    import { params } from '$lib/nobounds/app';
    import kickPreset from '$lib/nobounds/presets/kick.json';
    import snarePreset from '$lib/nobounds/presets/snare.json';
    import metal1Preset from '$lib/nobounds/presets/metal1.json';
    import metal2Preset from '$lib/nobounds/presets/metal2.json';
    import fm1Preset from '$lib/nobounds/presets/fm1.json';
    import fm2Preset from '$lib/nobounds/presets/fm2.json';
    import Cell from '$lib/nobounds/components/Cell.svelte';
    import Knob from '$lib/nobounds/components/Knob.svelte';
    import Arrow from '$lib/nobounds/components/Arrow.svelte';
    import { setDbValue } from '$lib/nobounds/firebase-core';

    import {
        shiftColumnDown,
        shiftColumnUp,
        rotateGridColumn
    } from '$lib/nobounds/grid/transforms';
    import { getPattern } from '$lib/nobounds/grid/euclid';
    import {
        room,
        attach,
        grid,
        euclid0,
        euclid1,
        euclid2,
        euclid3,
        euclid4,
        euclid5,
        shape0,
        shape1,
        shape2,
        shape3,
        shape4,
        shape5,
        sound0,
        sound1,
        sound2,
        sound3,
        sound4,
        sound5,
        pitch0,
        pitch1,
        pitch2,
        pitch3,
        pitch4,
        pitch5
    } from '$lib/nobounds/firebase-core';

    const instrumentMap = ['kick', 'snare', 'metal1', 'metal2', 'fm1', 'fm2'];

    /**
     * Updates the sound with the given value.
     *
     * @param {number} x - The value to update the sound with.
     */
    function updateSound(x) {
        let amount = 0.0;
        switch (x) {
            case 0:
                amount = $sound0;
                break;
            case 1:
                amount = $sound1;
                break;
            case 2:
                amount = $sound2;
                break;
            case 3:
                amount = $sound3;
                break;
            case 4:
                amount = $sound4;
                break;
            case 5:
                amount = $sound5;
                break;
        }

        const presets = [
            kickPreset,
            snarePreset,
            metal1Preset,
            metal2Preset,
            fm1Preset,
            fm2Preset
        ];
        const numPresets = Object.keys(presets[x]).length;
        const preset1 = Math.floor(amount * numPresets - 1);
        const preset2 = preset1 + 1;
        amount = amount % 1;

        const result = interpolateObject(
            presets[x][preset1],
            presets[x][preset2]
        )(amount);
        Object.entries(result).forEach(([key, value]) => {
            $params[instrumentMap[x]][key] = value;
        });
    }

    const soundParameters = [sound0, sound1, sound2, sound3, sound4, sound5];
    const pitchParameters = [pitch0, pitch1, pitch2, pitch3, pitch4, pitch5];
    const shapeParameters = [shape0, shape1, shape2, shape3, shape4, shape5];
    const euclidParameters = [euclid0, euclid1, euclid2, euclid3, euclid4, euclid5];

    $: attach($room, 'sound0', sound0, 0.5);
    $: attach($room, 'sound1', sound1, 0.5);
    $: attach($room, 'sound2', sound2, 0.5);
    $: attach($room, 'sound3', sound3, 0.5);
    $: attach($room, 'sound4', sound4, 0.5);
    $: attach($room, 'sound5', sound5, 0.5);

    $: attach($room, 'pitch0', pitch0, 0.0);
    $: attach($room, 'pitch1', pitch1, 0.0);
    $: attach($room, 'pitch2', pitch2, 0.0);
    $: attach($room, 'pitch3', pitch3, 0.0);
    $: attach($room, 'pitch4', pitch4, 0.0);
    $: attach($room, 'pitch5', pitch5, 0.0);

    $: attach($room, 'shape0', shape0, 1.0);
    $: attach($room, 'shape1', shape1, 1.0);
    $: attach($room, 'shape2', shape2, 1.0);
    $: attach($room, 'shape3', shape3, 1.0);
    $: attach($room, 'shape4', shape4, 1.0);
    $: attach($room, 'shape5', shape5, 1.0);

    $: attach($room, 'euclid0', euclid0, 0);
    $: attach($room, 'euclid1', euclid1, 0);
    $: attach($room, 'euclid2', euclid2, 0);
    $: attach($room, 'euclid3', euclid3, 0);
    $: attach($room, 'euclid4', euclid4, 0);
    $: attach($room, 'euclid5', euclid5, 0);

    $: $sound0, updateSound(0);
    $: $sound1, updateSound(1);
    $: $sound2, updateSound(2);
    $: $sound3, updateSound(3);
    $: $sound4, updateSound(4);
    $: $sound5, updateSound(5);
</script>

<div class="sequencer">
    <div class="euclids">
        <span class="knob-category">Pattern</span>
        {#each euclidParameters as parameter, i}
            <Knob
                WIDTH={50}
                HEIGHT={50}
                scale={0.2}
                title="Pattern"
                showTitle={false}
                min={parameter.get().min}
                max={parameter.get().max}
                step={parameter.get().step}
                bind:value={euclidParameters[i]}
                on:update={() => {
                    const patternIndex = get(euclidParameters[i]);
                    $grid[i] = getPattern(patternIndex, 16);
                    setDbValue('grid', $grid);
                    setDbValue(`euclid${i}`, patternIndex);
                }} />
        {/each}
    </div>
    <div class="grid">
        {#each $grid as row, x}
            <div class="cell-container">
                {#if x === 0}
                    {#each row as _, y}
                        <Arrow direction="up" on:click={() => shiftColumnUp(y)} />
                    {/each}
                {/if}
            </div>
            <div class="cell-container">
                <Arrow direction="left" on:click={() => rotateGridColumn(1, x)} />
                {#each row as _, y}
                    <Cell {x} {y} />
                {/each}
                <Arrow direction="right" on:click={() => rotateGridColumn(-1, x)} />
            </div>
            {#if x === $grid.length - 1}
                <div class="cell-container">
                    {#each row as _, y}
                        <Arrow
                            direction="down"
                            on:click={() => {
                                shiftColumnDown(grid, y);
                            }} />
                    {/each}
                </div>
            {/if}
        {/each}
    </div>
    <div class="euclids">
        <span class="knob-category">Sound</span>
        {#each soundParameters as parameter, i}
            <Knob
                WIDTH={50}
                HEIGHT={50}
                title="Sound"
                showTitle={false}
                scale={0.0025}
                min={parameter.get().min}
                max={parameter.get().max}
                step={parameter.get().step}
                bind:value={soundParameters[i]}
                on:update={() => {
                    updateSound(i);
                    setDbValue(`sound${i}`, get(soundParameters[i]));
                }} />
        {/each}
    </div>

    <div class="euclids">
        <span class="knob-category">Pitch</span>
        {#each pitchParameters as parameter, i}
            <Knob
                WIDTH={50}
                HEIGHT={50}
                title="Pitch"
                showTitle={false}
                resetValue={0.0}
                scale={0.1}
                min={parameter.get().min}
                max={parameter.get().max}
                step={parameter.get().step}
                bind:value={pitchParameters[i]}
                on:update={() => {
                    setDbValue(`pitch${i}`, get(pitchParameters[i]));
                }} />
        {/each}
    </div>

    <div class="euclids">
        <span class="knob-category">Shape</span>
        {#each shapeParameters as parameter, i}
            <Knob
                WIDTH={50}
                HEIGHT={50}
                scale={0.01}
                title="Shape"
                showTitle={false}
                resetValue={1.0}
                min={parameter.get().min}
                max={parameter.get().max}
                step={parameter.get().step}
                bind:value={shapeParameters[i]}
                on:update={() => {
                    setDbValue(`shape${i}`, get(shapeParameters[i]));
                }} />
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
