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
  // Fresh
  {
    src: 'apps/components/output/react/src',
    dest: 'frameworks/fresh/components/generated-components',
  },
  // Marko
  {
    src: 'apps/components/output/react/src',
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
];

async function main() {
  await Promise.all(
    paths.map(async (path) => {
      await fs.copy(path.src, path.dest, {
        overwrite: true,
        recursive: true,
      });
      console.info(chalk.green(`Copied ${path.src} -> ${path.dest}`));
    })
  );
}

main();
