<script>
    // @ts-nocheck
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';
    import { CircularBuffer } from '$lib/common/queue';
    import { lerp, clip, mapRange } from '$lib/utility';

    export let focus = null;
    export let index;
    export let data = [];
    export let config = {
        width: 200,
        height: 200,
        colour: 'darkblue',
        bgColour: 'yellow',
        maxWidth: '350px',
        maxHeight: '100px',
        min: 0.0,
        max: 1.0
    };

    let listening = false;
    let mounted = false;
    let wrapper;
    // let bufCache = Array.from({ length: 10}, () => new CircularBuffer(2)); // we store 10 circular buffers. One for each finger.
    let bufCache = {};
    let rect;
    let width = 0;
    let height = 0;
    let scrollX = 0;
    let scrollY = 0;

    const dispatch = createEventDispatcher();
    const change = () => {
        dispatch('change');
    };

    function resize(entries) {
        rect = wrapper.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
    }
    onMount(async () => {
        const sizeObserver = new ResizeObserver(resize).observe(wrapper);
        mounted = true;
        return () => {
            sizeObserver.unobserver(wrapper);
        };
    });

    function updatePoints() {
        for (const [id, buf] of Object.entries(bufCache)) {
            if (buf.isFull()) {
                const canvasWidth = rect.right - rect.left;
                let a = buf.get(0);
                let b = buf.get(1);

                a.idx = clip(
                    Math.floor((a.x / canvasWidth) * data.length),
                    0,
                    data.length - 1
                );

                b.idx = clip(
                    Math.floor((b.x / canvasWidth) * data.length),
                    0,
                    data.length - 1
                );
                const numIntersects = Math.abs(a.idx - b.idx);

                if (numIntersects > 0) {
                    const start = b.y / (rect.bottom - rect.top);
                    const end = a.y / (rect.bottom - rect.top);

                    const isRev = b.idx > a.idx;

                    for (let i = 0; i < numIntersects; i++) {
                        const interp = i / numIntersects;

                        let value = 0.0;
                        if (isRev) {
                            value = lerp(end, start, interp);
                        } else {
                            value = lerp(start, end, interp);
                        }
                        const clampedIndex = clip(
                            Math.min(a.idx, b.idx) + i,
                            0,
                            data.length - 1
                        );
                        index = clampedIndex;
                        data[clampedIndex] = mapRange(
                            1 - value,
                            0,
                            1,
                            config.min,
                            config.max
                        );
                        data = data;
                    }
                } else {
                    index = b.idx;
                    let value = b.y / (rect.bottom - rect.top);
                    data[b.idx] = mapRange(1 - value, 0, 1, config.min, config.max);
                    data = data;
                }
                change();
            }
        }
    }

    function getPointer(clientX, clientY) {
        const maxWidth = rect.right - rect.left;
        const maxHeight = rect.bottom - rect.top;
        const x = clip(clientX + scrollX - rect.left, 0, maxWidth);
        const y = clip(clientY + scrollY - rect.top, 0, maxHeight);
        return [x, y];
    }

    function mouseMoveHandler(e) {
        if (listening) {
            const [x, y] = getPointer(e.clientX, e.clientY);
            checkOrCreateCache(0);
            bufCache[0].enqueue({ idx: null, x: x, y: y });
            updatePoints();
        }
    }

    function touchMoveHandler(e) {
        if (listening) {
            for (let i = 0; i < e.touches.length; i++) {
                const touch = e.touches[i];
                const id = touch.identifier;
                checkOrCreateCache(id);
                const [x, y] = getPointer(touch.clientX, touch.clientY);
                bufCache[id].enqueue({ idx: null, x: x, y: y });
            }
            updatePoints();
        }
    }

    function keyPressHandler(e) {
        switch (e.code) {
            case 'ArrowUp':
                e.preventDefault();
                if (focus !== null && focus < data.length) {
                    data[focus] = clip((data[focus] += 0.05), 0.0, 1.0);
                    data = data;
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (focus !== null && focus < data.length) {
                    data[focus] = clip((data[focus] -= 0.05), 0.0, 1.0);
                    data = data;
                }
                break;
            default:
                break;
        }
    }

    function checkOrCreateCache(id) {
        if (!bufCache.hasOwnProperty(id)) {
            bufCache[id] = new CircularBuffer(2);
        }
    }

    function clearCache() {
        bufCache = {};
    }
</script>

<svelte:window
    on:mouseup={() => {
        listening = false;
        clearCache();
    }}
    on:touchend={(e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            const id = touch.identifier;
            bufCache[id].clear();
        }
        if (e.touches.length === 0) {
            listening = false;
        }
    }}
    on:touchmove={touchMoveHandler}
    on:mousemove={mouseMoveHandler}
    on:keydown={keyPressHandler}
    bind:scrollX
    bind:scrollY />

<div
    class="wrapper"
    bind:this={wrapper}
    style:width={config.width}
    style:height={config.height}
    style:max-width={config.maxWidth}
    style:max-height={config.maxHeight}>
    {#if mounted && width}
        <svg
            class="svg"
            width="100%"
            height="100%"
            style:background-color={config.bgColour}
            on:mousedown={() => {
                listening = true;
            }}
            on:touchstart={(e) => {
                clearCache();
                listening = true;
            }}>
            {#each data as d, i}
                <rect
                    class="bar"
                    x={i * (width / data.length)}
                    y={(1 - d) * height}
                    width={width / data.length}
                    height={d * height}
                    style:stroke={config.colour}
                    style:fill={config.colour}
                    on:focus={(e) => {
                        focus = i;
                    }}
                    on:blur={() => {
                        focus = null;
                    }}
                    role="slider"
                    aria-roledescription={'A vertical slider used to change one of the values stored in the "multislider".'}
                    aria-valuemin={config.min}
                    aria-valuemax={config.max}
                    aria-valuenow={d} />
            {/each}
        </svg>
    {/if}
</div>

<style>
    rect:focus {
        outline: 4px solid green;
    }
    .wrapper {
        touch-action: none;
    }

    .svg {
        touch-action: none;
    }
</style>
