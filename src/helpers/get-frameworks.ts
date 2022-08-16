import { fs } from 'zx';

const FRAMEWORKS = process.env.FRAMEWORKS?.split(',');

const IGNORE_FRAMEWORKS = [
  // Removing remix, as to fully handle Remix properly we'll need to support more idiomatic code
  // like here: https://github.com/kentcdodds/remix-todomvc
  'remix',
  // Svelte is temporarily broken in the Mitosis output due to a broken change
  // with generating types
  'svelte',
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
