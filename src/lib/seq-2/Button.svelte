<script>
    export let fontSize = '10px';
    export let width = '40px';
    export let height = '20px';
    export let disabled = false;
</script>

<button style:font-size={fontSize} {disabled} style:height style:width on:click>
    <slot />
</button>

<style>
    button {
        color: black;
        border: 1px solid var(--primary);
        background-color: var(--light-grey);
        text-align: center;
        font-family: var(--font);
    }

    button:hover {
        background-color: var(--primary);
        color: white;
    }

    button:active {
        background-color: var(--primary);
        color: white;
    }
</style>
