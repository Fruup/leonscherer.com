<script lang="ts">
	import {
		audioStore,
		audioStoreData,
		getCurrentTrack,
		setCurrentTrackByIndex,
		togglePlayback,
	} from "$lib/audio";
	import { fade } from "svelte/transition";
	import PlaybackSlider from "$lib/components/PlaybackSlider.svelte";
	import type { TrackDescription } from "$lib/helpers/types";
	import { onMount } from "svelte";
	import PlayIcon from "$lib/icons/PlayIcon.svelte";

	// functions
	onMount(() => {
		// get first track index
		const i = localStorage.getItem("currentTrackIndex");
		setCurrentTrackByIndex(
			typeof i === "number" ? i : audioStoreData.tracks.length - 1
		);
		currentTrack = audioStoreData.tracks[i];

		setTimeout(() => {
			ready = true;
			hidden = false;
		}, 500);

		// subscribe and clean up after
		return audioStore.subscribe((s) => {
			if (s.playing && !s.wasPlaying) hidden = false;
			currentTrack = getCurrentTrack(s);
		});
	});

	// props
	export let ready = false;
	export let hidden = true;

	export let currentTrack: Partial<TrackDescription> = undefined;

	// computed
	$: showCoverArtist =
		currentTrack?.coverApproved &&
		currentTrack?.coverArtist &&
		currentTrack?.coverArtistUrl;

	// $: if ($audioStore.currentTrackIndex >= 0 && $audioStore.currentTrackIndex < $audioStore.tracks.length)
	// 		currentTrack = $audioStore.tracks[$audioStore.currentTrackIndex];

	// animation
	const duration = 50;
</script>

<footer
	on:mouseenter={() => hidden && (hidden = false)}
	on:click={() => hidden && (hidden = false)}
	class:hidden
>
	{#if ready}
		<div class="content" transition:fade>
			<button
				class="show-hide"
				on:click={(e) => {
					e.stopPropagation();
					hidden = !hidden;
				}}
			>
				<img class="arrow" class:hidden src="/svg/arrow-up.svg" alt="X" />
			</button>

			{#if hidden}
				<!-- hidden -->

				<div
					class="hidden-container"
					in:fade={{ delay: 800 }}
					out:fade={{ duration: 100 }}
				>
					<div class="icon-container center-content">
						<PlayIcon
							fill="rgb(105, 105, 105)"
							alt="Playing"
							width="24"
							height="24"
						/>
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
						<button
							class="playback"
							on:click={togglePlayback}
							on:keydown={(e) => {
								if (e.key === " ") {
									e.preventDefault();
									e.stopPropagation();
								}
							}}
						>
							{#if $audioStore.playing}
								<img
									transition:fade={{ delay: 0, duration: 50 }}
									src="/svg/pause.svg"
									alt=""
									width="35%"
								/>
							{:else}
								<img
									transition:fade={{ delay: 0, duration: 50 }}
									src="/svg/play.svg"
									alt=""
									width="35%"
								/>
							{/if}
						</button>
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
	@import "../../globals.scss";

	// variables
	$bp: 500px;

	footer {
		--hidden-height: 36px;
		--player-max-width: 600px;
		--hide-duration: 300ms;
	}

	.hidden-container {
		position: absolute;
		top: 0;
		left: 50%;

		transform: translateX(-50%);

		max-width: var(--player-max-width);
		height: var(--hidden-height);
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
		transition: transform var(--hide-duration)
			cubic-bezier(0.15, 0.57, 0.35, 0.95);

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
			--size: calc(var(--hidden-height) - 2 * var(--margin));

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

		button.playback {
			position: relative;
			top: 0;
			left: 0;

			width: 60px;
			height: 60px;
			flex-grow: 0;
			flex-shrink: 0;
			padding: 0;

			border: none;
			border-radius: 999px;

			background-color: white;
			box-shadow: 0 6px 5px rgba(0, 0, 0, 0.26);

			transition: transform 25ms ease-out;

			&:hover {
				transform: scale(1.1);
			}

			img {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
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
			transform: translateY(calc(100% - var(--hidden-height)));
		}
	}
</style>
