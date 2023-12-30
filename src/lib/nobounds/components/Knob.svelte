<script lang='ts'>
    import { onMount } from 'svelte';
    import { recentParamName, recentParamValue } from '$lib/nobounds/app.js';
    import { clip, mapRange } from '$lib/utility';
    import { writable } from 'svelte/store';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    dispatch('update')

    export let WIDTH = 80;
    export let HEIGHT = 60;
    export let resetValue: number | null = null;
    export let showTitle = true;
    export let title = '';
    export let value = writable(0)
    export let max = 100;
    export let min = 0;
    export let showValue = true;
    export let altValue: number | null = null;
    export let scale = 1.0;
    export let enabled = true;
    export let step = 1;
    export let secondaryColor = '#989898';
    export let strokeWidth = 1;

    const RADIUS = 21;
    const MID_X = WIDTH / 2;
    const MID_Y = HEIGHT / 2;
    const SHIFT = 1.1;
    const MIN_RADIANS = (4 * Math.PI) / 3;
    const MAX_RADIANS = -Math.PI / 3;

    let pathValue;
    let knob;
    let length: numbers = 0;
    let internal: number | null = null;
    let pv: number | null = null;
    let prevTouch: any = null;
    let anchor = null;
    let down = false;

    onMount(() => {
        dashLength();
    });

    $: primaryColor = enabled ? '#40ac47;' : secondaryColor;
    $: textColor = enabled ? '#000000' : secondaryColor;
    $: containerStyle = `height: ${HEIGHT}px; width: ${WIDTH}px;`;
    $: dashStyle = {
        strokeDasharray: length,
        strokeDashoffset: length
    };
    $: rangePath = `M ${minX} ${minY} A ${RADIUS} ${RADIUS} 0 1 1 ${maxX} ${maxY}`;
    $: valuePath = `M ${zeroX} ${zeroY} A ${RADIUS} ${RADIUS} 0 ${largeArc} ${sweep} ${valueX} ${valueY}`;
    $: pointerPath = `M ${MID_X} ${MID_Y * SHIFT} L ${valueX} ${valueY}`;
    $: zeroRadians =
        min > 0 && max > 0
            ? mapRange(min, min, max, MIN_RADIANS, MAX_RADIANS)
            : mapRange(0, min, max, MIN_RADIANS, MAX_RADIANS);
    $: valueRadians = mapRange($value, min, max, MIN_RADIANS, MAX_RADIANS);
    $: minX = MID_X + Math.cos(MIN_RADIANS) * RADIUS;
    $: minY = SHIFT * MID_Y - Math.sin(MIN_RADIANS) * RADIUS;
    $: maxX = MID_X + Math.cos(MAX_RADIANS) * RADIUS;
    $: maxY = SHIFT * MID_Y - Math.sin(MAX_RADIANS) * RADIUS;
    $: zeroX = MID_X + Math.cos(zeroRadians) * RADIUS;
    $: zeroY = SHIFT * MID_Y - Math.sin(zeroRadians) * RADIUS;
    $: valueX = MID_X + Math.cos(valueRadians) * RADIUS;
    $: valueY = SHIFT * MID_Y - Math.sin(valueRadians) * RADIUS;
    $: largeArc = Math.abs(zeroRadians - valueRadians) < Math.PI ? 0 : 1;
    $: sweep = valueRadians > zeroRadians ? 0 : 1;

    const updatePosition = (change) => {
        // This way it always forces it to match the bound value when it is first moved.
        if (internal === null) {
            internal = $value;
        }
        internal += change * scale;
        internal = clip(internal, min, max);
        $value = internal;
        $value = Math.round(($value - min) / step) * step + min;
        if (pv !== $value) {
            dispatch('update', $value)
        }
        pv = internal;
        $recentParamValue = $value;
    };

    const move = posUpdate => {
        if (enabled && down) {
            updatePosition(posUpdate);
        }
    };
    const moveHandler = e => {
        if (anchor) {
            move(e.movementY * -1);
            $recentParamName = title;
            $recentParamValue = $value;
        }
    };

    const touchMoveHandler = e => {
        const touch = e.touches[0];
        if (prevTouch) {
            const movementY = touch.pageY - prevTouch.pageY;
            move(movementY * -1);
        }
        prevTouch = touch;
    };

    const downHandler = e => {
        if (enabled) {
            $recentParamName = title;
            down = true;
            primaryColor = '#5dee67';
            anchor = e.screenY;
        }
    };

    const upHandler = e => {
        if (enabled) {
            down = false;
            primaryColor = '#00c300';
        }
        prevTouch = null;
    };

    function dashLength() {
        let length = pathValue.getTotalLength();
        pathValue.dataset.dash = length;
        length = length;
    }

    function resetHandler() {
        if (resetValue !== null) {
            $value = resetValue;
            internal = $value;
            $recentParamValue = $value;
            dispatch('update', $value)
        }
    }
</script>

<svelte:window
    on:mousemove={moveHandler}
    on:touchmove={touchMoveHandler}
    on:mouseup={upHandler}
    on:touchend={upHandler}
/>

<div
    bind:this={knob}
    class="knob-control"
    style={containerStyle}
    on:mousedown|preventDefault={downHandler}
    on:touchstart|preventDefault={downHandler}
    on:dblclick|preventDefault={resetHandler}
>
    {#if showTitle}
        <div id="title">{title}</div>
    {/if}
    <svg width="{WIDTH}px" height="{HEIGHT}px">
        <path d={rangePath} stroke-width={strokeWidth} stroke={secondaryColor} class="knob-control__range" />
        <!-- Arc Fill -->
        <path
            d={valuePath}
            stroke-width={strokeWidth}
            stroke={primaryColor}
            bind:this={pathValue}
            data-dash={length}
            style={dashStyle}
            class="knob-control__value"
        />
        <!-- Line Value -->
        <path d={pointerPath} stroke-width="1" stroke="black" />

        {#if showValue}
            <text x={MID_X} y={HEIGHT} text-anchor="middle" fill={textColor} class="value">
                {#if altValue === null}
                    {parseFloat($value.toFixed(1))}
                {:else}
                    {altValue}
                {/if}
            </text>
        {/if}
    </svg>
</div>

<style>
    .knob-control {
        display: grid;
        cursor: grab;
        touch-action: none;
        grid-template-rows: 7px 60px;
    }
    .knob-control:active {
        cursor: grabbing;
    }

    .knob-control__range {
        fill: none;
    }

    .knob-control__value {
        fill: none;
    }

    #title {
        text-align: center;
        font-size: var(--font-size);
    }

    .value {
        font-size: var(--font-size);
    }
</style>
