import type { BlogMeta } from '$lib/helpers/types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('/blog/meta')
	const posts: BlogMeta[] = await res.json()

	return {
		posts,
	}
}

export const prerender = true
