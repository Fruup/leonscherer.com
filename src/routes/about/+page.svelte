<script>
	import Page from '$lib/components/Page.svelte'
</script>

<svelte:head>
	<title>About - Leon Scherer</title>
</svelte:head>

<Page>
	<div class="about">
		<p class="intro">
			Hey! My name is Leon. I'm a computer science enthusiast currently living in Mainz, Germany. In
			my free time I like to code and make music. Here's what this website could mean to you:
		</p>

		<h2>If you are an artist</h2>
		<p>
			and you find one of your artworks fits a piece of music I wrote, send me a message because I
			would love to use it as cover art!
		</p>

		<h2>If you are a game developer or filmmaker</h2>
		<p>and you need music or sound effects for your project, I would gladly be part of the team.</p>

		<h2>If you like this website</h2>
		<p>
			and you are in need of one yourself, I can offer you experience with full-stack web
			development using React, Vue and Svelte (with which this page was created).
		</p>

		<h2>ANYWAY</h2>
		<p>
			<!-- &#x1F60A; is a smiling emoji -->
			thank you so much for spending a minute to look at my work &#x1F60A;
		</p>

		<h2>Legal information</h2>
		<p class="no-ellipsis">
			Leon Scherer<br />
			c/o autorenglück.de<br />
			Franz-Mehring-Str. 15<br />
			01237 Dresden<br />
		</p>
	</div>
</Page>

<style lang="scss">
	.about {
		font-size: 1.2rem;
		text-align: left;

		margin: 10px 20px;
	}

	h2 {
		font-size: 25px;
	}

	h2::after,
	p:not(.no-ellipsis)::before {
		content: '...';
	}

	p.intro::before {
		content: none;
	}
</style>
