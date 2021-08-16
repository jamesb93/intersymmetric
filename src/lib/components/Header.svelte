<script>
    import { 
        numUsers, 
        recentParamValue,
        recentParamName,
        userMessage } from "$lib/app.js";
    import RoomPrompt from "$lib/components/RoomPrompt.svelte";

    export let context = '';

    console.log("%c Intersymmetric Version 0.2", 'background: #222; color: #bada55');
</script>

<header>
    <div id="title">
        <span>Intersymmetric Works</span>
        {#if context === 'artist'}
        <!-- ARTIST NAME GOES HERE -->
        <span>Ewa Justka</span>
        {:else}
        <span>Sequencer 01</span>
        {/if}
    </div>
    {#if context !== 'artist'}
        <div id="room">
            <RoomPrompt />
        </div>
    {/if}
    <div id='participants'>
        <span>Users:</span>
        <span>{$numUsers}</span>
    </div>
    {#if context === 'artist'}
    <div id='user-message'>
        { $userMessage }
    </div>
    {/if}
    <div id="recent-param">
        <span id='param'>{$recentParamName}</span>
        <div id='value'>
            {#if $recentParamName !== ""}
                {parseFloat($recentParamValue).toFixed(2)}
            {/if}
        </div>
    </div>
</header>

<div class="line"></div>

<style>
    :root {
        --h: 40px;
    }
    header {
        display: grid;
        grid-template-columns: 411px 141px auto 200px;
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

    #participants {
        display: flex;
        flex-direction: column;
        text-align: left;
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

    #user-message {
        color: green;
        text-align: left;
        white-space: nowrap;
    }


</style>