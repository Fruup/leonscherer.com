<script lang="ts">
	import '$lib/styles/prism.css'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import Page from './components/Page.svelte'

	onMount(() => {
		// write last page to local storage
		localStorage.setItem('lastBlogPost', $page.url.pathname)
	})

	export let title = 'Blog'
</script>

<svelte:head>
	<title>{title} - Leon Scherer</title>
</svelte:head>

<Page>
	<article class="blog-post">
		<slot />
	</article>
</Page>

<style lang="scss">
	.blog-post {
		text-align: left;
		margin: 0 0.75rem;

		font-size: 1.2rem;
		line-height: 135%;
	}

	.blog-post :global(h1) {
		font-size: 2em;
		line-height: 110%;

		margin: 0.5em 0 0.5em 10%;
	}

	.blog-post :global(:not(pre) > code) {
		background-color: rgba(0, 0, 0, 0.075);
		padding: 0.05em 0.25em;
		border-radius: 4px;
	}

	.blog-post :global(pre) {
		border-radius: 6px;
	}
</style>
