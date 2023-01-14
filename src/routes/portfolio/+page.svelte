<script lang="ts">
	import Page from '$lib/components/Page.svelte'
	import PortfolioCard from '$lib/components/PortfolioCard.svelte'

	const portfolio = [
		{
			title: 'Internal Company App',
			text:
				"I wrote a mobile web app that is accessible in the company's intranet. " +
				'Its purpose is to make regularly executed processes fast and intuitive. ' +
				'Sending a restock order to suppliers should be as easy as scanning the corresponding QR code and pressing a button. ' +
				'Seeing where to find the material needed for my task ought to be as easy as looking on my phone. ' +
				"The app can be extended infinitely, fitting the company's needs.",
			tech: ['React', 'PWA', 'SQL Server'],
		},
		{
			title: 'Personal Website',
			imgUrl:
				'https://raw.githubusercontent.com/Fruup/leonscherer.com/testing/content/music/webp/p01.webp',
			text:
				'This website you are currently on is my personal place to publish creative endeavors. ' +
				'As you read your way through my blogs or portfolio, you can listen to music I wrote over ' +
				'the last couple of years. Through the power of the Single Page Application, there does not ' +
				'have to be a break from listening. While keeping things nice to use on desktop, ' +
				'a mobile-first approach to design is key in the web of today.',
			tech: ['Svelte & SvelteKit', 'Netlify', 'SPA'],
		},
		{
			title: 'A Blog Page',
			imgUrl: '/img/allaroundscorer.webp',
			text:
				'I built a blog page for a friend of mine, focussing on making his workflow as easy as possible. ' +
				'He writes markdown files containing the blog posts with some custom components I wrote. ' +
				'Then he runs a script and the whole page is built and deployed. ' +
				'Not everyone needs to know how to code.',
			tech: ['Vue & Nuxt', 'SSG'],
			link: 'https://all-around-scorer.soon.it/',
		},
	]
</script>

<svelte:head>
	<title>Portfolio - Leon Scherer</title>
</svelte:head>

<Page>
	{#each portfolio as card, i}
		<PortfolioCard {...card} />

		{#if i !== portfolio.length - 1}
			<hr />
		{/if}
	{/each}
</Page>

<style lang="scss">
	hr {
		margin: 1rem auto;
		max-width: 50%;

		height: 1px;
		border: none;
		background-color: black;
	}
</style>
