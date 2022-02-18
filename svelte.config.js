import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess(),
		mdsvex({
			extensions: [".svx"],
			layout: "src/lib/BlogLayout.svelte",
		}),
	],

	extensions: [".svelte", ".svx"],

	kit: {
		adapter: adapter(),
	},
};

export default config;
