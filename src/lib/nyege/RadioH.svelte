<script>
    export let options = [{ value: 0, display: 'off ' }];
    export let value = 0;
    export let func = () => {};
    export let width = '54px';
    export let height = '40px';

    const set = i => {
        value = i;
        func();
    };
</script>

<div class="container centre" style:height>
    {#each options as o}
        <button class="no-hover" on:click={() => set(o.value)} class:selected={value === o.value}>
            {o.display}
        </button>
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        place-items: center;
        gap: 0.1rem;
    }
    button {
        flex: 1 1 0;
        background-color: #ffffff;
        border: 0px solid var(--primary);
        height: 100%;
        font-family: var(--font);
        font-size: 10px;
        text-align: center;
        transition: opacity 250ms linear;
        color: black;
    }
    button:hover:not(.selected) {
        background-color: var(--light-grey);
    }
    button:active:not(.selected) {
        background-color: var(--grey);
    }
    .selected {
        background-color: var(--primary);
        color: white;
    }
</style>
