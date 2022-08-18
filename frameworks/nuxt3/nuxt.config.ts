import { defineNuxtConfig } from 'nuxt';
import compress from 'vite-plugin-compress';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: {
    plugins: [compress()],
  },
});
