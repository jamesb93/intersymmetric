<script>
    import { recentParamValue, recentParamName } from '$lib/nobounds/app.js';
    import RoomPrompt from '$lib/nobounds/components/RoomPrompt.svelte';

    console.log('%c Intersymmetric Version 1.0', 'background: #222; color: #bada55');
</script>

<header>
    <div id="title">
        <div>Intersymmetric Works</div>
        <div>Sequencer 01</div>
    </div>
    <div id="room">
        <RoomPrompt />
    </div>
    <div id="recent-param">
        <div id="param">{$recentParamName}</div>
        <div id="value">
            {#if $recentParamName !== ''}
                {parseFloat($recentParamValue).toFixed(2)}
            {/if}
        </div>
    </div>
</header>

<div class="line" />

<style>
    :root {
        --h: 40px;
    }
    header {
        display: grid;
        grid-template-columns: 411px auto 200px;
        font-size: 10px;
        min-height: var(--h);
        max-height: var(--h);
        padding-top: 10px;
    }

    #title {
        text-align: left;
        word-wrap: none;
        display: flex;
        flex-direction: column;
    }

    #recent-param {
        display: grid;
        grid-template-columns: 60px 100px;
        gap: 10px;
        text-align: left;
    }

    #value {
        text-align: center;
        background-color: #e4e4e3;
        margin-top: -10px;
        font-size: 20px;
        padding-top: 11px;
    }
</style>
