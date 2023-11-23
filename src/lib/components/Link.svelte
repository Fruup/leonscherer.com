<script lang="ts">
	import { page } from '$app/stores'

	export let href = '/'
	export let circular = false
	export let filled = false

	$: isInternal = href.indexOf('/') <= 0
	$: active = $page.url.pathname.startsWith(href)
</script>

<a {href} class:active class:circular class:filled target={isInternal ? undefined : '_blank'}>
	<div class="inner" class:circular class:filled class:active>
		<slot />
	</div>
</a>

<style lang="scss">
	$duration: 150ms;
	$timing-function-1: cubic-bezier(0.22, 0.97, 0.44, 1.97);
	$timing-function-2: ease;
	$translation: 6px;

	a {
		text-transform: uppercase;
		font-size: 0.9rem;

		position: relative;
		bottom: calc($translation - 1px);
		height: calc(100% + $translation);

		.inner {
			height: calc(100% - $translation);

			text-decoration: none;

			&.active {
				text-decoration: underline;
				text-decoration-color: $accent-color;
			}

			display: inline-grid;
			place-items: center;

			padding: 0 1rem;
			height: 100%;

			color: white;

			transition-property: color, translate;
			transition-duration: $duration;
			transition-timing-function: $timing-function-2;

			overflow: hidden;

			border-radius: 999px;

			&.circular {
				width: auto;
				aspect-ratio: 1;
			}

			&.filled {
				padding: 0;
				background: $dark-color;
				border-color: $dark-color;
				color: $light-color;
			}

			&::before {
				content: '';
				position: absolute;
				inset: -1px;
				z-index: -1;
				background: $dark-color;

				transform: scaleY(0);
				transform-origin: 50% 100%;

				transition: all $duration ease-out;
			}

			box-sizing: border-box;
			border: 1px solid $dark-color;
			color: $dark-color;
		}

		&:hover {
			.inner.filled {
				color: $accent-color;
			}
		}

		&:hover,
		&:focus,
		&.active {
			.inner {
				color: white;
				transition-timing-function: $timing-function-1;

				translate: 0 -6px;

				&::before {
					transform: scaleY(1);
				}
			}
		}
	}
</style>
