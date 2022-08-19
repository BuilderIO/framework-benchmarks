import { chalk, fetch, sleep } from 'zx';
import { getFrameworks } from '../helpers/get-frameworks.js';
import { killAll } from '../helpers/kill-process.js';
import { preview } from '../helpers/preview.js';
import { range } from '../helpers/range.js';
import { sortBy } from '../helpers/sort-by.js';

type PathMap = Record<string, string>;

export const ssrPathMap: Record<string, PathMap | undefined> = {
  next: {
    '/dashboard': '/dashboard-ssr',
  },
  'next-bun': {
    '/dashboard': '/dashboard-ssr',
  },
};

const DEFAULT_RUNS = 1;

const AMOUNT = Number(process.env.AMOUNT || 10_000);
const MAX_CONCURRENCY = Number(process.env.MAX_CONCURRENCY || 50);

// These frameowrks do not use SSR right now
const IGNORE_FRAMEWORKS = [
  'angular', // currently SPA only
  'lit', // currently client side only
  'react', // client side only
  'vue3', // client side only
  'gatsby', // SSG (maybe implement their SSR)
  'nuxt3', // currently not buliding
];

const path = process.env.URL || '/dashboard';
const RUNS = Number(process.env.RUNS || DEFAULT_RUNS);

const frameworks = (await getFrameworks()).filter(
  (framework) => !IGNORE_FRAMEWORKS.includes(framework)
);
const results: Record<string, number> = {};
// Kill any currently running servers
await killAll(frameworks);

for (const framework of frameworks) {
  await measure(framework);
}

const resultsTable = Object.entries(results)
  .map(([framework, time]) => {
    return {
      Name: framework,
      'Requests per second': Math.round(AMOUNT / (time / 1000)),
    };
  })
  .sort(sortBy('Requests per second'));

console.table(resultsTable);

async function measure(framework: string) {
  const { process: runningProcess, port } = await preview(framework);
  // Give the server a sec to start up
  await sleep(5000);

  const usePath = ssrPathMap[framework]?.[path] || path;
  const measureUrl = `http://localhost:${port}${usePath}`;
  for (let i = 0; i < RUNS; i++) {
    results[framework] = await measureTimeForRequests(measureUrl);
  }

  console.info(chalk.green(`Done with ${framework}:`), results[framework]);

  // Don't throw an error when we kill the process below
  runningProcess.catch(() => null);
  runningProcess.kill();
}

async function runChain(url: string, amount: number) {
  for (const i of range(amount)) {
    await fetch(url);
  }
}

async function measureTimeForRequests(url: string, amountOfRequests = AMOUNT) {
  const startTime = Date.now();
  const concurrency = MAX_CONCURRENCY;

  await Promise.all(
    range(concurrency).map(async () => {
      await runChain(url, amountOfRequests / concurrency);
    })
  );

  const endTime = Date.now();
  const time = endTime - startTime;
  return time;
}
