<script>
    export let options = ['off', 'a', 'b', 'c'];
    export let value = 0;
    export let func = () => {};
    export let width = '30px';
    export let height = '18px';

    const set = (i) => {
        value = i;
        func();
    };
</script>

<div class="container">
    {#each options as o}
        <button
            style:width
            style:height
            class="no-hover"
            on:mousedown={() => set(o.value)}
            on:touchstart={() => set(o.value)}
            class:selected={value === o.value}>
            {o.display}
        </button>
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1px;
    }
    button {
        border: 1px solid var(--primary);
        background-color: #ffffff;
        height: 10px;
        font-family: var(--font);
        font-size: 8px;
        text-align: center;
        color: var(--primary);
        align-content: center;
    }
    button:hover:not(.selected) {
        background-color: var(--light-grey);
    }
    button:active {
        background-color: var(--grey);
        color: var(--primary);
    }
    .selected {
        background-color: var(--primary);
        color: white;
    }
</style>
