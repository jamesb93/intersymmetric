<script lang="ts">
    export let width = 64;
    export let height = 64;
    export let enabled: boolean | number = false;

    function click_event() {
        enabled = !enabled;
    }
</script>

<div
    style:width={`${width}px`}
    style:height={`${height}px`}
    on:click={click_event}
    on:keydown={click_event}>
    <svg height="100%" width="100%">
        <rect x="0" y="0" {width} {height} class:enabled />
    </svg>
</div>

<style>
    div {
        border: 1px solid var(--primary);
    }

    rect {
        fill: none;
    }

    .enabled {
        fill: var(--primary);
    }
</style>
