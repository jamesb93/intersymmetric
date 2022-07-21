<script>
	import { browser } from '$app/env';
	import { room } from '$lib/nobounds/app';
	import SeqCtrlSynth from '$lib/nobounds/components/SeqCtrlSynth.svelte';
	import SeqCtrlSample from '$lib/nobounds/components/SeqCtrlSample.svelte';
	import SeqSynth from '$lib/nobounds/components/SeqSynth.svelte';
	import SeqSample from '$lib/nobounds/components/SeqSample.svelte';
	import Footer from '$lib/nobounds/components/Footer.svelte';
	import Header from '$lib/nobounds/components/Header.svelte';

	export let mode = '';
	export let context = '';
	// We define this here because the Tone.js callback is a little finnicky.
	let pos = 0;
	let prePos = 0;
</script>

<div>
	<Header {mode} {context} />
	<div class="line" />
	{#if browser && $room !== ''}
		{#if mode === 'synth'}
			<SeqCtrlSynth bind:pos bind:prePos />
			<SeqSynth bind:prePos />
		{/if}

		{#if mode === 'sample'}
			<SeqCtrlSample {context} bind:pos bind:prePos />
			<SeqSample bind:prePos />
		{/if}
	{/if}
	<Footer />
</div>

<style>
	.line {
		border-bottom: 1px solid #40ac47;
		position: absolute;
		left: 0;
		right: 0px;
		bottom: 10;
		top: 50px;
	}
</style>
