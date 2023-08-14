import type { BlogMeta } from '$lib/helpers/types'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({}) => {
	// get blog posts
	const blogs = import.meta.glob('$content/blog/*.svx')

	const promises = Object.entries(blogs).map(async ([path, resolver]) => {
		const start = path.lastIndexOf('/') + 1
		const end = path.indexOf('.', 1)
		const slug = path.slice(start, end)
		const post: any = await resolver()

		return {
			slug,
			...post.metadata,
		}
	})

	const posts: BlogMeta[] = await Promise.all(promises)

	const filteredPosts = posts.filter(
		(post) => !post.release || Date.now() >= Date.parse(post.release).valueOf(),
	)

	return json(filteredPosts)
}
