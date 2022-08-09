import { fs } from 'zx';

/**
 * Get the port a given framework runs on
 */
export async function getPort(framework: string) {
  const { port } = JSON.parse(
    await fs.readFile(`./frameworks/${framework}/package.json`, 'utf8')
  );
  return port;
}
