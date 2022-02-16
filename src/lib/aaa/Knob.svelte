<script>
    import { onMount } from 'svelte';

    const clip = (i, low, high) => {
        return Math.min(Math.max(i, low), high)
    }

    export let title = "";
    export let min = 0;
    export let max = 100;
    export let step = 1;
    export let resetValue = 0;
    export let scale = 1.0;
    export let WIDTH = 80;
    export let HEIGHT = 60;
    export let showTitle = true;
    export let showValue = true;
    export let altValue = null;
    export let value;
    export let secondaryColor = 'rgba(104,104,172,1)';
    export let strokeWidth = 1;
    export let enabled = true;

    const RADIUS = 21;
    const MID_X = WIDTH/2;
    const MID_Y = HEIGHT/2;
    const SHIFT = 1.1;
    const MIN_RADIANS = 4 * Math.PI / 3;
    const MAX_RADIANS = -Math.PI / 3;
    
    let pathValue;
    let knob;
    
    let length = 0;
    let interval = null;

    $: primaryColor = enabled ? 'rgba(104,104,172,255)' : secondaryColor;
    $: textColor = enabled ? '#000000' : secondaryColor;
    
    export let func = () => {};
    
    onMount(() => {
        dashLength();
        clearInterval(interval);
        interval = null;
    });
    
    $: dashStyle = {
        strokeDasharray: length,
        strokeDashoffset: length
    }
    
    $: rangePath = `M ${minX} ${minY} A ${RADIUS} ${RADIUS} 0 1 1 ${maxX} ${maxY}`;
    $: valuePath = `M ${zeroX} ${zeroY} A ${RADIUS} ${RADIUS} 0 ${largeArc} ${sweep} ${valueX} ${valueY}`;
    $: pointerPath = `M ${MID_X} ${MID_Y*SHIFT} L ${valueX} ${valueY}`;
    $: zeroRadians = (min > 0 && max > 0) ?mapRange(min, min, max, MIN_RADIANS, MAX_RADIANS):mapRange(0, min, max, MIN_RADIANS, MAX_RADIANS);
    $: valueRadians = mapRange(value, min, max, MIN_RADIANS, MAX_RADIANS);
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
    
    let internal = null;
    let pv = null;
    const updatePosition = (change) => {
        // This way it always forces it to match the bound value when it is first moved.
        if (internal === null) {
            internal = value
        }
        internal += change * scale;
        internal = clip(internal, min, max);
        value = internal
        value = Math.round((value - min) / step) * step + min;
        if (pv !== value) 
            func()
            pv = internal
    }
    
    let down = false;

    const move = (posUpdate) => {
        if (enabled && down) {
            updatePosition(posUpdate)
        }
    }

    const mouseMoveHandler = (e) => {
        move(e.movementY * -1) 
    };

    let prevTouch;
    const touchMoveHandler = (e) => {
        const touch = e.touches[0];
        if (prevTouch) {
            const movementY = touch.pageY - prevTouch.pageY;
            move(movementY * -1)
        }
        prevTouch = touch;
    }
    
    const handleUp = (e) => {
        if (enabled) {
            down=false
        }
    }

    const handleDown = (e) => {
        console.log(e)
        if (enabled) { 
            down = true;
        }
    }
    
    function dashLength() {
        let element = pathValue;
        let length = element.getTotalLength()
        element.dataset.dash = length
        length = length
    };

    function resetHandler() {
        if (resetValue !== null) {
            value = resetValue;
            internal = value;
            func()
        }
    }
    
    function mapRange(x, inMin, inMax, outMin, outMax)  {
        return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    };
</script>

<svelte:window 
on:mousemove={mouseMoveHandler} 
on:touchmove={touchMoveHandler}
on:mouseup={handleUp} 
/>

<div 
    bind:this={knob} 
    class="knob-control" 
    style:height={`${HEIGHT}px`}
    style:width={`${WIDTH}px`}
    on:mousedown={handleDown}
    on:touchstart={handleDown}
    on:dblclick={resetHandler}
    >
    {#if showTitle}
    <div id='title'>{title}</div>
    {/if}
    <svg width='{WIDTH}px' height='{HEIGHT}px' >
        <path
            d={rangePath}
            stroke-width={strokeWidth}
            stroke={secondaryColor}
            class="knob-control__range"
        />
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
        <path
            d={pointerPath}
            stroke-width=1
            stroke="black"
        />

        {#if showValue}
        <text
            x={MID_X}
            y={HEIGHT}
            text-anchor="middle"
            fill="{textColor}"
            class="value"
        >
        {#if altValue === null}
            { parseFloat(value.toFixed(1)) }
        {:else}
            { altValue }
        {/if}
        </text>
        {/if}
    </svg>
</div>

<style>
    .knob-control {
        display: grid;
        grid-template-rows: 7px 60px;
        touch-action: none;
    }
    
    .knob-control__range {
        fill: none;
        transition: stroke .1s ease-in;
    }
    
    .knob-control__value {
        animation-name: dash-frame;
        animation-fill-mode: forwards;
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


