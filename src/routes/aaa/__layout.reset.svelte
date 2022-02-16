
<script>
    import '../../sf.css'
    import Header from '$lib/aaa/header/Header.svelte';
    import Footer from '$lib/aaa/Footer.svelte';
</script>

<div class="container">
    <Header />
    <slot />
    <Footer />
</div>

<style>
    .container {
        max-width: 960px;
        margin: 0 auto;
    }
</style>