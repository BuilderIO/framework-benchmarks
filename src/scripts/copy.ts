import { chalk, fs } from 'zx';

type Path = {
  src: string;
  dest: string;
};

const paths: Path[] = [
  // Angular
  {
    src: 'apps/components/output/angular/src',
    dest: 'frameworks/angular/src/app/generated-components',
  },
  // Astro
  {
    src: 'apps/components/output/solid/src',
    dest: 'frameworks/astro/src/generated-components',
  },
  // Lit
  {
    src: 'apps/components/output/lit/src',
    dest: 'frameworks/lit/src/generated-components',
  },
  // Solid
  {
    src: 'apps/components/output/solid/src',
    dest: 'frameworks/solid/src/generated-components',
  },
  // Fresh
  {
    src: 'apps/components/output/preact/src',
    dest: 'frameworks/fresh/components/generated-components',
  },
  // Marko
  {
    src: 'apps/components/output/marko/src',
    dest: 'frameworks/marko/src/components/generated-components',
  },
  // Nuxt2
  {
    src: 'apps/components/output/vue/vue2/src',
    dest: 'frameworks/nuxt2/components/generated-components',
  },
  // Nuxt3
  {
    src: 'apps/components/output/vue/vue3/src',
    dest: 'frameworks/nuxt3/components/generated-components',
  },
  // Vue3
  {
    src: 'apps/components/output/vue/vue3/src',
    dest: 'frameworks/vue3/src/generated-components',
  },
  // Qwik
  {
    src: 'apps/components/output/qwik/src',
    dest: 'frameworks/qwik/src/components/generated-components',
  },
  // Remix
  {
    src: 'apps/components/output/react/src',
    dest: 'frameworks/remix/components/generated-components',
  },
  // Hydrogen
  {
    src: 'apps/components/output/react/src',
    dest: 'frameworks/hydrogen/src/generated-components',
  },
  // Next
  {
    src: 'apps/components/output/react/src',
    dest: 'frameworks/next/generated-components',
  },
  // Gatsby
  {
    src: 'apps/components/output/react/src',
    dest: 'frameworks/gatsby/src/generated-components',
  },
  // React
  {
    src: 'apps/components/output/react/src',
    dest: 'frameworks/react/src/generated-components',
  },
  // react-ssr-bun
  {
    src: 'apps/components/output/react/src',
    dest: 'frameworks/react-ssr-bun/generated-components',
  },
  // react-ssr-deno
  {
    src: 'apps/components/output/react/src',
    dest: 'frameworks/react-ssr-deno/generated-components',
  },
  // react-ssr-node
  {
    src: 'apps/components/output/react/src',
    dest: 'frameworks/react-ssr-node/generated-components',
  },
  // react-ssr-node
  {
    src: 'apps/components/output/preact/src',
    dest: 'frameworks/preact-ssr-node/generated-components',
  },
  // Svelte
  {
    src: 'apps/components/output/svelte/src',
    dest: 'frameworks/svelte/src/generated-components',
  },
];

await Promise.all(
  paths.map(async (path) => {
    fs.copy(path.src, path.dest, {
      overwrite: true,
      recursive: true,
    });
    console.info(chalk.green(`Copied ${path.src} -> ${path.dest}`));
  })
);
