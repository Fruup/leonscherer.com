import { browser } from '$app/environment'
import type { Track } from '$lib/api/types'
import { initAudioEngine } from '$lib/audio.js'

export const load = async ({ data }) => {
	if (!browser) return

	localStorage.removeItem('lastBlogPost')

	const defaultCoverURL = (await import('$lib/assets/default.svg?url')).default

	// get load track cover URLs
	const tracks = data.tracks.map<Track>((track) => ({
		...track,
		coverUrl: track.coverUrl ?? defaultCoverURL,
	}))

	// read current track index from storage
	const storedTrackIndex = localStorage.getItem('currentTrackIndex')
	const currentTrackIndex = storedTrackIndex ? parseInt(storedTrackIndex) : tracks.length - 1

	// init audio manager
	initAudioEngine(tracks, currentTrackIndex)

	return { tracks }
}
