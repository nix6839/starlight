import { describe, expect, test } from 'vitest';
import { faviconHead } from '../../favicon.ts';

describe('faviconHead', () => {
	test('make favicon <link>', () => {
		const favicon = '/custom-icon.svg?v2';

		expect(faviconHead({ favicon })).toEqual({
			tag: 'link',
			attrs: {
				href: favicon,
				rel: 'icon',
				type: 'image/svg+xml',
			},
		});
	});

	test('make favicon <link> with additional attrs', () => {
		const favicon = '/custom-icon.ico';
		const sizes = 'any';

		expect(faviconHead({ favicon, sizes })).toEqual({
			tag: 'link',
			attrs: {
				href: favicon,
				rel: 'icon',
				type: 'image/x-icon',
				sizes,
			},
		});
	});
});
