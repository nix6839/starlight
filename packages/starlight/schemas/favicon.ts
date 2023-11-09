import { extname } from 'node:path';
import { z } from 'astro/zod';
import { fileWithBase } from '../utils/base';

const faviconTypeMap = {
	'.ico': 'image/x-icon',
	'.gif': 'image/gif',
	'.jpeg': 'image/jpeg',
	'.jpg': 'image/jpeg',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
};

export const FaviconSchema = () =>
	z
		.string()
		.transform((favicon, ctx) => {
			const [path, query] = favicon.split('?') as [string, ...string[]];

			const ext = extname(path).toLowerCase();

			if (!isFaviconExt(ext)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'favicon must be a .ico, .gif, .jpg, .png, or .svg file',
				});

				return z.NEVER;
			}

			return {
				href: `${fileWithBase(path)}${query === undefined ? '' : `?${query}`}`,
				type: faviconTypeMap[ext],
			};
		})
		.describe(
			'The default favicon for your site which should be a path to an image in the `public/` directory.'
		);

function isFaviconExt(ext: string): ext is keyof typeof faviconTypeMap {
	return ext in faviconTypeMap;
}
