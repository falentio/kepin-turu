import type { RequestHandler } from "@sveltejs/kit";
import type { BlogData } from "./_types";
import * as blog from "$lib/blog";

const contents = new Map<string, Promise<string>>();
const getContent = (name: string): Promise<string> => {
	const content = contents.get(name) || blog.getContent(name);
	if (!contents.has(name)) {
		contents.set(name, content);
	}
	return content;
};

export const get: RequestHandler = async ({ params, url }) => {
	const name = params.slug;
	const list = blog.list();
	const i = list.findIndex((i) => i.title == name);
	if (i == -1) {
		return { status: 404 };
	}
	if (url.searchParams.has("fresh")) {
		contents.delete(name);
	}
	const blogData: BlogData = {
		next: list[i - 1]?.title,
		prev: list[i + 1]?.title,
		content: await getContent(name),
		metadata: blog.getMetadata(name),
	};
	return {
		status: 200,
		body: {
			blogData: blogData as any, // eslint-disable-line @typescript-eslint/no-explicit-any
		},
	};
};
