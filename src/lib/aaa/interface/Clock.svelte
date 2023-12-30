<script>
    import { ref, set } from 'firebase/database';
    import { max_scale, clip } from '$lib/utility';
    import { sendDeviceMessage } from '@jamesb93/rnbo-svelte';
    import { speed, tala, calculated_speed, room, db, attach } from '$lib/aaa/app';
    import Knob from '$lib/common/Knob.svelte';
    import Play from '$lib/aaa/Play.svelte';

    export let patch;

    let _speed = $speed;
    const speed_knob = {
        title: 'rate',
        min: 0.2,
        max: 4,
        step: 0.05,
        scale: 0.03,
        resetValue: 4,
        show_value: true,
        WIDTH: 80,
        HEIGHT: 60,
        RADIUS: 21,
        SHIFT: 1.1
    };

    $: $calculated_speed = clip(
        max_scale(
            _speed,
            speed_knob.min,
            speed_knob.max,
            speed_knob.min,
            speed_knob.max,
            3.5
        ).toFixed(2),
        speed_knob.min,
        10
    );

    let state = 0;

    patch.messageEvent.subscribe((e) => {
        if (e.tag === 'pattern') {
            $tala[0] = e.payload[0];
        } else if (e.tag === 'b_index') {
            $tala[1] = e.payload;
        } else if (e.tag === 'c_index') {
            $tala[2] = e.payload;
        }
    });

    $: sendDeviceMessage(patch, 'speed', [1 / $calculated_speed]);
    $: sendDeviceMessage(patch, 'state', [state]);

    $: attach($room, 'speed', speed, 3);
</script>

<div class="clock area">
    <div class="label no-hover">clock</div>
    <div class="controls">
        <Play bind:state />
        <Knob
            {...speed_knob}
            bind:internal={$speed}
            bind:value={_speed}
            bind:displayValue={$calculated_speed}
            func={() => set(ref(db, `/aaa/${$room}/speed`), $speed)} />
    </div>

    <div class="tala no-hover">
        {#each $tala as t, i}
            <div class="col">
                <div class="letter">
                    {['a', 'b', 'c'][i]}
                </div>
                <div class="number">
                    {t}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .clock {
        display: flex;
        flex-direction: column;
        gap: 1em;
        border-left: 1px dashed var(--primary);
    }

    .clock > .controls {
        display: flex;
        flex-direction: row;
    }

    .tala {
        margin-top: 1em;
        display: grid;
        grid-template-columns: 1.5ch 1.5ch 1.5ch;
        justify-content: center;
        gap: 0.5em;
        font-size: 40px;
    }

    .tala > .col {
        display: flex;
        flex-direction: column;
    }

    .tala > .col > .letter {
        font-size: 1.5rem;
    }
</style>
