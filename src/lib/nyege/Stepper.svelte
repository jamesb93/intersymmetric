<script>
    import { scale, clip } from '$lib/utility';

    export let value = 0; // value always comes in true
    export let min = 0,
        max = 2,
        step = 1;
    export let width = 600;
    export let height = 30;
    export let thumbWidth = 1;
    export let active = false;
    export let displayValue = null;
    export let div = 16;
    export let pos = 0;
    export let func = () => {};

    let thumb, fill, bar, rect;
    let down = false;
    let prevTouch = false;
    let prevValue = null;

    $: thumbX = clip(scale(value, min, max, 0, width), 0, width) + thumbWidth;

    const move = e => {
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

    const handlecontroldown = e => {
        down = true;
        move(e);
    };
    const handlemouseup = () => {
        down = false;
    };
    const handletouchend = () => {
        down = false;
    };
    const handlemousemove = e => {
        move(e);
    };
    const handletouchmove = e => {
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
    on:touchend={handletouchend}
/>

<div class="container" style:width={width} style:height={height}>
    <svg on:mousedown={handlecontroldown} on:touchstart={handlecontroldown} {width} {height} bind:this={bar} class:active>
        <!-- Fill -->
        <!-- <rect class="step-fill" x="0" width={thumbX} {height} /> -->
        <line x1={thumbX} x2={thumbX} y1="0" y2={height} stroke-dasharray="3" />
        <rect x={(thumbX / div) * pos} class="pos" width={thumbWidth} {height} />

        <!-- Step Pipss -->
        {#each Array(div) as _, i}
            <!-- <rect class="pip" x={(thumbX / div) * i} width={thumbWidth} {height} /> -->
            <line class="pip" x1={(thumbX / div) * i} x2={(thumbX / div) * i} y1="0" y2={height} />
        {/each}

        <!-- <text x={width - 50} y={height / 2 + 3}>

        </text> -->
    </svg>
    <div class="text">
        {#if displayValue !== null}
        {displayValue}
        {:else}
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
        border: 1px solid var(--primary);
    }

    svg:active {
        cursor: grabbing;
    }

    .text {
        position: absolute;
        display: grid;
        place-items: center;
        font: var(--font);
        font-size: 10px;
        color: var(--primary);
        top: 30%;
        right: 5px;
    }

    .step-fill {
        fill: white;
    }

    .pip {
        stroke: var(--primary);
        stroke-width: 1px;
    }

    .pos {
        fill: var(--primary);
        stroke-width: 2px;
    }

    .active {
        background-color: var(--grey);
    }
</style>
