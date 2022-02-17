<script>
    import './interface.css';
    import RadioH from '../RadioH.svelte';
    import Slider from '../Slider.svelte';
    import { socket } from '../app';
    import { send_message } from '$lib/aaa/patch_helpers'
    import { 
        a_mode, b_mode, c_mode,
        a_steps_0, a_steps_1, a_steps_2, 
        b_steps_0, b_steps_1, b_steps_2,
        c_steps_0, c_steps_1, c_steps_2
    } from '../app';

    export let patch;

    const a_steps_0_slider = {
        min: 1, max: 12, step: 1,
        func: () => { socket.emit('a_steps_0', $a_steps_0) }
    }

    const a_steps_1_slider = {
        min: 1, max: 12, step: 1,
        func: () => { socket.emit('a_steps_1', $a_steps_1) }
    }

    const a_steps_2_slider = {
        min: 1, max: 12, step: 1,
        func: () => { socket.emit('a_steps_2', $a_steps_2) }
    }

    const b_steps_0_slider = {
        min: 10, max: 2000, step: 1,
        func: () => { socket.emit('a_steps_0', $b_steps_0) }
    }

    const b_steps_1_slider = {
        min: 10, max: 2000, step: 1,
        func: () => { socket.emit('a_steps_1', $b_steps_1) }
    }

    const b_steps_2_slider = {
        min: 10, max: 2000, step: 1,
        func: () => { socket.emit('a_steps_2', $b_steps_2) }
    }

    const c_steps_0_slider = {
        min: 1, max: 15, step: 1,
        func: () => { socket.emit('a_steps_0', $c_steps_0) }
    }

    const c_steps_1_slider = {
        min: 1, max: 15, step: 1,
        func: () => { socket.emit('a_steps_1', $c_steps_1) }
    }

    const c_steps_2_slider = {
        min: 1, max: 15, step: 1,
        func: () => { socket.emit('a_steps_2', $c_steps_2) }
    }

    $: send_message(patch, 'a_steps', [$a_steps_0, $a_steps_1, $a_steps_2]);
    $: send_message(patch, 'b_steps', [$b_steps_0, $b_steps_1, $b_steps_2]);
    $: send_message(patch, 'c_steps', [$c_steps_0, $c_steps_1, $c_steps_2]);
    $: send_message(patch, 'a_mode', [$a_mode]);
    $: send_message(patch, 'b_mode', [$b_mode]);
    $: send_message(patch, 'c_mode', [$c_mode]);
</script>


<div class="time_pattern area">
    <div class="label">time pattern</div>
    <div class="controls">
        <div class="a time_unit">
            <div class='no_hover'>steps</div>
            <RadioH func={ () => { socket.emit('a_mode', $a_mode) }} bind:value={$a_mode}/>
            <div class="slider-group">
                <Slider {...a_steps_0_slider} bind:value={$a_steps_0} />
                <Slider {...a_steps_1_slider} bind:value={$a_steps_1} />
                <Slider {...a_steps_2_slider} bind:value={$a_steps_2} />
            </div>
        </div>
        <div class="b time_unit">
            <div class='no_hover'>durations</div>
            <RadioH func={ () => { socket.emit('b_mode', $b_mode) }} bind:value={$b_mode}/>
            <div class="slider-group">
                <Slider {...b_steps_0_slider} bind:value={$b_steps_0} />
                <Slider {...b_steps_1_slider} bind:value={$b_steps_1} />
                <Slider {...b_steps_2_slider} bind:value={$b_steps_2} />
            </div>
        </div>
        <div class="c time_unit">
            <div class='no_hover'>subdivisions</div>
            <RadioH func={ () => { socket.emit('c_mode', $c_mode) }} bind:value={$c_mode}/>
            <div class="slider-group">
                <Slider {...c_steps_0_slider} bind:value={$c_steps_0} />
                <Slider {...c_steps_1_slider} bind:value={$c_steps_1} />
                <Slider {...c_steps_2_slider} bind:value={$c_steps_2} />
            </div>
        </div>
    </div>
</div>

<style>
    .time_pattern {
        display: flex;
        flex-direction: column;
        gap: 1em;
        border-left: 1px dashed var(--primary);
        place-items: center;
    }

    
    .time_pattern > .controls {
        display: flex;
        flex-direction: row;
        gap: 3em;
        place-items: center;
    }
    
    @media only screen and (max-width: 980px) {
        .time_pattern {
            border-right: 1px dashed var(--primary);
        }
        .time_pattern> .controls {
            flex-direction: column;
        }
    }
    
    .time_unit {
        display: grid;
        grid-template-rows: auto auto auto;
        gap: 1em;
    }

    .slider-group {
        display: grid;
        grid-template-columns: auto auto auto;
        place-items: center;
    }
</style>

