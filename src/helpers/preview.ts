import { $ } from 'zx';
import { getPort } from './get-port.js';

export async function preview(framework: string) {
  const port = await getPort(framework);
  if (!port) {
    throw new Error(
      `Could not find port for ${framework}, be sure to add it to package.json like: "port": 8080`
    );
  }

  const useBun = framework.endsWith('-bun');

  const process = $`cd frameworks/${framework} && ${
    useBun ? 'bun' : 'npm'
  } run preview`;

  return {
    process,
    port,
  };
}
