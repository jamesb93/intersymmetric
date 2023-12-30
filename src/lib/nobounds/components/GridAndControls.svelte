<script>
    import * as Tone from 'tone';
    import Play from './Play.svelte';
    import Knob from './Knob.svelte';
    import BoxButton from './BoxButton.svelte';
    import Clock from './Control/Clock.svelte';
    import { onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { pos, prePos, play } from '$lib/nobounds/app';
    import {
        kick,
        snare,
        fm1,
        fm2,
        metal1,
        metal2
    } from '$lib/nobounds/instruments/ensemble';
    import { wrap } from '$lib/utility';
    import { setDbValue } from '$lib/nobounds/firebase-core';
    import { create_2d_array } from '$lib/utility';
    import {
        invertGridVertical,
        clearGrid,
        randomiseGrid
    } from '$lib/nobounds/grid/transforms.js';

    onDestroy(() => {
        Tone.Transport.stop();
        if (loop) {
            loop.stop();
        }
        $play = false;
    });

    import {
        grid,
        clockMode,
        attach,
        room,
        length,
        pitchOffset,
        bpm,
        clockMultiplierLookup,
        startOffset,
        endOffset
    } from '$lib/nobounds/firebase-core';

    attach($room, 'grid', grid, create_2d_array(6, 16, false));
    attach($room, 'pitchOffset', pitchOffset, 0);
    attach($room, 'length', length, 0.5);
    attach($room, 'startOffset', startOffset, 1);
    attach($room, 'endOffset', endOffset, 16);
    attach($room, 'bpm', bpm, 120);

    const multiplierTable = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0.875, 0.75, 0.66, 0.5, 0.33,
        0.25, 0.125, 0
    ];
    $: clockMultiplier = multiplierTable[$clockMultiplierLookup];

    /**
     * Updates the play status of the synthesizer.
     *
     * @param {boolean} status - The new play status.
     */
    function updatePlayStatus(status) {
        play.set(status);
        if ($play === true) {
            Tone.Transport.start('+0.15');
            if (loop) {
                loop.start();
            }
        } else if ($play === false) {
            Tone.Transport.stop();
            if (loop) {
                loop.stop();
            }
        }
    }

    function startLoop() {
        updatePlayStatus(true);
    }

    function stopLoop() {
        updatePlayStatus(false);
    }

    $: Tone.Transport.bpm.value = $bpm;

    // Declare indices here so you can easily swap the order.
    const KICK = 0;
    const SNARE = 1;
    const M1 = 2;
    const M2 = 3;
    const FM1 = 4;
    const FM2 = 5;

    let internalPos = 0;
    let clockDirection = 1;
    let loop;

    if (browser) {
        Tone.context.lookAhead = 0.2;
        updatePlayStatus(false);
        loop = new Tone.Loop((time) => {
            if ($grid[KICK][$pos] === true) {
                kick.trigger(time, 1.0, $length);
            }

            if ($grid[SNARE][$pos] === true) {
                snare.trigger(time, 1.0, $length);
            }

            if ($grid[M1][$pos] === true) {
                metal1.trigger(time, 1.0, $length);
            }

            if ($grid[M2][$pos] === true) {
                metal2.trigger(time, 1.0, $length);
            }

            if ($grid[FM1][$pos] === true) {
                fm1.trigger(time, 1.0);
            }

            if ($grid[FM2][$pos] === true) {
                fm2.trigger(time, 1.0);
            }

            $prePos = $pos;

            if ($clockMode === 0) {
                internalPos += clockMultiplier;
                internalPos = wrap(internalPos, $startOffset - 1, $endOffset);
                $pos = Math.floor(internalPos);
            } else if ($clockMode === 1) {
                if (clockDirection === 1) {
                    // if progressing forward
                    if ($pos === $endOffset - 1) {
                        clockDirection = 0; // change to backward
                    } else {
                        // anywhere else
                        internalPos += clockMultiplier;
                    }
                }
                if (clockDirection === 0) {
                    // if progressing backward
                    if ($pos === $startOffset - 1) {
                        // if we're at the left boundary
                        internalPos += clockMultiplier;
                        clockDirection = 1; // change to forward
                    } else {
                        internalPos -= clockMultiplier;
                    }
                }
                internalPos = wrap(internalPos, $startOffset - 1, $endOffset);
                $pos = Math.floor(internalPos);
            } else if ($clockMode === 2) {
                if ($pos === $startOffset - 1) {
                    internalPos += clockMultiplier;
                } else if ($pos >= $endOffset - 1) {
                    internalPos -= clockMultiplier;
                } else {
                    if (Math.random() <= 0.5) {
                        internalPos += clockMultiplier;
                    } else {
                        internalPos -= clockMultiplier;
                    }
                }
                internalPos = wrap(internalPos, $startOffset - 1, $endOffset);
                $pos = Math.floor(internalPos);
                $pos = Math.min(Math.max($pos, $startOffset - 1), $endOffset - 1);
            }
        }, '16n').start(0);
    }

    // This is unbelievably stupid. But otherwise svelte complains.
    let tempo = [bpm];
    let clockMult = [clockMultiplierLookup];
    let offsets = [startOffset, endOffset];
    let globalParameters = [pitchOffset, length];
