<script>
    import { fade } from 'svelte/transition';
</script>


<div class='container' transition:fade>
    <div id='top'>
        <p><b>Intersymmetric Sequencer 1</b> is an online multiplayer drum machine that uses shared interfaces, pattern generation and sound synthesis to enable groups of people to play together in real time.</p>
        <br>
        <p>click <a href='seq-1/idx'>here</a> to join</p>
    </div>
    <div id='bottom'>
        <div id='left'>
            <div class='title'>LIVE PERFORMANCES FROM INVITED ARTISTS</div>
            <div class='times'>
                <p>Modern Institute - 13 August 7pm BST</p>
                <p>Ewa Justka - 19 August 7pm BST</p>
                <p>Beatrice Dillon - 26 August 7pm BST</p>
                <p>Nyege Nyege - 31 August 7pm BST</p>
                <p>Errorsmith - 2 September 7pm BST</p>
                <p>More artists TBC</p>
            </div>
    
            <div>
                When you join a session you will be able to hear, watch and also take part in the performance. Please be aware that any changes you make will be heard by everyone else, so interact considerately, and give room for others to work together.
            </div>
        
            <div>
                There is no entry fee for the performances. Please consider making a <a href='https://rema-online.org.uk' target='_blank'>donation</a> to <a target='_blank' href='https://rema-online.org.uk/'>Rotherham Ethnic Minority Alliance</a>,  a charity we support.
            </div>

            <div class='credit'>
                <p><a target="_blank" href="http://www.markfell.com/wiki/">Mark Fell</a> and <a target="_blank" href="https://riantreanor.bandcamp.com/">Rian Treanor</a></p>
                <p>Programming by <a target="_blank" href="https://www.jamesbradbury.xyz">James Bradbury</a></p>
                <p>Graphic Design by <a target="_blank" href="https://qubik.com/">Joe Gilmore</a></p>
                <p>Commissioned by No Bounds 2021 </p>
            </div> 
        </div>
        <div id='right'>
            <div class='title'>WORKSHOPS</div>
            <div>
                Open call for free music workshop with Rian Treanor & Mark Fell
            </div>
            <div>
                The workshop will focus on exploring this new online music platform, where people interact together in real time, using pattern generating procedures and digital synthesis. As an inclusive project we want to work with people of different backgrounds, age groups, and abilities. It is open to participants with varying levels of musical expertise, including people with no previous experience and additional needs. The workshop consists of two separate sessions, each of which is 90 minutes long. Workshop dates will be agreed with selected participants. Participants will need access to a computer and a stable internet connection.
            </div>

            <div>
                Places are limited, to express your interest in joining these sessions please <a target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLScKekf6Et-p2fp7GVEdgcwy1j-nZN2uLRWtZV4-23k_LWfteA/viewform'>complete this form</a>.
            </div>
        </div>
    </div>
</div>


<style>

    .container {
        display: grid;
        grid-template-rows: auto auto;
        min-width: 1px;
        max-width: 60%;
        margin: 0 auto;
        text-align: left;
        padding-top: 20px;
        gap: 35px;
        font-size: 14px;
        
    }

    .title {
        font-size: 16px;
        font-weight: bold;
    }

    #top {
        display: flex;
        flex-direction: column;
        max-width: 50%;
    }

    #bottom {
        display: grid;
        grid-template-columns: 50% 50%;
        max-width: 100%;

    }

    #left, #right {
        display: flex;
        flex-direction: column;
        gap: 2em;
    }

    #left {
        margin-right: 15px;
    }

    #right {
        margin-left: 15px;
    }

    .times{
        display: flex;
        flex-direction: column;
    }

    .credit {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-top: 1em;
        color: var(--primary-color)
    }

    @media(max-width: 1200px) {
        .container {
            max-width: 80%;
        }
    }
</style>