<footer>
    <span class="no-hover">
        <a target="_blank" href="http://www.markfell.com/">Mark Fell</a> and
        <a target="_blank" href="http://www.riantreanor.com/">Rian Treanor</a>
    </span>
    <span class="no-hover">
        Programming by <a target="_blank" href="https://www.jamesbradbury.net"
            >James Bradbury</a>
    </span>
    <span class="no-hover">
        Comissioned by <a target="_blank" href="https://www.aaassembly.org/"
            >Algorithmic Art Assembly 2022</a>
    </span>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: column;
        margin-top: 2em;
        color: var(--primary);
        font-size: 10px;
        text-align: left;
        gap: 0.1em;
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
