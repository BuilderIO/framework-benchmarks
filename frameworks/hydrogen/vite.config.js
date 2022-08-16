import { defineConfig } from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';

export default defineConfig({
  server: {
    port: 6011,
  },
  plugins: [hydrogen()],
});
