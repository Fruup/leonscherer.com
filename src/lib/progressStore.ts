import { writable } from "svelte/store";
import { getCurrentTrack } from "$lib/audio";

function createProgressStore() {
	// create store
	const store = writable(0, (set) => {
		// set interval
		const interval = setInterval(() => {
			// seek currently playing track
			const currentTrack = getCurrentTrack();
			if (currentTrack) {
				const howl = currentTrack.howl;
				if (howl) set(<number>howl.seek() / howl.duration());
			}
		}, 100);

		// stop
		return () => clearInterval(interval);
	});

	return {
		subscribe: store.subscribe,
		set(value: number) {
			// set store
			store.set(value);

			// seek currently playing track
			const currentTrack = getCurrentTrack();
			if (currentTrack) {
				const howl = currentTrack.howl;
				if (howl) howl.seek(value * howl.duration());
			}
		},
	};
}

export const progress = createProgressStore();
