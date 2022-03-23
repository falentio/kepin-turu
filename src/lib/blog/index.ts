import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import dayjs from "dayjs";
import shiki from "shiki";
import { isElement } from "hast-util-is-element";
import { unified } from "unified";
import * as vfile from "to-vfile";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@leafac/rehype-shiki";
import rehypeStringify from "rehype-stringify";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import type { Highlighter } from "shiki";

const blogPosts = "blog_posts";

export type BlogList = {
	name: string;
	metadata: Metadata;
	text: string;
}[];

export interface Metadata {
	date: string;
	dateMs: number;
	image: string;
	title: string;
	tags: string[];
}

export const resolve = (name: string) => path.resolve(blogPosts, name + ".md");

const highlighterPromise: Record<string, Promise<Highlighter>> = {
	"shiki-dark": shiki.getHighlighter({
		theme: "dracula-soft",
	}),
	"shiki-light": shiki.getHighlighter({
		theme: "min-light",
	}),
};
async function getHighlighter(): Promise<Record<string, Highlighter>> {
	const highlighter: Record<string, Highlighter> = {};
	for (const k in highlighterPromise) {
		highlighter[k] = await highlighterPromise[k];
	}
	return highlighter;
}

const remark = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkFrontmatter, ["yaml"]);

const defaultMetadata: Metadata = {
	date: "1-8-2005",
	dateMs: 0,
	image: "https://picsum.photos/id/353/300/200",
	title: "Hello World!!!",
	tags: [],
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
	const metadata: Partial<Metadata> =
		yaml.load((markdown.children[0] as any).value) ?? {}; // eslint-disable-line @typescript-eslint/no-explicit-any
	return processMetadata(metadata);
};

export const getPeviewText = (name: string) => {
	name = resolve(name);
	let text = fs.readFileSync(name).toString().slice(3);
	text = text.slice(text.indexOf("---") + 3);
	text = text.slice(0, 500);
	return text;
};

export const getContent = async (name: string) => {
	name = resolve(name);
	const file = vfile.readSync(name);
	const markdown = remark.parse(file);
	markdown.children.splice(0, 1);
	const highlighter = await getHighlighter();
	const rehype = unified()
		.data("settings", { fragment: true })
		.use(remarkRehype)
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings, {
			behavior: "wrap",
			test(el) {
				return isElement(el, ["h1", "h2", "h3"]);
			},
		})
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
			const text = getPeviewText(name);
			return {
				name,
				metadata,
				text,
			};
		})
		.sort((a, b) => {
			const ad = a.metadata.date;
			const bd = b.metadata.date;
			if (ad !== bd) {
				return ad > bd ? -1 : 1;
			}
			return a.name > b.name ? 1 : -1;
		});
};
