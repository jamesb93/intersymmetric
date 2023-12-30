<script lang="ts">
    import { setDbValue, attach, room, clockMode } from '$lib/nobounds/firebase-core';
    function handleClick(mode: number) {
        $clockMode = mode;
        setDbValue('clockMode', mode)
    }

    $: attach($room, 'clockMode', clockMode, 0)
</script>

<div class="container">
    {#each clockMode.get_options() as option, i}
        <button class:select={$clockMode === i} on:click={() => handleClick(i)}>
            <span id="text" class:select-text={$clockMode === i}> {option} </span>
        </button>
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    button {
        border-radius: 30px;
        background-color: #ffffff;
        border: 1px solid #40ac47;
        height: 27px;
        width: 80px;
        min-height: 27px;
        max-height: 27px;
        max-width: 80px;
        min-width: 80px;
    }

    button:hover {
        background-color: #ededed;
    }

    button:active,
    .select:hover,
    .select {
        background-color: #40ac47;
    }

    button:active > #text {
        color: white;
    }

    .select > #text {
        color: white;
    }

    #text {
        font-family: var(--font);
        color: black;
        font-size: 10px;
        text-align: center;
    }
</style>
