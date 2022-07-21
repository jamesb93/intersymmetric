import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter(),
		trailingSlash: 'always'
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
