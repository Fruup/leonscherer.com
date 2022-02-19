<script lang="ts">
	import { audioStore, togglePlayback } from "$lib/audio";
	import IconPause from "$lib/icons/IconPause.svelte";
	import IconPlay from "$lib/icons/IconPlay.svelte";
	import { fade, type TransitionConfig } from "svelte/transition";

	// animation
	const transitionConfig: TransitionConfig = { delay: 0, duration: 50 };
</script>

<button
	class="playback center-content"
	on:click={togglePlayback}
	on:keydown={(e) => {
		if (e.key === " ") {
			e.preventDefault();
			e.stopPropagation();
		}
	}}
>
	{#if $audioStore.playing}
		<div class="icon-container" transition:fade={transitionConfig}>
			<IconPause />
		</div>
	{:else}
		<div class="icon-container" transition:fade={transitionConfig}>
			<IconPlay />
		</div>
	{/if}
</button>

<style lang="scss">
	button.playback {
		position: relative;
		top: 0;
		left: 0;

		cursor: pointer;

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
	}

	.icon-container {
		width: 35%;

		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
