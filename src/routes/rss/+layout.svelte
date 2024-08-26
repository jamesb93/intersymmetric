<script>
    import './theme.css';
</script>

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
