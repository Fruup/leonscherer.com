import type { BlogMeta } from "$lib/helpers/types";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async (e) => {
	// get blog posts
	const blogs = import.meta.glob("./*{md,svx}");

	const promises = Object.entries(blogs).map(async ([path, resolver]) => {
		const start = path.lastIndexOf("/") + 1;
		const end = path.indexOf(".", 1);
		const slug = path.slice(start, end);
		const post = await resolver();

		return ({
			slug,
			...post.metadata,
		});
	});

	const posts: BlogMeta[] = await Promise.all(promises);

	// return
	return {
		status: 200,
		body: posts,
	};
};
