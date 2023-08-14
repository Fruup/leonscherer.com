import { defineType } from 'sanity'

export default defineType({
	name: 'blog-post',
	title: 'Blog Post',
	type: 'document',
	fields: [
		{ name: 'title', title: 'Title', type: 'string' },
		{ name: 'release', title: 'Release time', type: 'datetime' },
		{ name: 'body', title: 'Body', type: 'blog-content' },
	],
})
