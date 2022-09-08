<script>
    export let font_size = '10px';
    export let width = '40px';
    export let height = '20px';
    export let disabled = false;
</script>

<button style:font-size={font_size} {disabled} style:height style:width on:click>
    <slot />
</button>

<style>
    button {
        color: black;
        border: 0px solid var(--primary);
        background-color: #ffffff;
        text-align: center;
        font-family: var(--font);
    }

    button:hover {
        background-color: var(--light-grey);
        color: black;
    }

    button:active {
        background-color: var(--grey);
    }
</style>
