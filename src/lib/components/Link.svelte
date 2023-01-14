<script lang="ts">
	import { page } from '$app/stores'

	// props
	export let href = '/'

	$: isInternal = href.indexOf('/') <= 0
</script>

<a
	{href}
	class:active={$page.url.pathname.startsWith(href)}
	target={isInternal ? undefined : '_blank'}
>
	<slot />
</a>

<style lang="scss">
	a {
		text-transform: uppercase;
		font-size: 0.9rem;

		position: relative;
		top: 0;
		left: 0;

		display: inline-grid;
		place-items: center;

		text-decoration: none;

		// width: 5rem;
		padding: 0 1rem;
		height: 100%;

		color: white;

		transition: color 100ms ease-out;

		&::before {
			content: '';
			position: absolute;
			z-index: -1;
			background: $dark-color;

			transform: scaleY(0);
			transform-origin: 50% 100%;

			transition: all 100ms ease-out;

			width: 100%;
			height: 100%;
		}

		&:hover::before,
		&.active::before {
			transform: scaleY(1);
		}

		box-sizing: border-box;
		border: 1px solid black;
		border-bottom: none;
		color: black;

		&:hover,
		&.active {
			color: white;
		}

		&.active {
			text-decoration: underline;
			text-decoration-color: $accent-color;
		}
	}
</style>
