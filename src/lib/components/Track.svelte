<script lang="ts">
	import IconAudioPlaying from '$lib/assets/IconAudioPlaying.svelte'
	import { setCurrentTrackById, audioStore } from '$lib/audio'
	import type { TrackMeta } from '$lib/helpers/types'
	import { fade } from 'svelte/transition'

	// props
	export let track: TrackMeta

	$: currentTrackId = $audioStore.tracks[$audioStore.currentTrackIndex].id
</script>

<div class="track">
	{#if currentTrackId === track.id}
		<div transition:fade={{ duration: 200 }} class="playing-icon">
			<IconAudioPlaying />
		</div>
	{/if}

	<div class="button-container">
		<button on:click={() => setCurrentTrackById(track.id, true)}>
			<img src={track.coverUrl} alt={`${track.title} cover image`} width="100%" />
		</button>
	</div>
</div>

<style lang="scss">
	div.track {
		position: relative;

		border: 1px solid black;
		border-radius: 12px;
		overflow: hidden;

		background-color: $dark-color;

		.playing-icon {
			width: 1.5em;
			height: 1.5em;
			padding: 0.5em;

			position: absolute;
			bottom: 0.5em;
			left: 50%;
			translate: -50%;
			background: radial-gradient(closest-side, rgba(0, 0, 0, 0.3), transparent);
			z-index: 1;
		}

		div.button-container {
			display: grid;
			border: none;
			width: 100%;
			height: 0;
			padding-bottom: 100%;
			background: $dark-color;

			button {
				background: $dark-color;

				margin: 0;
				padding: 0;

				width: 100%;
				height: 100%;

				border: none;

				box-sizing: border-box;

				display: grid;
				place-items: center;

				img {
					background: $dark-color;
					transition: transform 100ms;
					border-radius: 8px;
				}

				&:hover {
					cursor: pointer;
					img {
						transform: scale(0.925);
					}
				}
			}
		}
	}
</style>
