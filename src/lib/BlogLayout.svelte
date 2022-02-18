<script>
	import { page } from "$app/stores";

	import { onMount } from "svelte";
	import Page from "./components/Page.svelte";

	onMount(() => {
		// write last page to local storage
		localStorage.setItem("lastBlogPost", $page.url.pathname);
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="/prism.css" />
</svelte:head>

<Page>
	<article>
		<slot />
	</article>
</Page>

<style global>
	article {
		text-align: left;
		margin: 0 0.75rem;

		font-size: 1.2rem;
		line-height: 135%;
	}

	article h1 {
		font-size: 2em;
		line-height: 110%;

		margin: 0 0 0.5rem 10%;
	}

	article :not(pre) > code {
		background-color: rgba(0, 0, 0, 0.075);
		padding: 0.05em 0.25em;
		border-radius: 4px;
	}
</style>
