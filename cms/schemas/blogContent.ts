import { defineType } from 'sanity'

export default defineType({
	name: 'blog-content',
	title: 'Blog Content',
	type: 'array',
	of: [
		{
			type: 'block',
		},
		// {
		// 	type: 'code',
		// },
	],
})
