<script>
    import { socket } from '$lib/app.js';
    let grid = null;
    let interval = null;
    socket.emit('roomJoin', 'rewire.test');

    socket.on('connect', () => {
        joined = true;
    })

    socket.on('grid', x => {
        grid = x
    })

    function go() {
        if (interval === null) {
            interval = setInterval(() => {
                grid = grid.map(row => row.map(col => Math.random() < 0.5));
                socket.emit('grid', grid);
            }, 4)
        } else {
            clearInterval(interval)
            interval = null;
        }
    }
</script>
<button on:click={go}> fuck the server up </button>
<div id="container">
{#if grid !== null}
    {#each grid as row}
    <br>
    {#each row as col}
        {col ? 1 : 0}
    {/each}
    {/each}
{/if}
</div>

<style>
    #container {
        margin: 0 auto;
        max-width: 50%;
    }
</style>

