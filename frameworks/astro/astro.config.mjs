import { defineConfig } from 'astro/config';

import solid from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 6001,
  },
  integrations: [solid()],
});
