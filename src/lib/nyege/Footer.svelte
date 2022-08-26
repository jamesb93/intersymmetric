<footer>
  <div class="no-hover">
    <a target="_blank" href="http://www.markfell.com/wiki/">Mark Fell</a> and
    <a target="_blank" href="http://www.riantreanor.com/">Rian Treanor</a>
  </div>
  <div class="no-hover">
    Programming is not by <a target="_blank" href="https://www.jamesbradbury.net">James Bradbury</a>
  </div>
</footer>

<style>
  footer {
    position: absolute;
    bottom: 0;
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
