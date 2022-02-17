<script lang="ts">
	import Page from "$lib/components/Page.svelte";

	function encode(data) {
		return Object.keys(data)
			.map(
				(key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
			)
			.join("&");
	}

	function handleError() {
		status = "Something went wrong...";
		success = false;
	}

	function handleResponse(res) {
		if (res.status != 200)
			handleError();
		else {
			status = "Thank you for the message!";
			success = true;
		}
	}

	function handleSubmit(e) {
		e.preventDefault();

		// no empty messages
		if (!message)
		{
			success = false;
			status = "Do not send empty messages please.";
			return;
		}
		
		fetch(formElem.action, {
			method: formElem.method,
			headers: { "Accept": "application/json" },
			body: new FormData(formElem),
		})
			.then(handleResponse)
			.catch(handleError);
	}

	// props

	let formElem: HTMLFormElement;

	let mail: string;
	let message: string;

	let success: boolean = false;
	let status: string;
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
		<label name="mail" for="mail">
			Mail
			<input
				name="mail"
				type="email"
				placeholder="Mail address..."
				bind:value={mail}
			/>
		</label>
		<br />

		<label name="message" for="message">
			Message
			<textarea
				name="message"
				type="text"
				id="msg"
				placeholder="Message..."
				rows="5"
				bind:value={message}
			/>
		</label>
		<br />

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
	@import "src/globals.scss";

	#container {
		max-width: 500px;
		min-width: 50%;
		margin: auto;
		text-align: left;
	}

	label {
		display: flex;
		flex-direction: column;

		font-size: 1.3rem;
		text-decoration: underline;
	}

	input,
	textarea {
		font-family: unset;
		margin-top: 0.25rem;
		font-size: 1rem;
		text-decoration: none;
		padding: .5rem;
	}

	button {
		padding: 0.5rem 1rem;

		font-family: unset;
		font-size: 1.2rem;

		background-color: white;
		border: 1px solid grey;
		border-radius: 6px;

		transition: all 100ms linear;

		&:hover {
			cursor: pointer;
			background-color: $accent-color;
			color: white;
			border-color: black;
		}
	}

	.status {
		display: grid;
		place-items: center;

		margin-top: 1rem;
	}

	.status-indicator {
		width: 12px;
		height: 12px;

		border-radius: 100%;
		border: 1px solid black;

		background-color: red;

		&.success {
			background-color: green;
		}
	}
</style>
