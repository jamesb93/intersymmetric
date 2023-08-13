<script lang='ts'>
    import { onMount } from 'svelte';
    import { clip, mapRange } from '$lib/utility';

    export let title = '';
	export let width = 38;
    export let height = 50;
    export let radius = 15;
    export let shift = 1;
    export let min = 0;
    export let max = 100;
    export let step = 1;
    export let resetValue = 50;
    export let scale = 1;
    export let showValue = true;
    export let displayValue: string | number | boolean | null = null;
    export let enabled = true;
    export let func = () => {};
    export let value = 0;
    export let internal = value;
    export let hpadding: number = 0;
    export let vpadding: number = 0;

    const MID_X = width / 2;
    const MID_Y = height / 2;
    const MIN_RADIANS = (4 * Math.PI) / 3;
    const MAX_RADIANS = -Math.PI / 3;

    let knob;
    let length = 0;
    let pathValue = null;
    let pv = null;
    let down = false;
    let prevTouch = null;
    let needsUpdate = false;

    $: dashStyle = {
        strokeDasharray: length,
        strokeDashoffset: length
    };
    $: range_path = `M ${min_x} ${min_y} A ${radius} ${radius} 0 1 1 ${max_x} ${max_y}`;
    $: value_path = `M ${zero_x} ${zero_y} A ${radius} ${radius} 0 ${large_arc} ${sweep} ${value_x} ${value_y}`;
    $: pointer_path = `M ${MID_X} ${MID_Y * shift} L ${value_x} ${value_y}`;
    $: zero_radians =
        min > 0 && max > 0
            ? mapRange(min, min, max, MIN_RADIANS, MAX_RADIANS)
            : mapRange(0, min, max, MIN_RADIANS, MAX_RADIANS);
    $: value_radians = mapRange(value, min, max, MIN_RADIANS, MAX_RADIANS);
    $: min_x = MID_X + Math.cos(MIN_RADIANS) * radius;
    $: min_y = shift * MID_Y - Math.sin(MIN_RADIANS) * radius;
    $: max_x = MID_X + Math.cos(MAX_RADIANS) * radius;
    $: max_y = shift * MID_Y - Math.sin(MAX_RADIANS) * radius;
    $: zero_x = MID_X + Math.cos(zero_radians) * radius;
    $: zero_y = shift * MID_Y - Math.sin(zero_radians) * radius;
    $: value_x = MID_X + Math.cos(value_radians) * radius;
    $: value_y = shift * MID_Y - Math.sin(value_radians) * radius;
    $: large_arc = Math.abs(zero_radians - value_radians) < Math.PI ? 0 : 1;
    $: sweep = value_radians > zero_radians ? 0 : 1;
    $: value = Math.round((internal - min) / step) * step + min;

        $: { 
        if (needsUpdate) {
            needsUpdate = false;
            func();
        }
    }
    const updatePosition = change => {
        // This way it always forces it to match the bound value when it is first moved.
        if (!internal) {
            internal = value;
            internal = clip(internal, min, max);
        }

        internal = clip(internal + change * scale, min, max);

        if (pv !== value) {
            needsUpdate = true;
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

    let titleHeight: number = 0;
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
    style:height={`${height+titleHeight+(vpadding*2)}px`}
    style:width={`${width+hpadding}px`}
    on:mousedown={handleDown}
    on:touchstart={handleDown}
    on:dblclick={resetHandler}
>
    <div class="knob-title no-hover" bind:clientHeight={titleHeight}>{title}</div>
    <svg width={width} height={height}>
        <path d={range_path} class="knob stroke" />
        <!-- Arc Fill -->
        <path
            bind:this={pathValue}
            d={value_path}
            style={dashStyle}
            data-dash={length}
            class="knob knob-arc"
        />
        <!-- Line Value -->
        <path d={pointer_path} class="knob knob-needle" />

        {#if showValue}
        <text x={MID_X} y={height} text-anchor="middle" class="knob knob-value">

            {#if displayValue !== null}
                {displayValue}
            {:else}
                { parseFloat(value.toFixed(1)) }
            {/if}
        </text>
        {/if}
    </svg>
</div>

<style>
    .container {
        display: grid;
        grid-template-rows: auto auto;
        gap: 0;
        place-items: center;
        touch-action: none;
        cursor: grab;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .container:active, .container:focus {
        cursor: grabbing;
    }
</style>
