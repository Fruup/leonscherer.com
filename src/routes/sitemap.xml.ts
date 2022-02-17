import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (e) => {
	// read routes
	const routes = ['about', 'portfolio', 'contact', 'blog', 'music'];

	// render xml sitemap
	const HOSTNAME = 'https://leonscherer.com/';
	const xml =
		`<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${routes.map(route => `<url><loc>${HOSTNAME + route}</loc></url>`).join('')}
		</urlset>`;

	return {
		status: 200,
		headers: { 'Content-Type': 'application/xml' },
		body: xml,
	};
};
