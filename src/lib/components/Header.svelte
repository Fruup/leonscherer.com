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
			<Link href="/portfolio">Portfolio</Link>
			<Link href={blogUrl}>Blog</Link>
			<Link href="/about">About</Link>
			<Link href="/contact">Contact</Link>
		</div>

		<div class="social">
			<Link href="https://twitter.com/leon_stuff" circular filled><IconTwitter /></Link>
			<Link href="https://instagram.com/leonmaj7" circular filled><IconInstagram /></Link>
			<Link href="https://github.com/Fruup" circular filled><IconGitHub /></Link>
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
