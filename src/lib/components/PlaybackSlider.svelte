<script lang="ts">
	import { onMount } from 'svelte'
	import { progress } from '$lib/progressStore'

	// mount
	onMount(() => {
		// subscribe and clean up after
		return progress.subscribe((value) => {
			if (!seeking) currentProgress = value * max
		})
	})

	// methods
	const handleChange = () => {
		// update progress store
		const value = playbackRangeSlider.valueAsNumber / max
		$progress = value
	}

	const handlePointerDown = () => {
		seeking = true
	}

	const handlePointerUpWindow = () => {
		if (seeking) seeking = false
	}

	let playbackRangeSlider: HTMLInputElement
	let seeking = false
	let currentProgress = 0

	const max = 1000
</script>

<svelte:window on:pointerup={handlePointerUpWindow} />

<input
	bind:this={playbackRangeSlider}
	bind:value={currentProgress}
	type="range"
	min="0"
	{max}
	on:change={handleChange}
	on:pointerdown={handlePointerDown}
/>

<style lang="scss">
	@import 'range';

	input[type='range'] {
		@include input-type-range;
	}
</style>
