<script>
    import { socket } from '$lib/nobounds/app';
    export let value;

    function handleClick(mode) {
        value = mode;
        socket.emit('clock::mode', value);
    }
</script>

<div class="container">
    <button class:select={value === 'forward'} on:click={() => handleClick('forward')}>
        <span id="text" class:select-text={value === 'forward'}> Forward </span>
    </button>

    <button class:select={value === 'rebound'} on:click={() => handleClick('rebound')}>
        <span id="text" class:select-text={value === 'rebound'}> Rebound </span>
    </button>

    <button class:select={value === 'wander'} on:click={() => handleClick('wander')}>
        <span id="text" class:select-text={value === 'wander'}> Wander </span>
    </button>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    button {
        border-radius: 30px;
        background-color: #ffffff;
        border: 1px solid #40ac47;
        height: 27px;
        width: 80px;
        min-height: 27px;
        max-height: 27px;
        max-width: 80px;
        min-width: 80px;
    }

    button:hover {
        background-color: #ededed;
    }

    button:active,
    .select:hover,
    .select {
        background-color: #40ac47;
    }

    button:active > #text {
        color: white;
    }

    .select > #text {
        color: white;
    }

    #text {
        font-family: var(--font);
        color: black;
        font-size: 10px;
        text-align: center;
    }
</style>
