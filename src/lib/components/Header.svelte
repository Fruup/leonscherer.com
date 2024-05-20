<script>
	import { page } from '$app/stores'
	import IconBurger from '$lib/assets/IconBurger.svelte'

	import Link from '$lib/components/Link.svelte'
	import SocialLink from '$lib/components/SocialLink.svelte'
	import IconGitHub from '$lib/icons/IconGitHub.svelte'
	import IconInstagram from '$lib/icons/IconInstagram.svelte'
	import IconTwitter from '$lib/icons/IconTwitter.svelte'
	import PageTitle from './PageTitle.svelte'
	import { sidebarOpen } from './Sidebar.svelte'

	$: blogUrl = $page.url.pathname.startsWith('/blog')
		? '/blog'
		: typeof localStorage !== 'undefined'
			? localStorage.getItem('lastBlogPost') || '/blog'
			: '/blog'
</script>

<header>
	<PageTitle />

	<button class="sidebar-opener" on:click={() => ($sidebarOpen = true)}>
		<IconBurger />
	</button>

	<nav>
		<div class="pages">
			<Link href="/music">Music</Link>
			<!-- <Link href="/portfolio">Portfolio</Link> -->
			<!-- <Link href="/projects">Projects</Link> -->
			<Link href={blogUrl}>Blog</Link>
			<Link href="/about">About</Link>
			<Link href="/contact">Contact</Link>
		</div>

		<div class="social">
			<!-- <SocialLink href="https://twitter.com/leon_stuff" icon={IconTwitter} /> -->
			<SocialLink href="https://instagram.com/leonmaj7" iconOnly><IconInstagram /></SocialLink>
			<SocialLink href="https://github.com/Fruup" iconOnly><IconGitHub /></SocialLink>
			<SocialLink href="https://thesis.leonscherer.com/">Bachelor's thesis</SocialLink>
		</div>
	</nav>
</header>

<style lang="scss">
	header {
		--link-size: 2.6rem;

		position: relative;

		text-align: center;
		border-bottom: 1px solid black;

		nav {
			display: flex;
			justify-content: space-between;

			max-width: 1200px;

			margin: auto;

			box-sizing: border-box;
			border-left: 0.2rem solid transparent;
			border-right: 0.2rem solid transparent;

			div {
				display: flex;
				gap: 0.25rem;

				height: var(--link-size);
			}
		}
	}

	button.sidebar-opener {
		display: none;
		color: white;

		position: absolute;
		bottom: 0;
		right: 0;

		box-sizing: content-box;
		padding: 0.5em;
		width: 2em;
		height: 2em;
		background: $dark-color;

		border-top-left-radius: 8px;
	}

	@media screen and (max-width: $breakpoint) {
		header nav {
			display: none;
		}

		button.sidebar-opener {
			display: initial;
		}
	}
</style>
