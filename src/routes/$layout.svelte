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
        position: relative;
        width: 425px;
        margin: 0 auto;
        padding: 10px;
        padding-top: 1em;
        display: flex;
        flex-direction: column;
        box-shadow: 5px -5px 0 0 #59a245;
        border: 1px solid #59a245;
    }
</style>