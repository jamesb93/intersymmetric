<script>
    import { scale, clip } from '$lib/utility';

    export let value = 0.0; // value always comes in true
    export let min = 0,
        max = 2,
        step = 1;
    export let width = 500;
    export let height = 30;
    export let thumbWidth = 1;
    export let active = false;
    export let div = 16;
    export let pos = 0;
    export let func = () => {};

    let thumb, fill, bar, rect;
    let down = false;
    let prevTouch = false;
    let prevValue = null;

    $: thumbX = clip(scale(value, min, max, 0, width), 0, width) + thumbWidth;
    $: lineStrokeWidth = value > 2 ? '1px' : '1px';

    const move = (e) => {
        rect = bar.getBoundingClientRect();
        if (down) {
            const x = e.pageX - rect.left;
            const ratio = x / width;
            let scaled = scale(ratio, 0, 1, min, max);
            value = Math.round((scaled - min) / step) * step + min;
            value = clip(value, min, max);
            if (prevValue !== value) {
                func();
            }
            prevValue = value;
        }
    };

    const handlecontroldown = (e) => {
        down = true;
        move(e);
    };
    const handlemouseup = () => {
        down = false;
    };
    const handletouchend = () => {
        down = false;
    };
    const handlemousemove = (e) => {
        move(e);
    };
    const handletouchmove = (e) => {
        const touch = e.touches[0];
        if (prevTouch) {
            move(touch);
        }
        prevTouch = touch;
    };
</script>

<svelte:window
    on:mousemove={handlemousemove}
    on:touchmove={handletouchmove}
    on:mouseup={handlemouseup}
    on:touchend={handletouchend} />

<div class="container" style:width style:height>
    <svg
        on:mousedown={handlecontroldown}
        on:touchstart={handlecontroldown}
        {width}
        {height}
        bind:this={bar}
        class:active>
        <!-- Fill -->
        <rect class="step-fill" x="0" width={thumbX} {height} />
        <!-- <line x1={thumbX} x2={thumbX} y1="0" y2={height} stroke-dasharray="3" /> -->

        <!-- Step Pipss -->
        {#each Array(div - 1) as _, i}
            <line
                class="pip"
                x1={(thumbX / div) * (i + 1)}
                x2={(thumbX / div) * (i + 1)}
                y1="0"
                y2={height}
                stroke-width={lineStrokeWidth} />
        {/each}

        <line
            class="pos"
            x1={(thumbX / div) * pos}
            x2={(thumbX / div) * pos}
            y1="0"
            y2={height}
            stroke-width={5} />
    </svg>
    <div class="text" class:white={value > 15}>
        {#if value}
            {value.toFixed(0)}
        {/if}
    </div>
</div>

<style>
    .container {
        position: relative;
    }
    svg {
        position: relative;
        cursor: grab;
        touch-action: none;
        background-color: white;
        stroke-width: 1px;
        stroke: var(--primary);
        outline: 1px solid var(--primary);
    }

    svg:active {
        cursor: grabbing;
    }

    .text {
        position: absolute;
        display: grid;
        place-items: center;
        font: var(--font);
        color: var(--primary);
        font-size: 10px;
        top: 30%;
        right: 5px;
    }

    .white {
        color: white;
    }

    .step-fill {
        fill: var(--primary);
    }

    .pip {
        stroke: white;
    }

    .pos {
        stroke: white;
    }

    .active {
        background-color: var(--grey);
    }
</style>
