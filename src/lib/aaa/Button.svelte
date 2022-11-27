<script>
    export let font_size = '10px';
    export let width = '40px';
    export let height = '20px';
</script>

<button on:click style:font-size={font_size} style:height style:width>
    <slot />
</button>

<style>
    button {
        border-radius: 30px;
        background-color: #ffffff;
        border: 1px solid var(--primary);
        font-family: var(--font);
        color: black;
        text-align: center;
    }

    button:hover {
        background-color: var(--grey);
        color: black;
    }
</style>
