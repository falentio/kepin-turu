import type { RequestHandler } from "@sveltejs/kit";
import * as blog from "$lib/blog";

export const get: RequestHandler = () => {
	const list = blog.list();
	return {
		status: 200,
		body: {
			list: list as any,
		},
	};
};
