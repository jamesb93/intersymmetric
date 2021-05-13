<script>
    import { browser } from '$app/env';
    import { 
        socket, numUsers, workshopID, 
        room, recentParamValue, recentParamName
    } from "$lib/components/stores.js";
	import { createRoomID } from '$lib/components/utility.js';
    import RoomPrompt from "$lib/components/RoomPrompt.svelte";
    import Editor from '$lib/components/Editor.svelte';


    let storedRoom = null;

    if (browser) {
        storedRoom = localStorage.getItem(
            createRoomID($workshopID, "mfrtjbcode")
        );

        if (storedRoom === null) {
            storedRoom = ''
        }

        if (storedRoom !== null && storedRoom !== '') {
            socket.emit('roomJoin', createRoomID($workshopID, storedRoom));
            room.set(storedRoom)
        }
    }

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
    <div id="other">
        <span id="participants">Participants: {$numUsers}</span>
        <div id="recent-param">
            <span id="param-name">{$recentParamName}</span>
            <div id="recent-value">
                {#if $recentParamName !== ""}
                    {parseFloat($recentParamValue).toFixed(2)}
                {/if}
            </div>
        </div>
    </div>
</header>

<div class="line"></div>

<style>
    :root {
        --h: 60px;
    }
    header {
        display: grid;
        grid-template-columns: 552px auto 200px;
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

    #room {
    }

    #other {
        display: grid;
        grid-template-columns: auto auto;
        width: 100px;
    }

    #participants {
    }

    #param-name {
        text-align: right;
    }
    
    #recent-param {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    #recent-value {
        text-align: center;
        background-color: #e4e4e3;
        font-size: 18px;
        min-width: 75px;
    }


</style>