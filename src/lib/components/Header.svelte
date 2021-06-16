<script>
    import { browser } from '$app/env';
    import { 
        socket, numUsers, workshopID, 
        room, recentParamValue, recentParamName
    } from "$lib/app.js";
	import { createRoomID } from '$lib/utility.js';
    import RoomPrompt from "$lib/components/RoomPrompt.svelte";
    let storedRoom = null;

    // if (browser) {
    //     storedRoom = localStorage.getItem(
    //         createRoomID($workshopID, "mfrtjbcode")
    //     );

    //     if (storedRoom === null) {
    //         storedRoom = ''
    //     }

    //     if (storedRoom !== null && storedRoom !== '') {
    //         socket.emit('roomJoin', createRoomID($workshopID, storedRoom));
    //         room.set(storedRoom)
    //     }
    // }

    console.log("%c Intersymmetric Version 0.1", 'background: #222; color: #bada55');
</script>

<header>
    <div id="title">
        <span>Intersymmetric Works</span>
        <span>Grid Sequencer 01</span>
    </div>
    <div id="room">
        <RoomPrompt />
    </div>
    <div id='participants'>
        <span>Users:</span>
        <span>{$numUsers}</span>
    </div>
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


</style>