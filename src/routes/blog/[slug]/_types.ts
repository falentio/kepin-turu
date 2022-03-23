import type { Metadata } from "$lib/blog";
export interface BlogData {
	next?: string;
	prev?: string;
	content: string;
	metadata: Metadata;
}
