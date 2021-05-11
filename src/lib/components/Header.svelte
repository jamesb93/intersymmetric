<script>
    import { browser } from '$app/env';
    import { 
        socket, 
        numUsers, 
        workshopID, 
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
    <Editor />
    <div id="title">
        <span>Intersymmetric Works</span>
        <br>
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
    header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 100px;
        font-size: 10px;
        margin: 0 auto;
        width: 90%;
    }

    @media screen and (min-width: 1440px) {
        header {
            width: 50%;
            margin: 0 auto;
        }
    }

    #title {
        padding-top: 12px;
        padding-bottom: 12px;
    }

    #room {
        justify-self: center;
        padding-top: 12px;
        padding-bottom: 12px;        
    }

    #other {
        display: grid;
        grid-template-columns: auto auto;
        width: 100px;
    }

    #participants {
        padding-top: 12px;
        padding-bottom: 12px;
    }

    #param-name {
        padding-top: 12px;
        padding-bottom: 12px;
        width: 75px;
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
        padding-top: 12px;
        min-width: 75px;
    }

    .line {
        border-bottom: 2px solid #40ac47;
        width: 100%;
    }
</style>