<script context="module">
	export const sidebarOpen = writable(false)
</script>

<script lang="ts">
	import { afterNavigate } from '$app/navigation'
	import { page } from '$app/stores'
	import IconClose from '$lib/assets/IconClose.svelte'
	import IconGitHub from '$lib/icons/IconGitHub.svelte'
	import IconInstagram from '$lib/icons/IconInstagram.svelte'
	import IconTwitter from '$lib/icons/IconTwitter.svelte'
	import { writable } from 'svelte/store'
	import { fly } from 'svelte/transition'
	import SidebarLink from './SidebarLink.svelte'
	import SocialLink from './SocialLink.svelte'

	$: blogUrl = $page.url.pathname.startsWith('/blog')
		? '/blog'
		: typeof localStorage !== 'undefined'
			? localStorage.getItem('lastBlogPost') || '/blog'
			: '/blog'

	afterNavigate(({ type }) => {
		if (type !== 'link') return
		$sidebarOpen = false
	})
</script>

{#if $sidebarOpen}
	<aside transition:fly={{ x: 20 }}>
		<button class="close" on:click={() => ($sidebarOpen = false)}>
			<IconClose />
		</button>

		<nav>
			<div class="pages">
				<SidebarLink href="/music">Music</SidebarLink>
				<SidebarLink href="/portfolio">Portfolio</SidebarLink>
				<SidebarLink href={blogUrl}>Blog</SidebarLink>
				<SidebarLink href="/about">About</SidebarLink>
				<SidebarLink href="/contact">Contact</SidebarLink>
			</div>

			<div class="social">
				<SocialLink href="https://instagram.com/leonmaj7" iconOnly><IconInstagram /></SocialLink>
				<SocialLink href="https://github.com/Fruup" iconOnly><IconGitHub /></SocialLink>
				<SocialLink href="https://thesis.leonscherer.com/">Bachelor's thesis</SocialLink>
			</div>
		</nav>
	</aside>
{/if}

<style lang="scss">
	aside {
		--link-size: 3rem;

		z-index: 2000;

		position: fixed;
		inset: 0;
		left: auto;

		min-width: 300px;
		max-width: 600px;
		width: 50%;

		background: white;

		box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);

		@include center-content;
	}

	button.close {
		border: none;
		background: transparent;
		position: absolute;
		margin: 1rem;
		font-size: 1.5rem;
		width: 2.5em;
		height: 2.5em;
		top: 0;
		right: 0;
		border-radius: 100%;

		@include center-content;

		&:hover {
			background: rgba(0, 0, 0, 0.1);
		}
	}

	nav {
		display: flex;
		flex-direction: column;

		max-width: 300px;
	}

	.pages,
	.social {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.pages {
		flex-direction: column;
		margin-bottom: 100px;
	}
</style>
