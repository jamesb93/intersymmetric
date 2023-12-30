<script>
    import UI from '$lib/nobounds/components/UI.svelte';
    import Snare from '$lib/nobounds/components/Control/Snare.svelte';
    import Kick from '$lib/nobounds/components/Control/Kick.svelte';
    import Metal from '$lib/nobounds/components/Control/Metal.svelte';
    import FM from '$lib/nobounds/components/Control/FM.svelte';
    import { metal1, metal2, fm1, fm2 } from '$lib/nobounds/instruments/ensemble.js';
	import { mouseDown } from '$lib/nobounds/app'
</script>

<svelte:window
	on:mouseup={() => {
        $mouseDown = false;
    }}
/>

<div class="main-layout">
    <UI />
	<div class="synth-controls">
		<Snare hide={true} />
		<Kick hide={true} />
		<Metal id="metal1" instrument={metal1} hide={true} />
		<Metal id="metal2" instrument={metal2} hide={true} />
		<FM id="fm1" instrument={fm1} hide={true} />
		<FM id="fm2" instrument={fm2} hide={true} />
	</div>
</div>

<style>
    .main-layout {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .synth-controls {
        display: flex;
        flex-direction: row;
    }
</style>
