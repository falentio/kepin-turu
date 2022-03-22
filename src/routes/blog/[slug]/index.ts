import type { RequestHandler } from "@sveltejs/kit";
import type { BlogData } from "./_types";
import * as blog from "$lib/blog";

const content = new Map<string, Promise<string>>()
const getContent = (name: string): Promise<string> => {
	if (!content.has(name)) {
		content.set(name, blog.getContent(name))
	}
	return content.get(name)!
}

export const get: RequestHandler = async ({ params }) => {
	const name = params.slug;
	const list = blog.list();
	const i = list.findIndex((i) => i.name == name);
	if (i == -1) {
		return { status: 404 };
	}
	const blogData: BlogData = {
		next: list[i + 1]?.name,
		prev: list[i - 1]?.name,
		content: await getContent(name),
		metadata: blog.getMetadata(name),
	};
	return {
		status: 200,
		body: {
			blogData: blogData as any,
		},
	};
};
