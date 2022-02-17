<script lang="ts">
	import Page from "$lib/components/Page.svelte";
	import Track from "$lib/components/Track.svelte";
	import { audioStore } from "$lib/audio";
</script>

<svelte:head>
	<title>Music - Leon Scherer</title>
</svelte:head>

<Page>
	<div class="track-list">
		{#each $audioStore.tracks as track}
			<Track {track} />
		{/each}
	</div>
</Page>

<style lang="scss">
	div.track-list {
		margin: auto;
		text-align: center;

		display: flex;
		gap: 0.15rem;
		flex-wrap: wrap;

		margin-bottom: 1.5rem;
	}
</style>
