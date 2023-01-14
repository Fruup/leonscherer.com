<script lang="ts">
	import { initAudioEngine } from '$lib/audio'
	import Header from '$lib/components/Header.svelte'
	import type { TrackMeta } from '$lib/helpers/types'
	import { onMount, SvelteComponent } from 'svelte'
	import type { LayoutData } from './$types'
	import '$lib/styles/fonts.sass'
	import '$lib/styles/app.sass'
	import Sidebar from '$lib/components/Sidebar.svelte'

	export let data: LayoutData
	const { trackMeta } = data

	onMount(async () => {
		if (!trackMeta) return

		localStorage.removeItem('lastBlogPost')

		const defaultCoverURL = (await import('$lib/assets/default.svg?url')).default

		// get load track cover URLs
		const tracks = await Promise.all(
			trackMeta.map(async (t, i) => {
				const coverURLs = import.meta.glob('$content/music/webp/*.webp', { as: 'url' })
				const match = Object.keys(coverURLs).find((filename) => filename.includes(t.id))!
				const url = await coverURLs[match]()

				return {
					...t,
					coverUrl: t.coverApproved ? t.coverUrl || url : defaultCoverURL,
				} as TrackMeta
			}),
		)

		// read current track index from storage
		const storedTrackIndex = localStorage.getItem('currentTrackIndex')
		const currentTrackIndex = storedTrackIndex ? parseInt(storedTrackIndex) : tracks.length - 1

		// init audio manager
		initAudioEngine(tracks, currentTrackIndex)

		// lazy load audio player component
		AudioPlayer = import('$lib/components/AudioPlayer.svelte').then((v) => v.default)
	})

	let AudioPlayer: Promise<typeof SvelteComponent>
</script>

<Header />
<Sidebar />

<main class="page-container">
	<slot />
</main>

{#if AudioPlayer}
	{#await AudioPlayer then AudioPlayer}
		<svelte:component this={AudioPlayer} />
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
