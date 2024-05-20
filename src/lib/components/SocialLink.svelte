<script lang="ts">
	export let href = '/'
	export let iconOnly = false
</script>

<a {href} class:iconOnly target="_blank" rel="noreferrer">
	<slot />
</a>

<style lang="scss">
	a {
		display: inline-grid;
		place-items: center;

		text-decoration: none;

		color: white;

		height: var(--link-size);

		padding-left: 1rem;
		padding-right: 1rem;

		&.iconOnly {
			width: var(--link-size);
			padding: 0;
		}

		background-color: $dark-color;

		border-radius: 999px;
	}

	:global(a > svg > path) {
		transition: fill 100ms linear;
	}

	:global(a:hover > svg > path) {
		fill: $accent-color;
	}
</style>
