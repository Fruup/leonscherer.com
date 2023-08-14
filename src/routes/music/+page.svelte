<script lang="ts">
	import Page from '$lib/components/Page.svelte'
	import Track from '$lib/components/Track.svelte'
	import { audioStore } from '$lib/audio'
	import { fly, type FlyParams } from 'svelte/transition'
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'

	const computeTransitionArgs = (index: number): FlyParams => ({
		duration: 200,
		delay: (index * 1000) / $audioStore.tracks.length,
		y: 20,
	})

	let mounted = false

	onMount(() => {
		mounted = true
	})
</script>

<svelte:head>
	<title>Music - Leon Scherer</title>
</svelte:head>

<Page>
	<div class="track-list">
		{#each $audioStore.tracks as track, i}
			<!-- This is necessary for the transition to play on intro. -->
			{#if !browser || mounted}
				<article in:fly={computeTransitionArgs(i)}>
					<Track {track} />
				</article>
			{/if}
		{/each}
	</div>
</Page>

<style lang="scss">
	.track-list {
		margin: auto;
		text-align: center;

		display: flex;
		gap: 0.15rem;
		flex-wrap: wrap;

		margin-bottom: 1.5rem;
	}

	article {
		max-width: 256px;

		flex-basis: 12rem;
		flex-shrink: 1;
		flex-grow: 1;

		@media screen and (max-width: 786px) {
			flex-basis: 9rem;
		}
	}
</style>
