import { chalk, fs } from 'zx';

type Path = {
  src: string;
  dest: string;
};

const paths: Path[] = [
  {
    src: 'apps/components/output/qwik/src',
    dest: 'frameworks/qwik/src/components/generated-components',
  },
];

async function main() {
  await Promise.all(
    paths.map(async (path) => {
      await fs.copy(path.src, path.dest);
      console.info(chalk.green(`Copied ${path.src} -> ${path.dest}`));
    })
  );
}

main();
