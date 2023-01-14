import adapter from '@sveltejs/adapter-static'
// import adapter from '@sveltejs/adapter-auto'
import { mdsvex } from 'mdsvex'
import sveltePreprocess from 'svelte-preprocess'
import autoprefixer from 'autoprefixer'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		sveltePreprocess({
			postcss: {
				plugins: [autoprefixer()],
			},
			scss: {
				prependData: `
					@import 'src/lib/styles/globals';
				`,
			},
		}),
		mdsvex({
			extensions: ['.svx'],
			layout: 'src/lib/BlogLayout.svelte',
		}),
	],

	extensions: ['.svelte', '.svx'],

	kit: {
		adapter: adapter(),
		alias: {
			$content: 'content',
		},
	},
}

export default config
