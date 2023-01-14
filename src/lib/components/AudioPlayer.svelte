<script lang="ts">
	import { audioStore, audioStoreData, getCurrentTrack, setCurrentTrackByIndex } from '$lib/audio'
	import { fade } from 'svelte/transition'
	import PlaybackSlider from '$lib/components/PlaybackSlider.svelte'
	import type { TrackMeta } from '$lib/helpers/types'
	import { onMount } from 'svelte'
	import PlaybackButton from './PlaybackButton.svelte'
	import IconPlay from '$lib/icons/IconPlay.svelte'

	// functions
	onMount(() => {
		// currentTrack = audioStoreData.tracks[i]

		setTimeout(() => {
			ready = true
			hidden = false
		}, 500)

		// subscribe and clean up after
		return audioStore.subscribe((s) => {
			if (s.playing && !s.wasPlaying) hidden = false
			currentTrack = getCurrentTrack(s)
		})
	})

	// props
	export let ready = false
	export let hidden = true

	export let currentTrack: Partial<TrackMeta> | undefined = undefined
	// $: currentTrack = $audioStore.tracks[$audioStore.currentTrackIndex]

	// computed
	$: showCoverArtist =
		currentTrack?.coverApproved && currentTrack?.coverArtist && currentTrack?.coverArtistUrl

	// paths
	const SVG_ARROW_UP = '/svg/arrow-up.svg'
</script>

<footer
	on:mouseenter={() => hidden && (hidden = false)}
	on:click={() => hidden && (hidden = false)}
	on:keydown={() => hidden && (hidden = false)}
	class:hidden
	class:ready
>
	{#if ready}
		<div class="content" transition:fade>
			<button
				class="show-hide"
				on:click={(e) => {
					e.stopPropagation()
					hidden = !hidden
				}}
			>
				<img class="arrow" class:hidden src={SVG_ARROW_UP} alt="X" />
			</button>

			{#if hidden}
				<!-- hidden -->

				<div class="hidden-container" in:fade={{ delay: 800 }} out:fade={{ duration: 100 }}>
					<div class="icon-container center-content">
						<IconPlay width="16px" fill="#666" />
					</div>

					{#if currentTrack}
						<div style="margin-left: 1rem;" class="center-content">
							<span class="title">{currentTrack.title}</span>
						</div>
					{/if}
				</div>
			{:else}
				<!-- not hidden -->

				<div class="container center-content" transition:fade>
					<div class="center-content">
						<PlaybackButton />
					</div>

					<div class="progress-and-meta">
						{#if currentTrack}
							<div style="width: 100%;">
								<div class="meta">
									<span class="title">
										{currentTrack.title}
									</span>
									{#if showCoverArtist}
										<span class="artist">
											<i>
												Cover art by <a
													href={currentTrack.coverArtistUrl}
													target="_blank"
													rel="noreferrer"
												>
													{currentTrack.coverArtist}
												</a>
											</i>
										</span>
									{/if}
								</div>

								<PlaybackSlider />
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</footer>

<style lang="scss">
	// variables
	$bp: 500px;

	footer {
		--player-max-width: 600px;
		--hide-duration: 300ms;
	}

	.hidden-container {
		position: absolute;
		top: 0;
		left: 50%;

		transform: translateX(-50%);

		max-width: var(--player-max-width);
		height: $hidden-player-height;
		display: flex;
	}

	div.content {
		width: 100%;
		max-width: var(--player-max-width);
	}

	footer {
		color: white;

		display: grid;
		place-items: center;

		width: 100vw;
		height: $footer-height;

		border-top: 1px solid white;

		background: $dark-color;

		position: fixed;
		bottom: 0;

		transform: translateX(0);
		transition: transform var(--hide-duration) cubic-bezier(0.15, 0.57, 0.35, 0.95);

		div.container {
			box-sizing: border-box;
			border: 0 solid transparent;
			border-width: 0 1rem 0 1rem;

			display: flex;
			gap: 0.5rem;
		}

		button,
		&.hidden {
			cursor: pointer;
		}

		button.show-hide {
			--margin: 3px;
			--size: calc($hidden-player-height - 2 * var(--margin));

			position: absolute;
			top: var(--margin);
			right: var(--margin);

			width: var(--size);
			height: var(--size);

			display: grid;
			place-items: center;

			background: rgb(105, 105, 105);
			border: none;
			box-shadow: 0 2px 2px rgba(0, 0, 0, 0.267);
			border-radius: 999px;

			img.arrow {
				transition: transform var(--hide-duration) ease-out;
				transform: rotateZ(-180deg);

				&.hidden {
					transform: rotateZ(0deg);
				}
			}
		}

		div.progress-and-meta {
			width: 100%;

			div.meta {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				@media screen and (max-width: $bp) {
					flex-direction: column;
				}

				span {
					margin: auto 0.5rem;
				}

				a {
					color: white;

					&:hover {
						color: $accent-color;
					}
				}
			}
		}

		&.hidden {
			transform: translateY(calc(100% - $hidden-player-height));
		}

		&:not(.ready) {
			transform: translateY(100%);
		}
	}
</style>
