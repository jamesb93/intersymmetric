<script>
    import { room } from '$lib/nobounds/firebase-core';
    import { goto } from '$app/navigation';

    let everUsed = false;
    let code = '';

    function handleChange() {
        everUsed = true;
        $room = code;
        code = '';
        goto(`/seq-1/${$room}`);
    }
</script>

<div class="prompt">
    <div id="title">Room Code:</div>
    <input
        type="text"
        class:init={!everUsed}
        bind:value={code}
        on:change={handleChange}
        placeholder={everUsed === false && $room === '' ? 'enter room code' : $room}
        id="room-input"
        class={$$props.class} />
</div>

<style>
    #title {
        text-align: left;
    }
    .prompt {
        display: flex;
        flex-direction: column;
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
        padding-top: 1px;
    }

    #room-input:focus,
    #room-input:active {
        outline: none !important;
        border: 1px solid rgb(204, 204, 204);
    }
</style>
