<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import type { BlogMeta } from "$lib/helpers/types";

	export const load: Load = async ({ fetch }) => {
		const res = await fetch("/blog.json");
		const posts: BlogMeta[] = await res.json();

		return {
			status: 200,
			props: { posts },
		};
	};

	// export const prerender = true;
</script>

<script lang="ts">
	import Page from "$lib/components/Page.svelte";
	import { onMount } from "svelte";

	onMount(() => {
		localStorage.removeItem("lastBlogPost");
	});

	export let posts: BlogMeta[] = [];
</script>

<Page>
	<div>
		{#each posts as post}
			<a href="/blog/{post.slug}">
				<h1>{post.title}</h1>
				{#if post.excerpt}
					<span class="excerpt">{post.excerpt}</span>
				{/if}
			</a>
		{/each}
	</div>
</Page>

<style lang="scss">
	@import "src/globals";
	@import "src/style/mixins";

	div {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	a {
		font-size: 1rem;

		border: 1px solid black;
		border-radius: 4px;

		padding: 1rem;

		@include drop-shadow;

		&:hover {
			border-color: $accent-color;
			color: black;
		}

		text-decoration: none;

		& h1 {
			text-decoration: underline $accent-color;
		}
	}

	h1 {
		font-size: 2em;
		margin: 0;
	}

	.excerpt {
		font-size: 1em;
	}
</style>
