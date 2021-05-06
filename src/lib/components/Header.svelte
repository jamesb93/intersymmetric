<script>
    import { browser } from '$app/env';
    import { page } from '$app/stores';
    import { 
        socket, 
        numUsers, 
        workshopID, 
        room, recentParamValue, recentParamName
    } from "$lib/components/stores.js";
	import { createRoomID } from '$lib/components/utility.js';
    import RoomPrompt from "$lib/components/RoomPrompt.svelte";

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
        display: grid;
        grid-template-columns: auto auto auto;
        font-size: 10px;
        width: 100%;
    }

    @media screen and (min-width: 1440px) {
        header {
            width: 50%;
            margin: 0 auto;
        }
    }

    #title {
        justify-self: left;
        margin-left: 30px;
        padding-top: 12px;
        padding-bottom: 12px;
    }

    #room {
        justify-self: center;
        max-width: 50px;
        padding-top: 12px;
        padding-bottom: 12px;
    }

    #other {
        display: grid;
        grid-template-columns: auto auto;
        gap: 50px;
        justify-self: right;
        margin-right: 30px;
        min-width: 100px;
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