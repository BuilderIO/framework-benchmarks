import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import viteCompress from 'vite-plugin-compress';
import node from '@astrojs/node';
// This throws an error: 
// Error [ERR_UNSUPPORTED_DIR_IMPORT]: Directory import 'node_modules/astro-compress/dist/options'
// import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 6001,
  },
  vite: {
    plugins: [viteCompress.default()],
  },
  integrations: [solid()],
  adapter: node(),
  output: 'server',
});
