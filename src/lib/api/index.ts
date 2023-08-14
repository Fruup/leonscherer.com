import { CONTENT_API_TOKEN, CONTENT_PROJECT_ID } from '$env/static/private'
import { createClient } from '@sanity/client'
import type { Track, BlogPost, BlogPosts } from './types'

import blogPostsQuery from './queries/blogPosts.groq?raw'
import blogPostQuery from './queries/blogPost.groq?raw'
import tracksQuery from './queries/tracks.groq?raw'

const client = createClient({
	projectId: CONTENT_PROJECT_ID,
	dataset: import.meta.env.PROD ? 'production' : 'develop',
	perspective: import.meta.env.PROD ? 'published' : 'raw',
	useCdn: false,
	token: CONTENT_API_TOKEN,
	apiVersion: '2023-08-14',
})

const interpolate = (query: string, params: Record<string, string | number>) => {
	for (const k in params) {
		query = query.replaceAll(':' + k, params[k].toString())
	}

	return query
}

export default {
	getTracks: async () => await client.fetch<Track[]>(tracksQuery),
	getBlogPosts: async () => await client.fetch<BlogPosts>(blogPostsQuery),
	getBlogPost: async (slug: string) =>
		await client.fetch<BlogPost>(interpolate(blogPostQuery, { slug })),
}
