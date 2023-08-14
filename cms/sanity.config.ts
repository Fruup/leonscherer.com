import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
	name: 'default',
	title: 'leonscherer.com',

	projectId: 'sg4gqb2a',
	dataset: 'develop',

	plugins: [deskTool(), visionTool()],

	schema: {
		types: schemaTypes,
	},
})
