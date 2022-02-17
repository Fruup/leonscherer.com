<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async () => {
		// directly forward to portfolio
		return {
			redirect: '/portfolio',
			status: 308,
		};
	};
</script>

<svelte:head>
	<title>Leon Scherer</title>
</svelte:head>
