<script>
    import { scale, clip } from '$lib/utility';

    export let value = 0; // value always comes in true
    export let min = 0,
        max = 2,
        step = 1;
    export let width = 40;
    export let bar_height = 200;
    export let thumb_height = 3;
    export let active = false;
    export let func = () => {};
    export let displayValue = null;
    export let invert = false;

    let thumb, bar, rect;
    let down = false;
    let prev_touch = false;
    let prev_value = null;

    $: thumb_y = invert
        ? clip(scale(value, min, max, 0, bar_height), 0, bar_height - thumb_height)
        : clip(scale(value, max, min, 0, bar_height), 0, bar_height - thumb_height);

    const move = (e) => {
        rect = bar.getBoundingClientRect();
        if (down) {
            const y = e.pageY - rect.top - window.scrollY;
            const ratio = invert ? 1 - y / bar_height : y / bar_height;
            let scaled = scale(ratio, 0, 1, max, min);
            value = Math.round((scaled - min) / step) * step + min;
            value = clip(value, min, max);
            if (prev_value !== value) {
                func();
            }
            prev_value = value;
        }
    };

    const handle_controldown = (e) => {
        down = true;
        move(e);
    };
    const handle_mouseup = () => {
        down = false;
    };
    const handle_touchend = () => {
        down = false;
    };
    const handle_mousemove = (e) => {
        {
            move(e);
        }
    };
    const handle_touchmove = (e) => {
        e.preventDefault();
        const touch = e.targetTouches[0];
        if (prev_touch) {
            move(touch);
        }
        prev_touch = touch;
    };
</script>

<svelte:window on:mouseup={handle_mouseup} on:touchend={handle_touchend} />

<div class="container">
    <svg
        on:mousedown={handle_controldown}
        on:mousemove={handle_mousemove}
        on:touchmove={handle_touchmove}
        on:touchstart={handle_controldown}
        {width}
        height={bar_height}
        bind:this={bar}
        class:active>
        <rect y={thumb_y} bind:this={thumb} {width} height={thumb_height} />
    </svg>
    <div class="no-hover">
        {#if displayValue !== null}
            {displayValue}
        {:else}
            {value.toFixed(2)}
        {/if}
    </div>
</div>

<style>
    svg {
        touch-action: none;
        background-color: white;
        stroke-width: 1px;
        stroke: black;
        outline: 1px solid rgb(136, 136, 136);
    }

    rect {
        fill: var(--primary);
        stroke: var(--primary);
    }

    .active {
        background-color: var(--grey);
    }
</style>
