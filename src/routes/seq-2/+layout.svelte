<script>
    import './theme.css';
    import Header from '$lib/seq-2/Header.svelte';
    import Footer from '$lib/seq-2/Footer.svelte';
</script>

<div class="container">
    <Header />
    <div class="instrument">
        <slot />
    </div>
    <Footer />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 2em;
        width: 100%;
        height: 100vh;
        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
    }
    .instrument {
        width: 100%;
        max-width: 1005px;
        margin: 0 auto;
    }
</style>
