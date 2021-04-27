<script>
    import { socket } from '../stores.js';
    export let value;

    function handleClick(mode) {
        value = mode;
        socket.emit('clock::mode', value)
    }
</script>

<div class="container">
    <button 
        class:select="{value === 'forward'}"
        on:click={() => handleClick('forward')}
    >
        <span id="text" class:select-text={value==='forward'}>
            Forward
        </span>
    </button>

    <button 
        class:select="{value === 'rebound'}"
        on:click={() => handleClick('rebound')}
    >
        <span id="text" class:select-text={value==='rebound'}>
            Rebound
        </span>
    </button>

    <button 
        class:select="{value === 'wander'}"
        on:click={() => handleClick('wander')}
    >
        <span id="text" class:select-text={value==='wander'}>
            Wander
        </span>
    </button>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1px; 
    }

    button {
        border-radius: 30px;
        background-color: #ffffff;
        border: 1px solid rgba(86,158,70,255);
        height: 30px;
        width: 90px;
    }

    button:hover {
        background-color: #ededed;
    }

    button:active {
        background-color: rgba(86,158,70,255);
    }

    button:active > #text {
        color: white;
    }

    .select:hover {
        background-color: rgba(86,158,70,255);
    }

    .select {
        background-color: rgba(86,158,70,255);
    }

    .select > #text {
        color: white;
    }

    #text {
        font-family: 'Space Mono', monospace;
        color: black;
        font-size: 10px;
        text-align: center;
    }
</style>
