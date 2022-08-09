import { fs } from 'zx';

/**
 * Get the list of frameworks to test
 */
export async function getFrameworks() {
  const frameworks = await fs.readdir('./frameworks');
  return frameworks;
}
