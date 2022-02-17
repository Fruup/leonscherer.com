<script lang="ts">
	import { volume } from "$lib/volumeStore";

	// props
	export let _elem: HTMLInputElement;

	$: computeValue = $volume * parseInt(_elem.max);
</script>

<input type="range" bind:this={_elem} bind:value={computeValue} max="100" />
