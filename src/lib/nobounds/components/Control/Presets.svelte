<script>
    import { socket } from '$lib/nobounds/app';
    export let data;
    export let key;

    let selected = 0;
    let modifierDown = false;
    let hovered = false;
    let store = {}

    const handleClick = (idx) => {
        selected = idx
        if (modifierDown) {
            store[idx] = JSON.stringify(data[key])
        } else {
            if (store[idx]) {
                data[key] = JSON.parse(store[idx])
            }
            for (let [param, value] of Object.entries(data[key])) {
                socket.emit('params::'+key, param, value)
            }
        };
    }

    const handleKeyDown = (key) => {
        if (key.code === "ShiftLeft") {
            modifierDown = true;
        }
    };
    const handleKeyUp = (key) => {
        if (key.code === "ShiftLeft") {
            modifierDown = false;
        }
    };

    const handleMouseEnter = () => {
        hovered = true;
    }

    const handleMouseLeave = () => {
        hovered = false;
    }
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp}></svelte:window>

<div class="container" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
    <span class="title">
        presets | {#if modifierDown && hovered}storing {:else} recalling {/if}</span>
    <div class="button-container">
        {#each { length: 5 } as _, idx}
            <button 
            class="preset-button" 
            on:click={() => handleClick(idx)}
            class:selected={selected === idx} 
            />
        {/each}
    </div>
</div>


<style>
    .button-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 2px;
    }
    .preset-button {
        width: 25px;
        height: 25px;
        border: 3px solid grey;
        display: inline-block;
        border-radius: 3px;
        background-color: rgb(175, 175, 175);
    }
    .title {
        font-family: var(--font);
        color: grey;
        font-size: 14px;
    }

    .selected {
        background-color: #4c87af;
    }
</style>
