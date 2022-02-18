<script lang="ts">
	export let href = "/";
	export let icon = undefined;
</script>

<a {href} target="_blank">
	<svelte:component this={icon} />
</a>

<style lang="scss">
	@import "../../globals.scss";

	a {
		display: inline-grid;
		place-items: center;

		text-decoration: none;

		color: white;

		width: 5.3rem;
		height: 100%;

		background-color: $dark-color;

		border-radius: 999px;
		width: var(--link-height);
	}

	:global(a > svg > path) {
		transition: fill 100ms linear;
	}

	:global(a:hover > svg > path) {
		fill: $accent-color;
	}
</style>
