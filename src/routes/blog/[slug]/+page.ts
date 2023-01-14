import type { BlogMeta } from '$lib/helpers/types'
import { error } from '@sveltejs/kit'
import type { SvelteComponent } from 'svelte'
import type { PageLoad } from './$types'

interface BlogGlob {
	default: typeof SvelteComponent
	metadata: Omit<BlogMeta, 'slug'>
}

export const load: PageLoad = async ({ params }) => {
	const posts = import.meta.glob<BlogGlob>('$content/blog/*.svx')
	const match = Object.keys(posts).find((filename) => filename.includes(params.slug))

	if (!match) throw error(404)

	const post = await posts[match]()

	if (post.metadata.release) {
		const release = Date.parse(post.metadata.release)
		if (Date.now() < release.valueOf()) throw error(404)
	}

	return {
		component: post.default,
		metadata: post.metadata,
	}
}

export const prerender = true
