<script>
	import { page } from "$app/stores";

	import Link from "$lib/components/Link.svelte";
	import SocialLink from "$lib/components/SocialLink.svelte";
	import { onMount } from "svelte";
	import IconGitHub from "./icons/IconGitHub.svelte";
	import IconInstagram from "./icons/IconInstagram.svelte";
	import IconTwitter from "./icons/IconTwitter.svelte";

	$: blogUrl = $page.url.pathname.startsWith("/blog")
		? "/blog"
		: typeof localStorage !== "undefined"
		? (localStorage.getItem("lastBlogPost") || "/blog")
		: "/blog";

	// var blogUrl = "/blog";
</script>

<header>
	<nav>
		<div class="pages">
			<Link href="/portfolio">Portfolio</Link>
			<Link href="/music">Music</Link>
			<Link href={blogUrl}>Blog</Link>
			<Link href="/about">About</Link>
			<Link href="/contact">Contact</Link>
		</div>

		<div class="social">
			<SocialLink href="https://twitter.com/leon_stuff" icon={IconTwitter} />
			<SocialLink
				href="https://instagram.com/leonscherersan"
				icon={IconInstagram}
			/>
			<SocialLink href="https://github.com/Fruup" icon={IconGitHub} />
		</div>
	</nav>
</header>

<style lang="scss">
	header {
		--link-height: 2.6rem;

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

			padding-top: 3rem;

			div {
				display: flex;
				gap: 0.2rem;

				height: var(--link-height);
			}
		}
	}

	@media screen and (max-width: 700px) {
		.social {
			display: none;
		}
	}
</style>
