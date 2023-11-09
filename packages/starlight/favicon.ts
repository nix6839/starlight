import { FaviconSchema } from './schemas/favicon';
import type { Head } from './schemas/head';

export interface FaviconOptions {
	favicon: string;
	sizes?: 'any' | (string & {});
	fetchpriority?: 'high' | 'low' | 'auto';
}

export function faviconHead(options: FaviconOptions): Head {
	const { favicon, ...attrs } = options;
	const parsedFavicon = FaviconSchema().parse(favicon);

	return {
		tag: 'link',
		attrs: {
			rel: 'icon',
			...parsedFavicon,
			...attrs,
		},
	};
}
