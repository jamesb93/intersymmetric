<script>
	import { onMount } from 'svelte';
	import IPhoneSideProfile from './IPhoneSideProfile.svelte';

	function iOS() {
		return [
		'iPad Simulator',
		'iPhone Simulator',
		'iPod Simulator',
		'iPad',
		'iPhone',
		'iPod'
		].includes(navigator.platform)
		// iPad on iOS 13 detection
		|| (navigator.userAgent.includes("Mac") && "ontouchend" in document)
	}

	let ios = false;
	let dismissed = false;
	let permanentlyDismissed;
	
	onMount(async() => {
		ios = iOS();
		permanentlyDismissed = localStorage.getItem('iphonedismissal') || false
		console.log(permanentlyDismissed)
	})
</script>


{#if ios && !dismissed && permanentlyDismissed !== 'yes'}
<div class="container">
	<div class="text">
		unmute your device
	</div>
	<IPhoneSideProfile />
	<!-- <img src='/img/iphone.svg' alt='iphone side view'> -->
	<div class="row">
		<button on:click={() => {
			dismissed = true;
		}}>okay</button>
		<button on:click={() => {
			dismissed = true;
			permanentlyDismissed = true;
			localStorage.setItem('iphonedismissal', 'yes');
		}}>okay and don't warn again</button>
	</div>
</div>
{/if}

<style>
	.container {
		display: flex;
		gap: 1em;
		flex-direction: column;
		position: absolute;
		align-items: center;
		left: 50%;
		transform: translate(-50%, 0);
		top: 100px;
		border: 1px solid var(--primary);
		background: white;
		font-size: 1rem;
		width: 330px;
		padding: 25px;
		height: 125px;
		color: var(--primary);
		z-index: 999;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 1em;
	}

	button {
		width: max-content;
		color: var(--primary);
        border: 1px solid var(--primary);
        background-color: white;
        text-align: center;
        font-family: var(--font);
		font-size: 0.75rem;
	}

	button:hover {
        background-color: var(--light-grey);
        color: black;
    }

    button:active {
        background-color: var(--light-grey);
        color: white;
    }
</style>