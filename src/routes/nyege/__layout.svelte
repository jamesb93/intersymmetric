
<script>
    import './theme.css'
    import Header from '$lib/nyege/Header.svelte';
    import Footer from '$lib/nyege/Footer.svelte';
</script>

<div class="container">
    <Header />
    <slot />
    <Footer />
</div>

<style>
    .container {
        max-width: 1005px;
        margin: 0 auto;
        -webkit-user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
</style>