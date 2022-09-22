<script>
    import RoomPrompt from '$lib/nyege/RoomPrompt.svelte';
    import { num_users } from '$lib/nyege/app';
</script>

<header>
    <div id="title">
        <div class="no-hover">Intersymmetric Works | NNNB</div>
    </div>
    <div id="room">
        <RoomPrompt />
    </div>
    <div id="participants">
        <div class="no-hover">Players: {$num_users}</div>
    </div>
</header>

<div class="line" />

<style>
    :root {
        --h: 20px;
    }
    header {
        display: grid;
        grid-template-columns: 180px auto 180px;
        justify-content: space-between;
        max-width: 1005px;
        margin: 0 auto;
        min-height: var(--h);
        max-height: var(--h);
        padding-top: 10px;
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

    #participants {
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .line {
        border-bottom: 1px solid var(--primary);
        position: absolute;
        left: 0;
        right: 0px;
        bottom: 10;
        top: 35px;
    }
</style>
