import { $, fs, sleep } from 'zx';

export async function preview(framework: string) {
  const { port } = JSON.parse(
    await fs.readFile(`./frameworks/${framework}/package.json`, 'utf8')
  );
  if (!port) {
    throw new Error(
      `Could not find port for ${framework}, be sure to add it to package.json like: "port": 8080`
    );
  }

  const process = $`cd frameworks/${framework} && npm run preview`;

  // Give the server a sec to start up
  await sleep(2000);

  return {
    process,
    port,
  };
}
