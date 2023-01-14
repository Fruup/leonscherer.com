import { browser } from '$app/environment'
import type { MetaResponseBody } from '$lib/helpers/types'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ fetch }) => {
	if (!browser) return

	// load track meta data
	const response = await fetch('/music/meta')
	const trackMeta: MetaResponseBody = await response.json()

	return { trackMeta }
}

export const prerender = true
