import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: preprocess(),
	onwarn: (warning, handler) => {
		const { code, frame } = warning;
		// Allow unused selectors
		if (code === 'css-unused-selector') return;

		handler(warning);
	}
};

export default config;
