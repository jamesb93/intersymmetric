<script>
    import { room } from '$lib/nyege/app';
    import { goto } from '$app/navigation';

    let everUsed = false;
    let code = '';

    function changeHandler() {
        console.log('ever used');
        everUsed = true;
        $room = code;
        code = '';
        goto(`/nnnb/${$room}`);
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
