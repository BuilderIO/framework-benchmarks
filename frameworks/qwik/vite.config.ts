import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    ssr: {
      noExternal: '@builder.io/components',
    },
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
  };
});
