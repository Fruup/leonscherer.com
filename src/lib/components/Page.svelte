<script lang="ts">
	import { sineOut } from "svelte/easing";
	import type { FadeParams, TransitionConfig } from "svelte/transition";

	// fade config
	const duration = 250;
	const delay = duration;

	// fade functions
	const fadeIn = (node: Element, b: FadeParams): TransitionConfig => ({
		duration: duration,
		delay,
		easing: sineOut,
		css: (t: number, u: number) =>
			`opacity: ${t}; transform: translateY(${15 * u}px);`,
	});

	const fadeOut = (node: Element, b: FadeParams): TransitionConfig => ({
		duration,
		delay: 0,
		easing: sineOut,
		css: (t: number) => `opacity: ${t}`,
	});
</script>

<div class="page" in:fadeIn out:fadeOut>
	<slot />
	<div class="spacer" />
</div>

<style lang="scss">
	@import "../../globals.scss";

	div.page {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;

		box-sizing: border-box;

		border-style: solid;
		border-color: transparent;
		border-width: 0 0.5rem;
	}

	div.spacer {
		height: $footer-height;
		padding-bottom: 1rem;
	}
</style>
