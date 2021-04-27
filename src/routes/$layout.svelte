<script>
    import '../app.css';
</script>

<slot />

<footer>
    <span>
        <a target="_blank" href="http://www.markfell.com/wiki/">Mark Fell</a> & <a target="_blank" href="https://riantreanor.bandcamp.com/">Rian Treanor</a>
    </span>
    <span>
        Commissioned by No Bounds / Hope Works 2020
    </span>
    <span>
        Programming by <a target="_blank" href="https://www.jamesbradbury.xyz">James Bradbury</a>
    </span>
    <span>
        Graphic Design by <a target="_blank" href="https://qubik.com/">Joe Gilmore</a>
    </span>
</footer>

<style>
    footer {
        max-width: 50%;
        margin: 0 auto;
        padding-top: 1em;
        display: flex;
        flex-direction: column;
    }
</style>