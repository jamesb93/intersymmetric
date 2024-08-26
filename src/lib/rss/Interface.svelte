<script>
    // @ts-nocheck
    import { attach, db } from '$lib/rss/app';
    import { ref, set } from 'firebase/database';
    import { sendDeviceMessage } from '$lib/common/rnbo/helpers';
    import MultiSlider from '$lib/common/multislider/MultiSlider.svelte';
    import {
        s0,
        s1,
        s2,
        s3,
        s4,
        s5,
        s6,
        s7,
        s8,
        s9,
        s10,
        s11,
        s12,
        s13,
        s14,
        s15
    } from '$lib/rss/app';

    export let device;

    let view = 0;
    let index = 0;
    let active = true;

    $: sendDeviceMessage(device, 'on_off', [active]);
    $: sendDeviceMessage(device, 'sliders0', [$s0, $s1, $s2, $s3]);
    $: sendDeviceMessage(device, 'sliders1', [$s4, $s5, $s6, $s7]);
    $: sendDeviceMessage(device, 'sliders2', [$s8, $s9, $s10, $s11]);
    $: sendDeviceMessage(device, 'sliders3', [$s12, $s13, $s14, $s15]);

    $: attach('devtest', 'view0slider0', s0, 0.5);
    $: attach('devtest', 'view0slider1', s1, 0.5);
    $: attach('devtest', 'view0slider2', s2, 0.5);
    $: attach('devtest', 'view0slider3', s3, 0.5);

    $: attach('devtest', 'view1slider0', s4, 0.5);
    $: attach('devtest', 'view1slider1', s5, 0.5);
    $: attach('devtest', 'view1slider2', s6, 0.5);
    $: attach('devtest', 'view1slider3', s7, 0.5);

    $: attach('devtest', 'view2slider0', s8, 0.5);
    $: attach('devtest', 'view2slider1', s9, 0.5);
    $: attach('devtest', 'view2slider2', s10, 0.5);
    $: attach('devtest', 'view2slider3', s11, 0.5);

    $: attach('devtest', 'view3slider0', s12, 0.5);
    $: attach('devtest', 'view3slider1', s13, 0.5);
    $: attach('devtest', 'view3slider2', s14, 0.5);
    $: attach('devtest', 'view3slider3', s15, 0.5);

    $: data = [
        [$s0, $s1, $s2, $s3],
        [$s4, $s5, $s6, $s7],
        [$s8, $s9, $s10, $s11],
        [$s12, $s13, $s14, $s15]
    ];
</script>

<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0">
</svelte:head>

<div
    class="state"
    class:stateon={active}
    role="button"
    tabindex="0"
    on:click={() => {
        active = !active;
    }}
    on:keypress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            active = !active;
        }
    }}
/>
<div class="wrapper">
    <MultiSlider
        bind:index
        bind:data={data[view]}
        config={{
            width: 400,
            maxWidth: '100%',
            height: '100%',
            maxHeight: '100%',
            bgColour: 'yellow',
            colour: 'black',
            min: 0.0,
            max: 1.0
        }}
        on:change={() => {
            set(ref(db, `/rss/devtest/view${view}slider${index}`), data[view][index]);
        }} />

    <div class="view-toggle">
        {#each new Array(4) as x, i}
            <button
                class:selected={view === i}
                class="view-tog"
                on:click={() => {
                    view = i;
                }} />
        {/each}
    </div>
</div>

<svelte:window
    on:keypress|preventDefault={(e) => {
        switch (e.code) {
            case 'Space':
                active = !active;
            case 'Digit1':
                view = 0;
                break;
            case 'Digit2':
                view = 1;
                break;
            case 'Digit3':
                view = 2;
                break;
            case 'Digit4':
                view = 3;
                break;
            default:
                break;
        }
    }} />

<style>
    .state {
        touch-action: none;
        position: absolute;
        top: 10;
        left: 10;
        width: 25px;
        height: 25px;
        background-color: red;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
    }

    .stateon {
        background-color: green;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        min-height: 100%;
        touch-action: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
    }
    .view-toggle {
        display: flex;
        flex-direction: row;
        height: 200px;
        border-top: 1px solid black;
        touch-action: none;
    }
    .view-tog {
        height: 100%;
        width: 25%;
        background-color: yellow;
        border: none;
        margin-left: 1px;
        margin-right: 1px;
        touch-action: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
    }

    .view-tog:focus {
        outline: 4px solid green;
    }

    .selected {
        background-color: black;
    }
</style>