import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
	// get content description
	const tracks = await import('$content/music/tracks.json').then(({ default: d }) => d)

	const filteredTracks = tracks.filter((track) => {
		const release = Date.parse(track.release)

		return isNaN(release) || Date.now() >= release
	})

	return json(filteredTracks)
}

export const prerender = true
