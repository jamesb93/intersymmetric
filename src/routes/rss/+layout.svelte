<script>
    import './theme.css';
</script>

<svelte:head>
    <link rel="manifest" href="%sveltekit.assets%/manifest.json" />
</svelte:head>

<div class="container">
    <slot />
</div>

<style>
    .container {
        height: 100vh;
        min-height: 100vh;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
    }
</style>
