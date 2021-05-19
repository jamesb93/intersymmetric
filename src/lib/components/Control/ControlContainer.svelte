
<script>
    export let hide = false;
</script>

<div class="container" class:hide={ hide }>
    <slot />
</div>
<style>
    .container {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        gap: 10px;
        padding: 5px;
        align-items: center;
    }

    .hide {
        display: none;
    }
</style>