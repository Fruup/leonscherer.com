<script lang="ts">
	import Page from '$lib/components/Page.svelte'
	import { onMount } from 'svelte'
	import type { PageServerData } from './$types'

	onMount(() => {
		localStorage.removeItem('lastBlogPost')
	})

	export let data: PageServerData
	const { posts } = data
</script>

<svelte:head>
	<title>Blog - Leon Scherer</title>
</svelte:head>

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
	div {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	a {
		font-size: 1rem;

		border: 1px solid black;
		border-radius: 12px;

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
