import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import compress from 'vite-plugin-compress';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 6001,
  },
  vite: {
    plugins: [compress.default()],
  },
  integrations: [solid()],
  // adapter: node(),
  // output: 'server',
});
