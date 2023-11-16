import { z } from 'astro/zod';

const HeadSchema = () =>
	z.object({
		/** Name of the HTML tag to add to `<head>`, e.g. `'meta'`, `'link'`, or `'script'`. */
		tag: z.enum(['title', 'base', 'link', 'style', 'meta', 'script', 'noscript', 'template']),
		/** Attributes to set on the tag, e.g. `{ rel: 'stylesheet', href: '/custom.css' }`. */
		attrs: z.record(z.union([z.string(), z.boolean(), z.undefined()])).default({}),
		/** Content to place inside the tag (optional). */
		content: z.string().default(''),
	});

export const HeadConfigSchema = () => z.array(HeadSchema()).default([]);

export type Head = z.input<ReturnType<typeof HeadSchema>>;
export type HeadUserConfig = z.input<ReturnType<typeof HeadConfigSchema>>;
export type HeadConfig = z.output<ReturnType<typeof HeadConfigSchema>>;
