import { Howler } from 'howler'
import { writable } from 'svelte/store'

function createVolumeStore() {
	// set initial volume
	Howler.volume(0.5)

	// create store
	const store = writable(Howler.volume())

	return {
		subscribe: store.subscribe,
		set(value: number) {
			// set store
			store.set(value)

			// set howler volume
			Howler.volume(value)
		},
	}
}

export const volume = createVolumeStore()
