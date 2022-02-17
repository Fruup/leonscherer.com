import type { MetaResponseBody } from "$lib/helpers/types";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async () => {
	// fetch content description
	const apiEndpoint = "https://raw.githubusercontent.com/Fruup/leonscherer.com/master/content/music";
	const response = await fetch(`${apiEndpoint}/tracks.json`, { headers: [['cache-control', 'no-cache']] });
	const data: MetaResponseBody = await response.json();

	// return
	return {
		status: response.status,
		body: data,
	};
};
