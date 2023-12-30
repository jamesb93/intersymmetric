<script>
    import { mouseDown, prePos } from '$lib/nobounds/app'
    import { db, room } from '$lib/nobounds/firebase-core'
    import { grid } from '$lib/nobounds/firebase-core'
    import { set, ref } from 'firebase/database';
    export let y = 0;
    export let x = 0;
    $: emphasis = $prePos === y;

    function clickHandler() {
        $grid[x][y] = !$grid[x][y]
        set(ref(db, `/seq1/${$room}/grid`), $grid)
    };
</script>

<svg
    class="cell"
    class:emphasis={emphasis}
    class:selemph={emphasis && $grid[x][y]}
    on:click={clickHandler}
    on:mousedown={() => { $mouseDown = true }}
>
    <line x1="0" x2="50" y1="0" y2="0" class="outline" />
    <line x1="0" x2="0" y1="0" y2="50" class="outline" />
    {#if y === 15}
        <line x1="50" x2="50" y1="0" y2="50" class="outline" />
    {/if}

    {#if x === 5}
        <line x1="0" x2="50" y1="50" y2="50" class="outline" />
    {/if}
    {#if $grid[x][y]}
        <line class:checkemph={emphasis} x1="49" x2="1" y1="1" y2="49" class="check" />
        <line class:checkemph={emphasis} x1="1" x2="49" y1="1" y2="49" class="check" />
    {/if}
</svg>

<style>
    .cell {
        width: 50px;
        height: 50px;
    }

    .outline {
        stroke: rgba(0, 0, 0, 1);
    }

    .check {
        stroke: #40ac47;
        stroke-width: 1.5px;
    }

    .checkemph {
        stroke: rgba(255, 255, 255, 255);
    }

    .emphasis {
        background-color: #e4e4e3;
    }

    .selemph {
        background-color: #40ac47;
    }
</style>
