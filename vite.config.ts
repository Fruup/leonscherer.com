import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		port: 4426,
		fs: {
			allow: ['./content'],
		},
	},
}

export default config
