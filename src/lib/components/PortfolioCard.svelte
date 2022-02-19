<script lang="ts">
	export let title: string = undefined;
	export let imgUrl: string = undefined;
	export let text: string = undefined;
	export let tech: string[] = undefined;
	export let link: string = undefined;
</script>

<!-- <a href={link} target="_blank"> -->
<article>
	{#if link}
		<a href={link} target="_blank"><h2>{title}</h2></a>
	{:else}
		<h2>{title}</h2>
	{/if}

	<div class="content">
		{#if imgUrl}
			<img src={imgUrl} alt="" width="100px" height="100%" />
		{/if}

		<p>{text}</p>
	</div>

	<div class="technologies">
		<span>Technologies</span>
		<div>
			{#each tech as item}
				<code>{item}</code>
			{/each}
		</div>
	</div>
</article>

<!-- </a> -->
<style lang="scss">
	// breakpoint
	$bp: 600px;

	article {
		font-size: 1.2rem;
		text-align: center;

		max-width: 650px;

		margin: auto;

		padding: 1.4rem 1.8rem;
		border-radius: 10px;
		box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.233);

		// display: flex;
		// flex-direction: column;
		// gap: 1rem;

		a,
		h2 {
			margin: auto;
		}

		p {
			text-align: justify;
		}

		div.content {
			height: 100%;
			margin-bottom: 0.5rem;

			flex-grow: 1;

			display: flex;
			flex-direction: row;
			justify-content: space-between;

			text-align: center;

			gap: 1rem;

			img {
				margin: auto;
				border: 1px solid rgba(0, 0, 0, 0.342);
				border-radius: 3px;

				@media screen and (max-width: $bp) {
					margin-top: 1rem;
				}
			}

			p {
				flex-grow: 1;
			}

			@media screen and (max-width: $bp) {
				flex-direction: column;
			}
		}

		span {
			text-decoration: underline;
			margin-top: 0.4rem;

			font-family: monospace;
			font-size: 1rem;
		}

		div.technologies {
			display: flex;
			flex-direction: row;

			div,
			span {
				flex-grow: 1;
				justify-content: space-evenly;
			}

			@media screen and (max-width: $bp) {
				flex-direction: column;
			}

			div {
				@media screen and (max-width: $bp) {
					margin-top: 0.75rem;
				}

				display: flex;
				flex-wrap: wrap;
				gap: 0.5rem;
			}
		}

		code {
			padding: 0.3rem 0.6rem;
			border-radius: 3px;
			background-color: white;
			font-size: 1rem;
			font-weight: bold;
			box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
			border: 1px solid grey;
		}
	}
</style>
