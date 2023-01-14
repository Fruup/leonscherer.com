<script lang="ts">
	import { fly } from 'svelte/transition'

	// fade config
	const duration = 250
	const delay = duration
</script>

<main class="page" in:fly={{ delay, duration, y: 15 }} out:fly={{ duration }}>
	<slot />
	<div class="spacer" />
</main>

<style lang="scss">
	.page {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;

		box-sizing: border-box;

		border-style: solid;
		border-color: transparent;
		border-width: 0 0.5rem;
	}

	.spacer {
		height: $footer-height;
		padding-bottom: 1rem;
	}
</style>
