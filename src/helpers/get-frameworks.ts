import { fs } from 'zx';

const FRAMEWORKS = process.env.FRAMEWORKS?.split(',');

const IGNORE_FRAMEWORKS = [
  // Removing remix, as to fully handle Remix properly we'll need to support more idiomatic code
  // like here: https://github.com/kentcdodds/remix-todomvc
  'remix',
  // Nuxt2/Vue2 doesn't support some modern things like components with more than one elements
  // at the root, and modern ES syntax
  'nuxt2',
].concat(
  process.env.IGNORE_FRAMEWORKS ? process.env.IGNORE_FRAMEWORKS.split(',') : []
);

/**
 * Get the list of frameworks to test
 */
export async function getFrameworks() {
  if (FRAMEWORKS) {
    return FRAMEWORKS;
  }
  const frameworks = await fs.readdir('./frameworks');
  return frameworks.filter((item) => !IGNORE_FRAMEWORKS.includes(item));
}
