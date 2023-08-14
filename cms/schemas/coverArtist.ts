import { UserIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
	name: 'cover-artist',
	title: 'Cover Artist',
	type: 'document',
	icon: UserIcon,
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
		},
		{
			name: 'url',
			title: 'URL',
			type: 'url',
		},
	],
})
