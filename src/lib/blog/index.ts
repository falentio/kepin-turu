import type { Highlighter } from "shiki";
import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import dayjs from "dayjs";
import parseFmt from "dayjs/plugin/customParseFormat.js";
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

const blogPosts = "blog_posts";
dayjs.extend(parseFmt);

export interface Metadata {
	postDate: string;
	postDateMs: number;
	editDate: string;
	editDateMs: number;
	name: string;
	title: string;
	image: string;
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
	name: "",
	postDate: "1-8-2005",
	postDateMs: 0,
	editDate: "",
	editDateMs: 0,
	image: "https://picsum.photos/id/353/300/200",
	title: "Hello World!!!",
	tags: [],
};

const processMetadata = (m: Partial<Metadata>): Metadata => {
	const metadata: Metadata = Object.assign({}, defaultMetadata, m);
	metadata.editDate ||= m.postDate;
	metadata.postDateMs = dayjs(metadata.postDate, "D-M-YYYY").valueOf();
	metadata.postDate = dayjs(metadata.postDate, "D-M-YYYY")
		.toDate()
		.toLocaleDateString("en-GB")
		.replace("01/08/2005", "xx/08/2005");
	metadata.editDateMs = dayjs(metadata.editDate, "D-M-YYYY").valueOf();
	metadata.editDate = dayjs(metadata.editDate, "D-M-YYYY")
		.toDate()
		.toLocaleDateString("en-GB")
		.replace("01/08/2005", "xx/08/2005");
	return metadata;
};

export const getMetadata = (name: string) => {
	const filepath = resolve(name);
	const file = vfile.readSync(filepath);
	const markdown = remark.parse(file);
	const metadata: Partial<Metadata> =
		yaml.load((markdown.children[0] as any).value) ?? {}; // eslint-disable-line @typescript-eslint/no-explicit-any
	metadata.name = name;
	return processMetadata(metadata);
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

export const list = (): Metadata[] => {
	return fs
		.readdirSync(blogPosts)
		.filter((i) => path.extname(i) === ".md")
		.map((i) => {
			const name = path.basename(i, ".md");
			const metadata = getMetadata(name);
			return metadata;
		})
		.sort((a, b) => {
			const ad = a.postDateMs;
			const bd = b.postDateMs;
			if (ad !== bd) {
				return ad > bd ? -1 : 1;
			}
			return a.name > b.name ? 1 : -1;
		});
};
