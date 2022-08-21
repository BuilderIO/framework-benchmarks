import { $, chalk, fetch, sleep } from 'zx';
import { getFrameworks } from '../helpers/get-frameworks.js';
import { killAll } from '../helpers/kill-process.js';
import { preview } from '../helpers/preview.js';
import autocannon from 'autocannon';
import { sortBy } from '../helpers/sort-by.js';

type PathMap = Record<string, string>;

export const ssrPathMap: Record<string, PathMap | undefined> = {
  next: {
    '/dashboard': '/dashboard-ssr',
  },
  gatsby: {
    '/dashboard': '/dashboard-ssr',
  },
};

// These frameowrks do not use SSR right now
const IGNORE_FRAMEWORKS = [
  'lit', // currently client side only
  'react', // client side only
  'vue3', // client side only
  'nuxt3', // currently not buliding
  'qwik', // currently having issues being looked into
];

const path = process.env.URL || '/dashboard';

const frameworks = (await getFrameworks()).filter(
  (framework) => !IGNORE_FRAMEWORKS.includes(framework)
);

const resultsMap: Record<string, autocannon.Result> = {};

// Kill any currently running servers
await killAll(frameworks);

for (const framework of frameworks) {
  await measure(framework);
}

console.table(
  Object.entries(resultsMap)
    .map(([framework, result]) => ({
      name: framework,
      '1%': result.requests.p1,
      '50%': result.requests.p50,
      '99%': result.requests.p99,
      Avg: result.requests.average,
      'Std Dev': result.requests.stddev,
    }))
    .sort(sortBy('99%'))
    .reverse()
);

async function measure(framework: string) {
  const { process: runningProcess, port } = await preview(framework);
  // Hydrogen has a very long boot up period as it is launchhing miniflare
  await sleep(framework === 'hydrogen' ? 15000 : 5000);

  const usePath = ssrPathMap[framework]?.[path] || path;
  const measureUrl = `http://localhost:${port}${usePath}`;

  const result = (resultsMap[framework] = await measureTimeForRequests(
    measureUrl
  ));

  console.info(chalk.green(`Done with ${framework}:`), result);

  // Don't throw an error when we kill the process below
  runningProcess.catch(() => null);
  await runningProcess.kill();
}

async function measureTimeForRequests(url: string) {
  const result = await autocannon({
    url: url,
  });
  return result;
}
