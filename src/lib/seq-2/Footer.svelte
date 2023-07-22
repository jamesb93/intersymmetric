<footer>
    <div class="no-hover credits">
        <a target="_blank" href="http://www.markfell.com/">Mark Fell</a>
        <a target="_blank" href="http://www.riantreanor.com/">Rian Treanor</a>
        <a target="_blank" href="https://www.jamesbradbury.net">James Bradbury</a>
    </div>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: column;
        width: 100%;
        color: var(--primary);
        text-align: left;
        font-size: 10px;
        -webkit-text-size-adjust: none;
    }

    .credits {
        display: flex;
        flex-direction: column;
        max-width: 1005px;
        width: min(1005px, 80%);
        margin: 0 auto;
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
