<script>
  import RNBO from '@rnbo/js';
  import Interface from './interface/Interface.svelte';
  import Button from './Button.svelte';
  import { load_samples } from '$lib/common/patch_helpers';

  let ctx, d, patcher, context;
  let samples_loaded = false;

  const start = () => {
    ctx = window.AudioContext || window.webkitAudioContext;
    context = new ctx();
    let outputNode = context.createGain();
    outputNode.connect(context.destination);

    fetch('/aaa/code/patch.export.json')
      .then(response => response.json())
      .then(response => {
        patcher = response;
        return RNBO.createDevice({ context, patcher });
      })
      .then(device => {
        device.node.connect(outputNode);
        d = device;
        load_samples(d, context, 46, 'buf', '/aaa/samples/', 0);
        d.messageEvent.subscribe(e => {
          if (e.tag.includes('debug')) {
            console.log(e.tag, e.payload);
          }
        });
      })
      .then(() => {
        samples_loaded = true;
      })
      .catch(err => {
        console.error(err);
      });
  };
</script>

{#if d && samples_loaded}
  <Interface bind:patch={d} />
{:else}
  <div class="loading">
    <Button on:click={start} height={'60px'} width={'100px'} font_size={'24px'}>load</Button>
  </div>
{/if}

<!-- <a href='https://www.dropbox.com/sh/w7uso18978mbcu5/AAA9g_0PD4BaO-L1rnbvHb2Ha?dl=0'>presets</a> -->
<style>
  .loading {
    margin: 10em;
  }
</style>
