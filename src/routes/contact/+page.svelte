<script lang="ts">
	import InputField from '$lib/components/InputField.svelte'
	import Page from '$lib/components/Page.svelte'
	import { onMount } from 'svelte'

	onMount(() => {
		const storedValues = localStorage.getItem('contactForm')
		if (storedValues) {
			const parsed = JSON.parse(storedValues)
			message = parsed.message ?? ''
			mail = parsed.mail ?? ''
		}

		return () => {
			localStorage.setItem(
				'contactForm',
				JSON.stringify({
					mail,
					message,
				}),
			)
		}
	})

	const encode = (data: { [K: string]: string | number | boolean }) =>
		Object.keys(data)
			.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
			.join('&')

	const handleError = () => {
		status = 'Something went wrong...'
		success = false
	}

	const handleResponse = (res: Response) => {
		if (res.status != 200) handleError()
		else {
			status = 'Thank you for the message!'
			success = true
		}
	}

	const handleSubmit = (e: Event) => {
		e.preventDefault()

		// no empty messages
		if (!message) {
			success = false
			status = 'Do not send empty messages please.'
			return
		}

		fetch(formElem.action, {
			method: formElem.method,
			headers: { Accept: 'application/json' },
			body: new FormData(formElem),
		})
			.then(handleResponse)
			.catch(handleError)
	}

	// props

	let formElem: HTMLFormElement

	let mail: string
	let message: string

	let success: boolean = false
	let status: string
</script>

<svelte:head>
	<title>Contact - Leon Scherer</title>
</svelte:head>

<Page>
	<form
		name="contact"
		id="container"
		action="https://formspree.io/f/mknqadwl"
		method="post"
		on:submit={handleSubmit}
		bind:this={formElem}
	>
		<InputField label="E-Mail" bind:value={mail} />
		<InputField label="Message" rows={5} bind:value={message} />

		<div style="width: 100%; text-align: right;">
			<button style="" type="submit">Submit!</button>
		</div>
	</form>

	{#if status}
		<div class="status">
			<span>{status}</span>
			<div class:success class="status-indicator" />
		</div>
	{/if}
</Page>

<style lang="scss">
	#container {
		font-size: 1.2rem;
		max-width: 500px;
		min-width: 50%;
		margin: auto;
		text-align: left;
	}

	button {
		padding: 0.75rem 1.5rem;

		font-family: unset;
		font-size: 1.3em;

		background-color: $dark-color;
		color: white;

		text-decoration-line: underline;
		text-decoration-color: $accent-color;

		border: 1px solid black;
		border-radius: 6px;

		transition: all 100ms linear;

		&:hover,
		&:focus {
			cursor: pointer;
			background-color: white;
			color: $dark-color;
			border-color: $dark-color;
		}
	}

	.status {
		display: grid;
		place-items: center;

		margin-top: 1rem;
	}

	.status-indicator {
		margin-top: 1rem;
		width: 12px;
		height: 12px;

		border-radius: 100%;
		border: 1px solid black;

		background-color: rgb(227, 55, 55);

		&.success {
			background-color: rgb(43, 152, 43);
		}
	}
</style>
