<script lang="ts">
	import { beforeNavigate } from '$app/navigation'
	import { page } from '$app/stores'
	import { fly } from 'svelte/transition'

	$: title = ((pathname: string) => {
		pathname = pathname.slice(1)
		const end = pathname.indexOf('/')
		return pathname.slice(0, end < 0 ? undefined : end).toUpperCase()
	})($page.url.pathname)

	let direction = 1
	const offset = 20
	const duration = 300

	beforeNavigate(({ type }) => {
		if (type !== 'link') return
		direction *= -1
	})
</script>

<div class="title">
	<h1>LEON SCHERER</h1>

	<div style="position: relative; height: 1em; text-align: right">
		{#key $page}
			<h2
				style="position: absolute; right: 0"
				in:fly={{ delay: duration, duration, x: direction * offset }}
				out:fly={{ duration, x: -direction * offset }}
			>
				{title}
			</h2>
		{/key}
	</div>
</div>

<style lang="scss">
	.title {
		width: fit-content;
		margin: 2em auto;
		font-size: 2em;
		text-align: right;
	}

	h1,
	h2 {
		font-weight: 200;
		margin: 0;
		width: fit-content;
	}

	h1 {
		font-size: 1em;
		color: lighten($dark-color, 20%);
		text-decoration: underline;
		text-decoration-color: $accent-color;
	}

	h2 {
		margin-left: auto;
		font-size: 1em;
	}
</style>
