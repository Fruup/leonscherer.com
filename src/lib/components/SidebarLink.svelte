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
		font-size: 1.2rem;

		position: relative;
		top: 0;
		left: 0;

		display: inline-grid;
		place-items: center;

		text-decoration: none;

		padding: 0 1rem;
		height: 2rem;

		color: white;

		transition: color 100ms ease-out;

		&:hover::before,
		&.active::before {
			transform: scaleY(1);
		}

		box-sizing: border-box;
		border-bottom: none;
		color: black;

		&:hover,
		&.active {
			// color: white;
		}

		&.active {
			text-decoration: underline;
			text-decoration-color: $accent-color;
		}
	}
</style>
