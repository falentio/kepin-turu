import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import dayjs from "dayjs";
import shiki from "shiki";
import { unified } from "unified";
import * as vfile from "to-vfile";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@leafac/rehype-shiki";
import rehypeStringify from "rehype-stringify";

import type { Highlighter } from "shiki";

const blogPosts = "blog_posts";

export type BlogList = {
	name: string;
	metadata: Metadata;
}[];

export interface Metadata {
	date: string;
	dateMs: number;
}

export const resolve = (name: string) => path.resolve(blogPosts, name + ".md");

let highlighterPromise: Record<string, Promise<Highlighter>>
async function getHighlighter(): Promise<Record<string, Highlighter>> {
	const highlighter: Record<string, Highlighter> = {}
	highlighterPromise ??= {
		"shiki-dark": shiki.getHighlighter({
			theme: "dracula-soft",
		}),
		"shiki-light": shiki.getHighlighter({
			theme: "min-light",
		}),
	};
	for (const k of Object.keys(highlighterPromise)) {
		highlighter[k] = await highlighterPromise[k]
	}
	return highlighter
}

const remark = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkFrontmatter, ["yaml"]);

const defaultMetadata: Metadata = {
	date: "1-8-2005",
	dateMs: 0,
};

const processMetadata = (m: Partial<Metadata>): Metadata => {
	const metadata: Metadata = Object.assign({}, defaultMetadata, m);
	metadata.dateMs = dayjs(metadata.date, "DD-MM-YYYY").unix();
	return metadata;
};

export const getMetadata = (name: string) => {
	name = resolve(name);
	const file = vfile.readSync(name);
	const markdown = remark.parse(file);
	const metadata: Partial<Metadata> = yaml.load((markdown.children[0] as any).value) ?? {};
	return processMetadata(metadata);
};

export const getContent = async (name: string) => {
	name = resolve(name);
	const file = vfile.readSync(name);
	const markdown = remark.parse(file);
	markdown.children.splice(0, 1);
	const highlighter = await getHighlighter()
	const rehype = unified()
		.use(remarkRehype)
		.use(rehypeShiki, { highlighter })
		.use(rehypeStringify);
	const html = await rehype.run(markdown);
	return rehype.stringify(html);
};

export const list = (): BlogList => {
	return fs
		.readdirSync(blogPosts)
		.filter((i) => path.extname(i) === ".md")
		.map((i) => {
			const name = path.basename(i, ".md");
			const metadata = getMetadata(name);
			return {
				name,
				metadata,
			};
		})
		.sort((a, b) => (a.metadata.date > b.metadata.date ? 1 : -1));
};
