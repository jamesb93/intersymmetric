<script>
    import { onMount } from 'svelte';
    import { clip, mapRange } from '$lib/utility';

    export let title = '';
	export let WIDTH = 38;
    export let HEIGHT = 50;
    export let RADIUS = 17;
    export let SHIFT = 1;
    export let min = 0;
    export let max = 100;
    export let step = 1;
    export let resetValue = 50;
    export let scale = 1;
    export let showValue = true;
    export let displayValue;
    export let enabled = true;
    export let func = () => {};
    export let value;
    export let internal = value;

    const MID_X = WIDTH / 2;
    const MID_Y = HEIGHT / 2;
    const MIN_RADIANS = (4 * Math.PI) / 3;
    const MAX_RADIANS = -Math.PI / 3;

    let knob;
    let length = 0;
    let pathValue;
    let pv = null;
    let down = false;
    let prevTouch;

    $: dashStyle = {
        strokeDasharray: length,
        strokeDashoffset: length
    };
    $: range_path = `M ${min_x} ${min_y} A ${RADIUS} ${RADIUS} 0 1 1 ${max_x} ${max_y}`;
    $: value_path = `M ${zero_x} ${zero_y} A ${RADIUS} ${RADIUS} 0 ${large_arc} ${sweep} ${value_x} ${value_y}`;
    $: pointer_path = `M ${MID_X} ${MID_Y * SHIFT} L ${value_x} ${value_y}`;
    $: zero_radians =
        min > 0 && max > 0
            ? mapRange(min, min, max, MIN_RADIANS, MAX_RADIANS)
            : mapRange(0, min, max, MIN_RADIANS, MAX_RADIANS);
    $: value_radians = mapRange(value, min, max, MIN_RADIANS, MAX_RADIANS);
    $: min_x = MID_X + Math.cos(MIN_RADIANS) * RADIUS;
    $: min_y = SHIFT * MID_Y - Math.sin(MIN_RADIANS) * RADIUS;
    $: max_x = MID_X + Math.cos(MAX_RADIANS) * RADIUS;
    $: max_y = SHIFT * MID_Y - Math.sin(MAX_RADIANS) * RADIUS;
    $: zero_x = MID_X + Math.cos(zero_radians) * RADIUS;
    $: zero_y = SHIFT * MID_Y - Math.sin(zero_radians) * RADIUS;
    $: value_x = MID_X + Math.cos(value_radians) * RADIUS;
    $: value_y = SHIFT * MID_Y - Math.sin(value_radians) * RADIUS;
    $: large_arc = Math.abs(zero_radians - value_radians) < Math.PI ? 0 : 1;
    $: sweep = value_radians > zero_radians ? 0 : 1;
    $: value = Math.round((internal - min) / step) * step + min;

    const updatePosition = change => {
        // This way it always forces it to match the bound value when it is first moved.
        if (!internal) {
            internal = value;
        }
        internal = clip(internal + change * scale, min, max);
        if (pv !== value) {
            func();
            pv = value;
        }
    };
    const move = posUpdate => {
        if (enabled && down) {
            updatePosition(posUpdate);
        }
    };
    const mouseMoveHandler = e => {
        move(e.movementY * -1);
    };

    const touchMoveHandler = e => {
        const touch = e.touches[0];
        if (prevTouch) {
            const movementY = touch.pageY - prevTouch.pageY;
            move(movementY * -1);
        }
        prevTouch = touch;
    };
    const handleDown = () => {
		down = enabled ? true : false;
    };
    const handleUp = e => {
		down = enabled ? false : false
        prevTouch = null;
    };
    const dashLength = () => {
        let element = pathValue;
        let length = element.getTotalLength();
        element.dataset.dash = length;
        length = length;
    }
    const resetHandler = () => {
        value = resetValue;
        internal = value;
        func();
    }

    onMount(() => {
        dashLength();
    });
</script>

<svelte:window
    on:mousemove={mouseMoveHandler}
    on:touchmove={touchMoveHandler}
    on:mouseup={handleUp}
    on:touchend={handleUp}
/>

<div
    bind:this={knob}
    class="container"
    style:height={`${HEIGHT}px`}
    style:width={`${WIDTH}px`}
    on:mousedown={handleDown}
    on:touchstart={handleDown}
    on:dblclick={resetHandler}
>
    <div class="knob-title no-hover">{title}</div>
    <svg width={WIDTH} height={HEIGHT}>
        <path d={range_path} class="knob stroke" />
        <!-- Arc Fill -->
        <path
            d={value_path}
            style={dashStyle}
            bind:this={pathValue}
            data-dash={length}
            class="knob knob-arc"
        />
        <!-- Line Value -->
        <path d={pointer_path} class="knob knob-needle" />

        {#if showValue}
        <text x={MID_X} y={HEIGHT} text-anchor="middle" class="knob knob-value">
            {#if !displayValue}
                {parseFloat(value.toFixed(1))}
            {:else}
                {displayValue}
            {/if}
        </text>
        {/if}
    </svg>
</div>

<style>
    .container {
        display: grid;
        place-items: center;
        touch-action: none;
        cursor: grab;
    }

    .container:active {
        cursor: grabbing;
    }
</style>
