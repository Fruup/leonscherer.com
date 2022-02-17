<script lang="ts">
	import { onMount } from "svelte";
	import { progress } from "$lib/progressStore";

	// mount
	onMount(() => {
		// subscribe and clean up after
		return progress.subscribe(value => {
			if (!_seeking)
				_currentProgress = value * parseInt(_playbackRangeSlider.max);
		})
	});

	// methods
	function handleChange() {
		// update progress store
		const max = parseInt(_playbackRangeSlider.max);
		const value = _playbackRangeSlider.valueAsNumber / max;
		$progress = value;
	}

	// props
	export let _playbackRangeSlider: HTMLInputElement = undefined;
	export let _seeking = false;
	export let _currentProgress = 0;
</script>

<input
	bind:this={_playbackRangeSlider}
	bind:value={_currentProgress}
	type="range"
	min="0"
	max="1000"
	on:change={handleChange}
	on:mousedown={() => (_seeking = true)}
	on:mouseup={() => (_seeking = false)}
/>

<style lang="scss">
	@import "range";

	input[type="range"] {
		@include input-type-range;
	}
</style>
