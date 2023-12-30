<script>
    import { scale, clip } from '$lib/utility';

    export let low = 0;
    export let high = 1;
    export let min = 0;
    export let max = 2;
    export let step = 1;
    export let width = 500;
    export let height = 30;
    export let active = false;
    export let lofunc = () => {};
    export let hifunc = () => {};

    let thumb, fill, bar, rect;
    let down = false;
    let prev_touch = false;
    let prevLow = null;
    let prevHigh = null;
    let edge = 0; // 0 left 1 right;

    $: lowX = clip(scale(low, min, max, 0, width), 0, width);
    $: highX = clip(scale(high, min, max, 0, width), 0, width);
    $: fill = 0; // the width of the internal box (range)

    const move = (e) => {
        if (down) {
            const x = e.pageX - rect.left;
            const ratio = x / width;
            const scaled = scale(ratio, 0, 1, min, max);
            if (edge === 0) {
                low = Math.round((scaled - min) / step) * step + min;
                low = clip(low, min, high - 5);
            } else if (edge === 1) {
                high = Math.round((scaled - min) / step) * step + min;
                high = clip(high, low + 5, max);
            }
            if (prevLow !== low) {
                lofunc();
            }
            if (prevHigh !== high) {
                hifunc();
            }
            prevLow = low;
            prevHigh = high;
        }
    };

    const handle_controldown = (e) => {
        down = true;
        rect = bar.getBoundingClientRect();
        const x = e.pageX - rect.left;
        // Which handle are you closer to?
        // This will always snap to the left edge at minimum range... fix
        const distances = [lowX, highX].map((v) => Math.abs(x - v));
        edge = distances.indexOf(Math.min(...distances));
        console.log(edge);
        move(e);
    };
    const handle_mouseup = () => {
        down = false;
    };
    const handle_touchend = () => {
        down = false;
    };
    const handle_mousemove = (e) => {
        move(e);
    };
    const handle_touchmove = (e) => {
        const touch = e.touches[0];
        if (prev_touch) {
            move(touch);
        }
        prev_touch = touch;
    };
</script>

<svelte:window
    on:mousemove={handle_mousemove}
    on:touchmove={handle_touchmove}
    on:mouseup={handle_mouseup}
    on:touchend={handle_touchend} />

<svg
    on:mousedown={handle_controldown}
    on:touchstart={handle_controldown}
    {width}
    {height}
    bind:this={bar}
    class:active>
    <rect class="step-fill" x={lowX} width={Math.max(highX - lowX, 2)} {height} />
</svg>

<style>
    svg {
        cursor: grab;
        touch-action: none;
        background-color: white;
        border: 1px solid var(--primary);
    }

    svg:active {
        cursor: grabbing;
    }

    text {
        font: var(--font);
        font-size: 10px;
        color: black;
        font-weight: 100;
    }

    .step-fill {
        fill: var(--primary);
    }

    .active {
        background-color: var(--grey);
    }
</style>
