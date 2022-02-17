<script>
	import Link from "$lib/components/Link.svelte";
	import SocialLink from "$lib/components/SocialLink.svelte";
</script>

<header>
	<nav>
		<div class="pages">
			<Link href="/portfolio">Portfolio</Link>
			<Link href="/music">Music</Link>
			<!-- <Link href="/blog">Blog</Link> -->
			<Link href="/about">About</Link>
			<Link href="/contact">Contact</Link>
		</div>

		<div class="social">
			<SocialLink href="https://twitter.com/leon_stuff">
				<img src="/svg/twitter-logo.svg" width="50%" alt="T" />
			</SocialLink>
			<SocialLink href="https://instagram.com/leonscherersan">
				<img src="/svg/instagram-logo.svg" width="50%" alt="I" />
			</SocialLink>
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
