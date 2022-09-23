<script>
    import { socket, room } from '$lib/nyege/app';
    import { goto } from '$app/navigation';

    let everUsed = false;
    let code = '';

    function changeHandler() {
        console.log('ever used');
        everUsed = true;
        socket.emit('join_room', `nnnb.${code}`);
        $room = code;
        code = '';
        goto(`/nyege/${$room}`);
    }
</script>

<div class="prompt">
    <input
        type="text"
        class:init={!everUsed}
        bind:value={code}
        on:change={changeHandler}
        placeholder={everUsed === false && $room === '' ? 'enter room code' : $room}
        id="room-input"
    />
</div>

<style>
    .prompt {
        display: grid;
        place-items: center;
    }
    #title {
        text-align: left;
    }
    .init {
        border: 1px solid rgb(204, 204, 204);
    }
    #room-input {
        font-family: var(--font);
        font-size: var(--font-size);
        padding: none;
        background: white;
        border: none;
        width: 100px;
        text-align: center;
        padding-top: 1px;
    }

    #room-input:focus,
    #room-input:active {
        outline: none !important;
        border: 1px solid rgb(204, 204, 204);
    }
</style>
