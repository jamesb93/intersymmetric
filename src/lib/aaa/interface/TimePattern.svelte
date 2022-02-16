<script>
    import './interface.css';
    import RadioH from '../RadioH.svelte';
    import TriSlider from '../TriSlider.svelte';
    import { 
        a_mode, b_mode, c_mode,
        a_steps, b_steps, c_steps,
    } from '../app';
    
    const a_steps_slider = {
        min: 10,
        max: 5000,
        step: 1,
        bindings: [$a_steps, $b_steps, $c_steps],
        sends: []
    }
    
    const b_steps_slider = {
        min: 10,
        max: 5000,
        step: 1,
        bindings: [$a_steps, $b_steps, $c_steps],
        sends: []
    }
    
    const c_steps_slider = {
        min: 10,
        max: 5000,
        step: 1,
        bindings: [$a_steps, $b_steps, $c_steps],
        sends: []
    }
</script>


<div class="time_pattern area">
    <div class="label">time pattern</div>
    <div class="controls">
        <div class="a time_unit">
            <div class='no_hover'>steps</div>
            <RadioH bind:value={$a_mode}/>
            <TriSlider {...a_steps_slider} />
        </div>
        <div class="b time_unit">
            <div class='no_hover'>durations</div>
            <RadioH bind:value={$b_mode}/>
            <TriSlider {...b_steps_slider} />
        </div>
        <div class="c time_unit">
            <div class='no_hover'>subdivisions</div>
            <RadioH bind:value={$c_mode}/>
            <TriSlider {...c_steps_slider} />
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
        gap: 1em;
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
</style>

