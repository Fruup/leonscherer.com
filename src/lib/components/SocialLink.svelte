<script lang="ts">
	export let href = "/";
</script>

<a {href} target="_blank">
	<slot />
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
</style>
