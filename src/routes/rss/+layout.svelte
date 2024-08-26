<script>
    import './theme.css';
</script>

<svelte:head>
    <link rel="manifest" href="/manifest.json" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="#ffff54" />
    <meta name="apple-mobile-web-app-title" content="Intersymmetric" />
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
