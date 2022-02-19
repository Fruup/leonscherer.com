<script lang="ts">
	import { setCurrentTrackById } from "$lib/audio";
	import type { TrackMeta } from "$lib/helpers/types";

	// props
	export let track: TrackMeta;
</script>

<div class="track">
	<div class="button-container">
		<button on:click={() => setCurrentTrackById(track.id, true)}>
			<img
				src={track.coverUrl}
				alt={`${track.title} cover image`}
				width="100%"
			/>
		</button>
	</div>
</div>

<style lang="scss">
	@import "../../globals.scss";

	div.track {
		border: 1px solid black;

		background-color: $dark-color;

		max-width: 256px;

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
