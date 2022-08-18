import { defineConfig } from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';
import compress from 'vite-plugin-compress';

export default defineConfig({
  server: {
    port: 6011,
  },
  plugins: [hydrogen(), compress()],
});
