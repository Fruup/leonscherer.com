import { defineType } from 'sanity'
import { CalendarIcon, DocumentIcon, ImageIcon, PlayIcon, UserIcon } from '@sanity/icons'

export default defineType({
	name: 'track',
	title: 'Track',
	description: 'A music track',
	type: 'document',
	icon: PlayIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'file',
			title: 'Audio file',
			type: 'file',
			icon: DocumentIcon,
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'release',
			title: 'Release time',
			type: 'datetime',
			icon: CalendarIcon,
		},
		{
			name: 'cover',
			title: 'Cover',
			type: 'image',
			icon: ImageIcon,
		},
		{
			name: 'coverArtist',
			title: 'Cover artist',
			type: 'reference',
			to: { type: 'cover-artist' },
			icon: UserIcon,
		},
		{
			name: 'coverApproved',
			title: 'Cover approved',
			type: 'boolean',
			initialValue: false,
		},
	],
})
