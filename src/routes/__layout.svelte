<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { initAudio } from "$lib/audio";
	import type { MetaResponseBody, TrackDescription } from "$lib/helpers/types";
	import { Howl } from "howler";
	import { browser } from "$app/env";

	export const load: Load = async ({ fetch }) => {
		// load track meta data
		const response = await fetch("/music/meta.json");
		const data: MetaResponseBody = await response.json();

		// read current track index from storage
		var currentTrackIndex = browser ? parseInt(localStorage.getItem('lastTrackIndex')) : data.length - 1;

		// init audio manager
		const url =
			"https://raw.githubusercontent.com/Fruup/leonscherer.com/master/content/music";

		initAudio(
			data.map((t, i) => <TrackDescription>({
				...t,
				//coverUrl: t.coverApproved ? (t.coverUrl || `${url}/${t.id}.jpg`) : `${url}/default.jpg`,
				coverUrl: t.coverUrl || `${url}/${t.id}.jpg`,
				howl: new Howl({
					preload: i === currentTrackIndex,
					src: `${url}/${t.id}.mp3`,
				}),
			})),
			currentTrackIndex
		);

		// return
		return { status: 200 };
	};
</script>

<script lang="ts">
	import AudioPlayer from "$lib/components/AudioPlayer.svelte";
	import Header from "$lib/components/Header.svelte";
	// import { audioStore } from "$lib/audioStore";
	// import { browser } from "$app/env";

	// if (browser) {
	// 	document.onkeydown = (e) => {
	// 		if (e.key === " ") {
	// 			// prevent scrolling with space bar
	// 			//e.preventDefault();
	// 			// pause/resume playback
	// 			//audioStore.togglePlayback();
	// 		}
	// 	};
	// }
</script>

<Header />

<main class="page-container">
	<slot />
</main>

<AudioPlayer />

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
