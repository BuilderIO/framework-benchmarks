import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import viteCompress from 'vite-plugin-compress';
import compress from 'astro-compress';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 6001,
  },
  vite: {
    plugins: [viteCompress.default()],
  },
  integrations: [solid(),compress()],
  adapter: node(),
  output: 'server',
});
