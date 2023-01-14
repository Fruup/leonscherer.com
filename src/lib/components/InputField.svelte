<script lang="ts">
	export let label: string
	export let value: string = ''
	export let rows: number = 1

	$: name = label.toLowerCase().split(' ').join('-')
</script>

<div class="input-field" class:not-empty={!!value}>
	{#if rows === 1}
		<input class="input-field__input" type="text" {name} id={name} bind:value />
	{:else}
		<textarea class="input-field__input" {rows} {name} id={name} bind:value />
	{/if}
	<label for={name}>{label}</label>
</div>

<style lang="scss">
	$color-neutral-700: #374151;
	$color-neutral-500: #6b7280;
	$color-neutral-300: #d1d5db;

	.input-field {
		--padding-v: 0.66em;
		--padding-h: 0.5em;

		position: relative;

		margin: 1.5em 0;

		input.input-field__input {
			height: 1em;
		}

		textarea.input-field__input {
			height: auto;
		}

		.input-field__input {
			// Needed to center label inside input element
			box-sizing: content-box;

			// Due to "box-sizing: content-box", padding and border
			// have to be subtracted from the width of the element.
			width: calc(100% - 2 * var(--padding-h) - 2px);

			font-family: inherit;
			color: currentColor;
			outline-color: $accent-color;

			font-size: 1em;
			padding: var(--padding-v) var(--padding-h);

			border: 1px solid $color-neutral-300;
			border-radius: 6px;
		}

		label {
			color: $color-neutral-500;

			transform-origin: left;
			cursor: text;

			position: absolute;
			top: 0;
			left: 0;

			transition-property: translate, scale, color;
			transition-duration: 250ms;
			transition-timing-function: ease;

			translate: var(--padding-h) var(--padding-v);
		}

		.input-field__input:focus,
		&.not-empty .input-field__input {
			& + label {
				color: $color-neutral-700;
				translate: 0 -100%;
				scale: 0.8;
			}
		}
	}
</style>
