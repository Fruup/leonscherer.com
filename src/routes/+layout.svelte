<script lang="ts">
	import Header from '$lib/components/Header.svelte'
	import { onMount } from 'svelte'
	import Sidebar from '$lib/components/Sidebar.svelte'
	import type AudioPlayer from '$lib/components/AudioPlayer.svelte'
	import '$lib/styles/fonts.sass'
	import '$lib/styles/app.sass'

	onMount(() => {
		// lazy load audio player component
		audioPlayer = import('$lib/components/AudioPlayer.svelte').then((v) => v.default)
	})

	let audioPlayer: Promise<typeof AudioPlayer>
</script>

<Header />
<Sidebar />

<main class="page-container">
	<slot />
</main>

{#if audioPlayer}
	{#await audioPlayer then audioPlayer}
		<svelte:component this={audioPlayer} />
	{:catch error}
		{@debug error}
	{/await}
{/if}

<style lang="scss">
	:global(:root) {
		font-family: 'Raleway';
	}

	:global(a) {
		color: black;
		text-decoration: underline;
		text-decoration-color: $accent-color;
		text-decoration-thickness: 2px;

		transition: text-decoration-thickness 100ms ease-out;

		&:active {
			color: black;
		}
	}

	:global(a:hover) {
		color: $accent-color;
		text-decoration-thickness: 3px;
	}

	main.page-container {
		text-align: center;

		// make element positioned for pages to be positioned absolutely
		position: relative;
		top: 0;
		left: 0;

		margin: auto;
		margin-top: 2rem;
		max-width: 1000px;
	}
</style>
