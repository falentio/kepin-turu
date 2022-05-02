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
	title: string;
	desc: string;
	postDate: string;
	postDateMs: number;
	editDate: string;
	editDateMs: number;
	image: string;
	ogImage: string;
	tags: string[];
}

export const resolve = (name: string) => path.resolve(blogPosts, name + ".md");

const highlighterPromise: Record<string, Promise<Highlighter>> = {
	"shiki-dark": shiki.getHighlighter({
		theme: "rose-pine-moon",
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
	title: "",
	postDate: "1-8-2005",
	postDateMs: 0,
	editDate: "",
	editDateMs: 0,
	image: "",
	ogImage: "",
	desc: "Hello World!!!",
	tags: [],
};

const hash = (str: string) => {
	let n = 1;
	for (const s of str) {
		n -= s.charCodeAt(0) ** 2 * n;
		n ^= n << 5;
		n ^= n >>> 17;
		n ^= n << 13;
	}
	n >>>= 0;
	return n.toString(16) + n.toString(36);
};

const getCatPlaceholder = (s: string[], width: number, height?: number) => {
	return [
		"https://catsum.deno.dev/seed",
		hash(s.join("")),
		width.toString(),
		height?.toString(),
	].join("/");
};

const processMetadata = (m: Partial<Metadata>): Metadata => {
	const metadata: Metadata = Object.assign({}, defaultMetadata, m);
	metadata.image ||= getCatPlaceholder(
		[m.title, ...m.tags].sort(),
		1200,
		630
	);
	metadata.editDate ||= metadata.postDate;
	metadata.postDateMs = dayjs(metadata.postDate, "D-M-YYYY").valueOf();
	metadata.postDate = dayjs(metadata.postDate, "D-M-YYYY")
		.toDate()
		.toLocaleDateString("en-GB")
		.replace("01/08/2005", "xx/08/2005");
	metadata.editDateMs = dayjs(metadata.editDate, "D-M-YYYY").valueOf();
	metadata.editDate = dayjs(metadata.editDate, "D-M-YYYY")
		.toDate()
		.toLocaleDateString("en-GB")
		.replace("01/08/2005", "xx/xx/xxxx");
	return metadata;
};

export const getMetadata = (name: string) => {
	const filepath = resolve(name);
	const file = vfile.readSync(filepath);
	const markdown = remark.parse(file);
	const metadata: Partial<Metadata> =
		yaml.load((markdown.children[0] as any).value) ?? {}; // eslint-disable-line @typescript-eslint/no-explicit-any
	metadata.title = name;
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
			return a.title > b.title ? 1 : -1;
		});
};
