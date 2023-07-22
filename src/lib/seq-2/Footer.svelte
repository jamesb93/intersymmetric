<footer>
    <div class="no-hover credits">
        <a target="_blank" href="http://www.markfell.com/">Mark Fell</a>
        <a target="_blank" href="http://www.riantreanor.com/">Rian Treanor</a>
        <a target="_blank" href="https://www.jamesbradbury.net">James Bradbury</a>
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

    .credits {
        display: flex;
        flex-direction: column;
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
        max-width: max-content;
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
