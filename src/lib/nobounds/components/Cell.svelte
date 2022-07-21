<script>
    import { grid, maxCells, prevInsertions, socket } from "$lib/nobounds/app";
    export let y;
    export let x;
    export let func;
    export let emph;
    export let cellSnapshot;
    export let anyMouseDown;
    
    const handleMouseDown = () => {
        anyMouseDown = true;
        cellSnapshot = $grid[x][y];
    }
    const handleEnter = () => {
        if (anyMouseDown) {
            $grid[x][y] = cellSnapshot;
            if (cellSnapshot === true) {
                const insertion = {x : x, y : y};
                $prevInsertions.push(insertion);
                socket.emit('prevInsertions', $prevInsertions);
                if ($maxCells > 0) {
                    let trueCount = 0;
                    for (let i = 0; i < $grid.length; i++) {
                        for (let j = 0; j < $grid[i].length; j++) {
                            trueCount += $grid[i][j]
                        }
                    }
                    
                    if (trueCount > $maxCells && $prevInsertions.length >= $maxCells) {
                        for (let i=0; i < $grid.length; i++) {
                            for (let j=0; j < $grid[i].length; j++) {
                                $grid[i][j] = false
                            }
                        }
                        
                        $prevInsertions.slice(-$maxCells).forEach(d => {
                            $grid[d.x][d.y] = true
                        })
                    }
                } 
            }
        }
        func();
    }
    
    const compositeFunction = () => {
        if (!$grid[x][y]) { // if this is changing something to on
            const insertion = {x : x, y : y};
            $grid[x][y] = true
            
            let unique = true;
            $prevInsertions.slice(-$maxCells).forEach(d => {
                if (d.x == insertion.x && d.y == insertion.y) {
                    unique = false;
                }
            })
            
            if (unique) {
                $prevInsertions.push(insertion);
            }
            
            if ($maxCells > 0) {
                let trueCount = 0;
                for (let i = 0; i < $grid.length; i++) {
                    for (let j = 0; j < $grid[i].length; j++) {
                        trueCount += $grid[i][j]
                    }
                }
                
                
                if (trueCount > $maxCells && $prevInsertions.length >= $maxCells) {
                    for (let i=0; i < $grid.length; i++) {
                        for (let j=0; j < $grid[i].length; j++) {
                            $grid[i][j] = false
                        }
                    }
                    
                    $prevInsertions.slice(-$maxCells).forEach(d => {
                        $grid[d.x][d.y] = true
                    })
                }
            } 
            socket.emit('prevInsertions', $prevInsertions);
        } else {
            $grid[x][y] = false
        }
        
        func();
    }
</script>

<svg 
class="cell"
class:emphasis={ emph }
class:selemph={ emph && $grid[x][y] }
on:click={compositeFunction}
on:mouseenter={handleEnter} 
on:mousedown={handleMouseDown} 
>
<!-- <text x="25" y="25">{x}|{y}</text> -->
<line x1="0" x2="50" y1="0" y2="0" class="outline" />
<line x1="0" x2="0" y1="0" y2="50" class="outline" />
{#if y === 15}
<line x1="50" x2="50" y1="0" y2="50" class="outline" />
{/if}

{#if x === 5}
<line x1="0" x2="50" y1="50" y2="50" class="outline" />
{/if}
{#if $grid[x][y]}
<!-- Cross -->
<line class:checkemph={emph} x1="49" x2="1" y1="1" y2="49" class="check" />
<line class:checkemph={emph} x1="1" x2="49" y1="1" y2="49" class="check" />
{/if}
</svg>

<style>
    .cell {
        width: 50px;
        height: 50px;
    }
    
    .outline {
        stroke: rgba(0, 0, 0, 1.0);
    }
    
    .check {
        stroke: #40ac47;
        stroke-width: 1.5px;
    }
    
    .checkemph {
        stroke: rgba(255,255,255,255);
    }
    
    .emphasis {
        background-color: #e4e4e3
    }
    
    .selemph {
        background-color: #40ac47;
    }
</style>