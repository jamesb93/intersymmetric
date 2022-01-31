<script>
    import * as Tone from 'tone';
    let time1 = 0.1,
        time2 = 0.1

    let loop1, loop2;

    const start = () => {
        Tone.start();
        Tone.Transport.start();

        loop1 = new Tone.Loop((time) => {
            console.log('one', time)
            time1 = time;
        }, 0.25)

        loop2 = new Tone.Loop((time) => {
            console.log('two', time)
            time2 = time;
        }, 1)

        loop1.start(0);
        loop2.start(0);
    }
</script>
<div class="times">
    <div>{time1.toFixed(2) - 0.1}</div>
    <div>{time2.toFixed(2) - 0.1}</div>    
</div>

<button on:click={start}>start</button>
<button on:click={() => {
    Tone.Transport.stop();
}}>stop</button>

<button on:click={() => {
    loop1.interval = 0.5
}}>0.5</button>

<button on:click={() => {
    loop1.interval = 0.75
}}>0.75</button>

<button on:click={() => {
    loop1.interval = 1
}}>1</button>

<button on:click={() => {
    loop1.interval = 0.6327
}}>0.6327</button>

<style>
    .times {
        display: flex;
        flex-direction: column;
    }
</style>


