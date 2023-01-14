import { writable } from 'svelte/store'
import { howlInstance } from '$lib/audio'

function createProgressStore() {
	// create store
	const store = writable(0, (set) => {
		// set interval
		const interval = setInterval(() => {
			// seek currently playing track
			if (howlInstance) {
				const f = howlInstance.seek() / howlInstance.duration()
				set(isNaN(f) ? 0 : f)
			}
		}, 100)

		// stop
		return () => clearInterval(interval)
	})

	return {
		subscribe: store.subscribe,
		set(value: number) {
			// set store
			store.set(value)

			// seek currently playing track
			if (howlInstance) howlInstance.seek(value * howlInstance.duration())
		},
	}
}

export const progress = createProgressStore()
