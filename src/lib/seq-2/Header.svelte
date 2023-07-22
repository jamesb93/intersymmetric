<script>
    import RoomPrompt from '$lib/seq-2/RoomPrompt.svelte';
</script>

<header>
    <div class='header-content'>
        <div id="title">
            <div class="no-hover">Intersymmetric Works | Seq 2</div>
        </div>
        <div id="room">
            <RoomPrompt />
        </div>
        <div></div>
    </div>
</header>

<style>
    header {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--primary);
    }
    .header-content {
        display: grid;
        grid-template-columns: 180px auto 180px;
        justify-content: space-between;
        max-width: 1005px;
        width: min(1005px, 80%);
        margin: 0 auto;
        height: 100%;
        color: var(--primary);
    }

    @media only screen and (max-width: 1005px) {
        header {
            justify-content: space-around;
        }
    }

    #title {
        text-align: left;
        word-wrap: none;
        display: flex;
        flex-direction: column;
    }
</style>
