<script>
    import BoxButton from '$lib/components/BoxButton.svelte';
    import { fade } from 'svelte/transition';
    import { goto } from '$app/navigation';

    function handleButton() {
        // THIS LINK POINTS TO THE CURRENT THING
        goto('/seq-1/idx')
    }

</script>

<div id='parent-grid'>
<div></div>

<div class='container' transition:fade>
    <div class='instructions'>
        <p>Intersymmetric Sequencer 1 is an online multiplayer drum machine that uses shared interfaces, pattern generation and sound synthesis to enable groups of people to play together in real time.</p>
        <p id='button-helper'>Click the button to join.</p>
        <div id='button-container'>
            <BoxButton text='join' func={ handleButton }/>
        </div>
    </div>
    <div class='times'>
        <h3 class='titles'>LIVE ARTISTS' PERFORMANCES</h3>
        <p>13/08 21:00 BST | Modern Institute</p>
        <p>19/08 21:00 BST | Ewa Justke</p>
        <p>26/08 21:00 BST | Beatrice Dillon</p>
        <p>31/08 21:00 BST | Nyege Nyege</p>
        <p id='other-artists'>(other artists TBA)</p>
    </div>

    <div class='further-instructions'>
        When you join a session you will be able to hear, watch and also take part int he performance. Please be aware that if multiple people rapidly change settings it will disrupt the artist's direction, so interact considerably, and give room for others to work together.
    </div>

    <div class='call'>
        <h3 class='titles'>WORKSHOPS</h3>
        <p id='call-info'>Open call for free music workshop with Rian Treanor & Mark Fell</p>
        <p>The workshop will focus on an exploration of a new online music platform, where people interact together in real time, using pattern generating procedures and digital synthesis. As an inclusive project we want to work with people of different backgrounds, age groups, and abilities. It is open to participants with varying levels of musical expertise, including people with no previous experience and additional needs. The workshop consists of two separate sessions, each of which is 90 minutes long. Workshop dates will be agreed with selected participants. Participants will need access to a computer and a stable internet connection.</p>
        <p>Places are limited, to express your interest in joining these sessions please complete <a href='https://docs.google.com/forms/d/e/1FAIpQLScKekf6Et-p2fp7GVEdgcwy1j-nZN2uLRWtZV4-2 3k_LWfteA/viewform?usp=sf_link'>this form</a>.</p>
    </div>

    <div class='credit'>
        <h3 class='titles'>CREDIT</h3>
        <p>Mark Fell and Rian Treanor</p>
        <p>Programming by <a href='https://jamesbradbury.xyz'>James Bradbury</a></p>
        <p>Graphic design by Joe Gilmore</p>
        <p>Commissioned by No Bounds 2021 </p>
    </div>
</div>

<div></div>
</div>


<style>

    #parent-grid {
        display: grid;
        grid-template-columns: auto min(80ch, 100%) auto;
    }
    .container {
        display: flex;
        flex-direction: column;
        max-width: 100%;
        justify-content: center;
        text-align: left;
        padding-top: 20px;
        gap: 20px;
    }

    .instructions {
        display: flex;
        flex-direction: column;
    }
    .times{
        display: flex;
        flex-direction: column;
        align-self: center;
    }

    .call {
        display: flex;
        flex-direction: column;
    }

    #call-info {
        font-style: italic;
        margin-bottom: 10px;
    }

    .credit {
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    #other-artists {
        text-align: center;
    }
    #button-container {
        text-align: center;
    }
    #button-helper {
        margin-top: 10px;
    }

    .titles {
        text-decoration: underline;
    }


</style>