<script>
    export let options = ['off', 'a', 'b', 'c'];
    export let value = 0;
    export let func = () => {};
    export let width = '30px';
    export let height = '18px';

    const set = i => {
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
            class:selected={value === o.value}
        >
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
        background-color: #ffffff;
        border: 1px solid var(--primary);
        height: 10px;
        font-family: var(--font);
        color: var(--primary);
        font-size: 8px;
        text-align: center;
    }

    button:hover:not(.selected) {
        background-color: var(--grey);
        color: black;
    }

    .selected {
        background-color: var(--primary);
        color: white;
    }
</style>
