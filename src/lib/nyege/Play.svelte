<script>
    export let WIDTH = 30;
    export let HEIGHT = 30;
    export let state = false;

    function clickHandler() { state = !state };

    const offsetX = 5;
    const offsetY = 0;
    const triangle = `${offsetX},${offsetY} ${offsetX},${HEIGHT - offsetY}, ${WIDTH-5},${HEIGHT / 2}`;
</script>

<svg width={WIDTH} height={HEIGHT} on:click={clickHandler}>
    {#if state === false}
        <polygon class="tri" points={triangle} />
    {:else}
        <g class="tri">
            <rect x={offsetX} y={offsetY} width="6px" height="30px" />
            <rect x={WIDTH - 10} y={offsetY} width="6px" height="30px" />
        </g>
    {/if}
</svg>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .text {
        text-align: center;
        font-size: 10px;
        font-family: var(--font);
    }

    .tri {
        fill: var(--primary);
    }

    .tri:hover,
    .tri:active {
        fill: var(--primary);
    }
</style>