</script>

<div id="all-controls">
    <div id="left-section" />

    <div id="centre-section">
        <div id="clock" class="control-column-container">
            <span id="clock-title" class="container-title">Clock</span>
            <div id="clock-top">
                <Play bind:playing={$play} start={startLoop} pause={stopLoop} />
                <Knob
                    title="Rate"
                    resetValue={120}
                    min={5}
                    max={300}
                    step={1}
                    bind:value={tempo[0]}
                    on:update={() => setDbValue('bpm', $bpm)} />
                <Knob
                    resetValue={0}
                    scale={0.4}
                    title="Multiplier"
                    min={0}
                    max={22}
                    step={1}
                    bind:value={clockMult[0]}
                    bind:altValue={clockMultiplier}
                    on:update={() =>
                        setDbValue('clockMultiplier', $clockMultiplierLookup)} />
            </div>
            <div id="clock-bottom">
                <Clock />
                <Knob
                    scale={0.125}
                    title="Start"
                    min={1}
                    max={16}
                    bind:value={offsets[0]}
                    on:update={() => setDbValue('start_offset', $startOffset)} />
                <Knob
                    scale={0.125}
                    title="End"
                    min={1}
                    max={16}
                    bind:value={offsets[1]}
                    on:update={() => setDbValue('end_offset', $endOffset)} />
            </div>
        </div>

        <div id="grid-transforms" class="control-column-container">
            <span class="container-title">Transforms</span>
            <div id="transform-functions">
                <BoxButton
                    on:click={() => {
                        invertGridVertical(grid);
                        setDbValue('grid', $grid);
                    }}
                    text="Flip V" />
                <BoxButton
                    on:click={() => {
                        randomiseGrid();
                    }}
                    text="Randomise" />
                <BoxButton
                    on:click={() => {
                        clearGrid();
                    }}
                    text="Clear" />
            </div>
        </div>
    </div>

    <div id="right-section" class="control-column-container">
        <div />
        <div id="global-parameters">
            <Knob
                resetValue={0}
                title="Pitch Offset"
                min={-48}
                max={48}
                step={1}
                bind:value={globalParameters[0]}
                on:update={() => {
                    setDbValue('pitchOffset', $pitchOffset);
                }} />
            <Knob
                title="Shape Scale"
                scale={0.005}
                resetValue={1.0}
                min={0.05}
                max={1}
                step={0.01}
                bind:value={globalParameters[1]}
                on:update={() => {
                    setDbValue('length', $length);
                }} />
        </div>
        <div />
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

    #clock-top,
    #clock-bottom {
        display: grid;
        grid-template-columns: 1.1fr 0.9fr 1fr;
    }

    #transform-functions {
        display: flex;
        flex-direction: column;
        gap: var(--button-gap);
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
