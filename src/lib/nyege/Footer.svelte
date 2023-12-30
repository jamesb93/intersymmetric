<footer>
    <div class="no-hover">
        <a target="_blank" href="http://www.markfell.com/">Mark Fell</a> and
        <a target="_blank" href="http://www.riantreanor.com/">Rian Treanor</a>
    </div>
    <div class="no-hover">
        Programming by <a target="_blank" href="https://www.jamesbradbury.net"
            >James Bradbury</a>
    </div>
    <div class="no-hover">
        Commissioned by <a target="_blank" href="https://noboundsfestival.co.uk/"
            >No Bounds</a>
        and
        <a target="blank" href="https://nyegenyege.com/">Nyege Nyege</a> festivals
    </div>
</footer>

<style>
    footer {
        bottom: 0;
        display: flex;
        flex-direction: column;
        color: var(--primary);
        text-align: left;
        gap: 0.1em;
        margin-top: 2em;
        font-size: 10px;
        -webkit-text-size-adjust: none;
    }

    @media only screen and (max-width: 1005px) {
        footer {
            justify-content: space-around;
            margin-bottom: 2em;
            margin-left: 2em;
        }
    }

    a {
        color: var(--primary);
    }

    a:link,
    a:visited {
        color: var(--primary);
    }

    a:hover,
    a:visited:hover {
        background-color: var(--primary);
        color: white;
    }
</style>
