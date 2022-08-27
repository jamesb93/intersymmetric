<script>
    export let options = [{ value: 0, display: 'off ' }];
    export let value = 0;
    export let func = () => {};
    export let width = '54px';
    export let height = '40px';
    export let synced = false;

    let waiting = false;

    const set = i => {
        value = i;
        func();
        if (synced) {
            waiting = true;
        }
    };

    export const deWait = () => {
        waiting = false;
    };
</script>

<div class="container" style:height>
    {#each options as o}
        <button
            style:width
            class="no-hover"
            class:waiting
            disabled={waiting}
            on:click={() => set(o.value)}
            class:selected={value === o.value}
        >
            {o.display}
        </button>
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        gap: 1px;
        place-items: center;
    }
    button {
        border-radius: 10px;
        background-color: #ffffff;
        border: 1px solid var(--primary);
        height: 100%;
        font-family: var(--font);
        color: black;
        font-size: 10px;
        text-align: center;
        transition: opacity 250ms linear;
    }
    button:hover:not(.selected) {
        background-color: var(--grey);
        color: black;
    }
    .selected {
        background-color: var(--primary);
        color: white;
    }
    .waiting {
        opacity: 0.25;
    }
</style>
