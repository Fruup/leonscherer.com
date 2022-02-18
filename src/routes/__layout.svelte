<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { initAudio, MUSIC_CONTENT_URL } from "$lib/audio";
	import type { MetaResponseBody, TrackMeta } from "$lib/helpers/types";
	import { browser } from "$app/env";

	export const load: Load = async ({ fetch }) => {
		// load track meta data
		const response = await fetch("/music/meta.json");
		const data: MetaResponseBody = await response.json();

		// read current track index from storage
		var currentTrackIndex = browser
			? parseInt(localStorage.getItem("lastTrackIndex"))
			: data.length - 1;

		// init audio manager
		initAudio(
			data.map(
				(t, i) =>
					({
						...t,
						//coverUrl: t.coverApproved ? (t.coverUrl || `${url}/${t.id}.jpg`) : `${url}/default.jpg`,
						coverUrl: t.coverUrl || `${MUSIC_CONTENT_URL}/${t.id}.jpg`,
					} as TrackMeta)
			),
			currentTrackIndex
		);

		// return
		return { status: 200 };
	};
</script>

<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import { onMount } from "svelte";

	onMount(() => {
		localStorage.removeItem("lastBlogPost");
	});

	// lazy load audio player component
	const AudioPlayer = import("$lib/components/AudioPlayer.svelte").then(
		(v) => v.default
	);
</script>

<Header />

<main class="page-container">
	<slot />
</main>

{#await AudioPlayer then AudioPlayer}
	<svelte:component this={AudioPlayer} />
{:catch error}
	{@debug error}
{/await}

<style lang="scss">
	@import "../globals.scss";

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
