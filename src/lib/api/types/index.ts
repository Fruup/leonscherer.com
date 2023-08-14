import type { SerializedBlock } from '@portabletext/to-html'

interface CoverArtist {
	name: string
	url: string
}

export interface Track {
	id: string
	title: string
	fileUrl: string
	coverArtist?: CoverArtist
	coverUrl?: string
	coverDimensions?: {
		width: number
		height: number
		aspectRatio: number
	}
}

interface BlogPostMeta {
	id: string
	title: string
	release: Date
}

export type BlogPosts = BlogPostMeta[]

export interface BlogPost extends BlogPostMeta {
	body: SerializedBlock[]
}
