import { fs } from 'zx';

const IGNORE_FRAMEWORKS = process.env.IGNORE_FRAMEWORKS
  ? process.env.IGNORE_FRAMEWORKS.split(',')
  : // These are currently not working
    ['angular', 'fresh', 'nuxt2', 'nuxt3', 'marko', 'astro', 'remix', 'qwik'];

/**
 * Get the list of frameworks to test
 */
export async function getFrameworks() {
  const frameworks = await fs.readdir('./frameworks');
  return frameworks.filter((item) => !IGNORE_FRAMEWORKS.includes(item));
}
