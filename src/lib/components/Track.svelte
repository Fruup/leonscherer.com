<script lang="ts">
	import { loadAudio, setCurrentTrackById } from "$lib/audio";
	import type { TrackDescription } from "$lib/helpers/types";

	// preload track on mouse hover
	function handleMouseEnter() {
		if (track.howl.state() === "unloaded") {
			// preload track after some amount of time
			clearTimeout(timer);
			timer = setTimeout(() => loadAudio(track), TIMEOUT);
		}
	}

	// timer
	var timer: NodeJS.Timeout;
	const TIMEOUT = 500;

	// props
	export let track: TrackDescription;

	// $: coverUrl = track.coverApproved ?
	// 	`/covers/${track.coverUrl || track.id + ".jpg"}` :
	// 	'/covers/default.jpg';

	$: coverUrl = track.coverUrl;
</script>

<div class="track">
	<div class="button-container">
		<button
			on:click={() => setCurrentTrackById(track.id, true)}
			on:mouseenter={handleMouseEnter}
			on:mouseleave={() => clearTimeout(timer)}
		>
			<img src={coverUrl} alt={`${track.title} cover image`} width="100%" />
		</button>
	</div>
</div>

<style lang="scss">
	@import "../../globals.scss";

	div.track {
		border: 1px solid black;

		background-color: $dark-color;

		flex-basis: 12rem;
		flex-shrink: 1;
		flex-grow: 1;

		@media screen and (max-width: 786px) {
			flex-basis: 9rem;
		}

		div.button-container {
			display: grid;
			border: none;
			width: 100%;
			height: 0;
			padding-bottom: 100%;
			background-color: $dark-color;

			button {
				background-color: $dark-color;

				margin: 0;
				padding: 0;

				width: 100%;
				height: 100%;

				border: 0px solid $dark-color;

				box-sizing: border-box;

				display: grid;
				place-items: center;

				transition: border-width 100ms;

				img {
					background-color: $dark-color;
				}

				&:hover {
					cursor: pointer;
					border-width: 0.5rem;
				}
			}
		}
	}
</style>
