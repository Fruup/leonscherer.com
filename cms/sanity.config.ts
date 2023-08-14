import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const shared = {
	title: 'leonscherer.com',
	projectId: 'sg4gqb2a',

	plugins: [deskTool(), visionTool()],
	schema: {
		types: schemaTypes,
	},
}

export default defineConfig([
	{
		...shared,
		title: 'Develop',
		name: 'develop',
		basePath: '/develop',
		dataset: 'develop',
	},
	{
		...shared,
		title: 'Production',
		name: 'production',
		basePath: '/production',
		dataset: 'production',
	},
])
