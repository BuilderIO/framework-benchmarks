import { fs } from 'zx';

const FRAMEWORKS = process.env.FRAMEWORKS?.split(',');

const IGNORE_FRAMEWORKS = process.env.IGNORE_FRAMEWORKS
  ? process.env.IGNORE_FRAMEWORKS.split(',')
  : [];

/**
 * Get the list of frameworks to test
 */
export async function getFrameworks() {
  if (FRAMEWORKS) {
    return FRAMEWORKS;
  }
  const frameworks = await fs.readdir('./frameworks');
  return frameworks.filter((item) => !IGNORE_FRAMEWORKS.includes(item)).reverse();
}
