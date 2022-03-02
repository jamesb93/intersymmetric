<script>
    import './interface.css';
    import RadioH from '../RadioH.svelte';
    import Slider from '../Slider.svelte';
    import { socket, speed, calculated_speed } from '../app';
    import { max_scale } from '$lib/utility';
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
        min: 0, max: 8, step: 1, invert: true,
        func: () => { socket.emit('b_steps_0', $b_steps_0) }
    }

    const b_steps_1_slider = {
        min: 0, max: 8, step: 1, invert: true,
        func: () => { socket.emit('b_steps_1', $b_steps_1) }
    }

    const b_steps_2_slider = {
        min: 0, max: 8, step: 1, invert: true,
        func: () => { socket.emit('b_steps_2', $b_steps_2) }
    }

    const c_steps_0_slider = {
        min: 1, max: 9, step: 1,
        func: () => { socket.emit('c_steps_0', $c_steps_0) }
    }

    const c_steps_1_slider = {
        min: 1, max: 9, step: 1,
        func: () => { socket.emit('c_steps_1', $c_steps_1) }
    }

    const c_steps_2_slider = {
        min: 1, max: 9, step: 1,
        func: () => { socket.emit('c_steps_2', $c_steps_2) }
    }
    
    // $: b0_map = max_scale($b_steps_0, 0, 1, 100, 1000, 2);
    // $: b1_map = max_scale($b_steps_1, 0, 1, 100, 1000, 2);
    // $: b2_map = max_scale($b_steps_2, 0, 1, 100, 1000, 2);
    const duration_lookup = [1, 2, 3, 4, 6, 8, 12, 16, 32];
    $: b0_map = duration_lookup[$b_steps_0] * 25;
    $: b1_map = duration_lookup[$b_steps_1] * 25;
    $: b2_map = duration_lookup[$b_steps_2] * 25;
    $: calculated_b_0 = (b0_map * 1 / $calculated_speed).toFixed(0);
    $: calculated_b_1 = (b1_map * 1 / $calculated_speed).toFixed(0);
    $: calculated_b_2 = (b2_map * 1 / $calculated_speed).toFixed(0);

    $: send_message(patch, 'a_steps', [$a_steps_0, $a_steps_1, $a_steps_2]);
    $: send_message(patch, 'b_steps', [b0_map, b1_map, b2_map]);
    $: send_message(patch, 'c_steps', [$c_steps_0, $c_steps_1, $c_steps_2]);
    $: send_message(patch, 'a_mode', [$a_mode]);
    $: send_message(patch, 'b_mode', [$b_mode]);
    $: send_message(patch, 'c_mode', [$c_mode]);

    let a_current_step = 0;
    let b_current_step = 0;
    let c_current_step = 0;
    patch.messageEvent.subscribe(e => {
        if (e.tag === 'pattern') {
            a_current_step = e.payload[0];
            b_current_step = e.payload[1];
            c_current_step = e.payload[2];
        }
    })
</script>

<div class="time_pattern area">
    <div class="label no_hover">time pattern</div>
    <div class="controls">
        <div class="a time_unit">
            <div class='no_hover'>steps</div>
            <RadioH func={ () => { socket.emit('a_mode', $a_mode) }} bind:value={$a_mode}/>
            <div class="slider-group">
                <Slider {...a_steps_0_slider} bind:value={$a_steps_0} active={a_current_step === 0}/>
                <Slider {...a_steps_1_slider} bind:value={$a_steps_1} active={a_current_step === 1}/>
                <Slider {...a_steps_2_slider} bind:value={$a_steps_2} active={a_current_step === 2}/>
            </div>
        </div>
        <div class="b time_unit">
            <div class='no_hover'>durations</div>
            <RadioH func={ () => { socket.emit('b_mode', $b_mode) }} bind:value={$b_mode}/>
            <div class="slider-group">
                <Slider {...b_steps_0_slider} bind:display_value={calculated_b_0} bind:value={$b_steps_0} active={b_current_step === 0}/>
                <Slider {...b_steps_1_slider} bind:display_value={calculated_b_1} bind:value={$b_steps_1} active={b_current_step === 1}/>
                <Slider {...b_steps_2_slider} bind:display_value={calculated_b_2} bind:value={$b_steps_2} active={b_current_step === 2}/>
            </div>
        </div>
        <div class="c time_unit">
            <div class='no_hover'>subdivisions</div>
            <RadioH func={ () => { socket.emit('c_mode', $c_mode) }} bind:value={$c_mode}/>
            <div class="slider-group">
                <Slider {...c_steps_0_slider} bind:value={$c_steps_0} active={c_current_step === 0}/>
                <Slider {...c_steps_1_slider} bind:value={$c_steps_1} active={c_current_step === 1}/>
                <Slider {...c_steps_2_slider} bind:value={$c_steps_2} active={c_current_step === 2}/>
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
    
    @media only screen and (max-width: 1005px) {
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

