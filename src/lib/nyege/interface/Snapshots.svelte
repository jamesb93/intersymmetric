<script>
	import { socket } from '$lib/nyege/app'
	import {
		buf0, buf1, buf2, buf3, buf4, buf5, buf6,
		pitch0, pitch1, pitch2, pitch3, pitch4, pitch5,
		len0, len1, len2, len3, len4, len5, len6,
		div0, div1, div2, div3,
		range0, range1, range2, range3,
		retrig0, retrig1,
		retrigGate0, retrigGate1,
		chordfollow, chordspread, chordlow, chordhigh, scale
	} from '$lib/nyege/app';

	let hide = true;

	const recall = (state) => {
		$buf0 = state.buf0
		$buf1 = state.buf1
		$buf2 = state.buf2
		$buf3 = state.buf3
		$buf4 = state.buf4
		$buf5 = state.buf5
		$buf6 = state.buf6
		$pitch0 = state.pitch0
		$pitch1 = state.pitch1
		$pitch2 = state.pitch2
		$pitch3 = state.pitch3
		$pitch4 = state.pitch4
		$pitch5 = state.pitch5
		$len0 = state.len0
		$len1 = state.len1
		$len2 = state.len2
		$len3 = state.len3
		$len4 = state.len4
		$len5 = state.len5
		$len6 = state.len6
		$div0 = state.div0
		$div1 = state.div1
		$div2 = state.div2
		$div3 = state.div3
		$range0 = state.range0
		$range1 = state.range1
		$range2 = state.range2
		$range3 = state.range3
		$retrig0 = state.retrig0
		$retrig1 = state.retrig1
		$retrigGate0 = state.retrigGate0
		$retrigGate1 = state.retrigGate1
		$chordfollow = state.chordfollow
		$chordspread = state.chordspread
		$chordlow = state.chordlow
		$chordhigh = state.chordhigh
		$scale = state.scale
	}

	const key = e => {
		if (e.ctrlKey && e.shiftKey && e.key === 'A') {
			hide = !hide
			if (!hide) {
				socket.emit('getSnapshots');
			}
		}
    }

	socket.on('snapshots', x => {
		snapshots = x
	})

	let snapshots = [];
</script>

<svelte:window on:keydown={key} />

{#if !hide}
<div class='container'>
	{#each snapshots as snap}
	<button class='preset' on:click={() => recall(snap.state)}></button>
	{/each}
</div>
{/if}

<style>
	.container {
		z-index: 10000;
		position: absolute;
		margin: 0 auto;
		left: 0;
		right: 0;
		top: 50%;
		width: 400px;
		background-color: white;
		padding: 1em;
		border: 4px solid var(--primary);
		display: flex;	
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.25em;
	}
	.preset {
		width: 30px;
		height: 30px;
		background-color: white;
		border: 1px solid var(--primary);

	}
	.preset:hover {
		background-color: var(--primary);
		border: none;
	}
</style>
