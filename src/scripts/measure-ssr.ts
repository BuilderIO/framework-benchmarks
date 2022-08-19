import { chalk, fetch, sleep } from 'zx';
import { getFrameworks } from '../helpers/get-frameworks.js';
import { killAll } from '../helpers/kill-process.js';
import { preview } from '../helpers/preview.js';
import { sortBy } from '../helpers/sort-by.js';

type PathMap = Record<string, string>;

export const ssrPathMap: Record<string, PathMap | undefined> = {
  next: {
    '/dashboard': '/dashboard-ssr',
  },
  'next-bun': {
    '/dashboard': '/dashboard-ssr',
  },
  gatsby: {
    '/dashboard': '/dashboard-ssr',
  },
};

const DEFAULT_RUNS = 10;

// These frameowrks do not use SSR right now
const IGNORE_FRAMEWORKS = [
  'angular', // currently SPA only
  'lit', // currently client side only
  'react', // client side only
  'vue3', // client side only
  'nuxt3', // currently not buliding
  'qwik', // currently having an issue that needs fixing
];

const path = process.env.URL || '/dashboard';
const RUNS = Number(process.env.RUNS || DEFAULT_RUNS);

const frameworks = (await getFrameworks()).filter(
  (framework) => !IGNORE_FRAMEWORKS.includes(framework)
);
const results: Record<string, number[]> = {};
// Kill any currently running servers
await killAll(frameworks);

for (const framework of frameworks) {
  await measure(framework);
}

const medianResults = Object.entries(results)
  .map(([framework, times]) => {
    const sorted = times.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median =
      sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
    return { Name: framework, 'Time (ms)': median };
  })
  .sort(sortBy('Time (ms)'));

console.table(medianResults);

async function measure(framework: string) {
  const { process: runningProcess, port } = await preview(framework);

  await sleep(5000);

  const usePath = ssrPathMap[framework]?.[path] || path;
  const measureUrl = `http://localhost:${port}${usePath}`;
  const fwResults = (results[framework] = [] as number[]);
  for (let i = 0; i < RUNS; i++) {
    fwResults.push(await measureSingleSsrTime(measureUrl));
  }

  console.info(chalk.green(`Done with ${framework}:`), fwResults);

  // Don't throw an error when we kill the process below
  runningProcess.catch(() => null);
  runningProcess.kill();
}

async function measureSingleSsrTime(url: string) {
  const startTime = Date.now();
  await fetch(url);
  const endTime = Date.now();
  const time = endTime - startTime;
  return time;
}
