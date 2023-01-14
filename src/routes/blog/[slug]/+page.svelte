<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
	const { component } = data
</script>

{#if component}
	<svelte:component this={component} />
{/if}
