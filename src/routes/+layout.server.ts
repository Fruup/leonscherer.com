import api from '$lib/api'

export const load = async () => {
	// load track meta data
	const tracks = await api.getTracks()

	return { tracks }
}
