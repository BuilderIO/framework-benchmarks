import { fs, chalk, sleep } from 'zx';
import { getFrameworks } from '../helpers/get-frameworks.js';
import {
  DEFAULT_RUNS,
  getLighthouseReport,
  teardownBrowser,
} from '../helpers/get-lighthouse-report.js';
import { getSimpleReport, SimpleReport } from '../helpers/get-simple-report.js';
import { killAll } from '../helpers/kill-process.js';
import { preview } from '../helpers/preview.js';
import { sortBy } from '../helpers/sort-by.js';

const frameworks = await getFrameworks();

const path = process.env.URL || '/todo';

// Kill any currently running servers
await killAll(frameworks);

const PARALLEL = process.env.PARALLEL ? process.env.PARALLEL === 'true' : false;
const RUNS = Number(process.env.RUNS || DEFAULT_RUNS);

const results: Record<string, SimpleReport> = {};

if (PARALLEL) {
  await Promise.all(frameworks.map(measure));
} else {
  for (const framework of frameworks) {
    await measure(framework);
  }
}

await teardownBrowser();

console.info(chalk.green('Done!'));
console.table(getTable(results));

async function measure(framework: string) {
  const { process: runningProcess, port } = await preview(framework);
  // Give the server a sec to start up
  await sleep(2000);

  const measureUrl = `http://localhost:${port}${path}`;
  console.info(
    `Getting lighthouse report for ${chalk.green(framework)} on ${measureUrl}`
  );

  const { report } = await getLighthouseReport(measureUrl, RUNS);
  results[framework] = getSimpleReport(report);

  const outputDir = 'apps/components/src/reports';
  const pathFragment = path === '/' ? '/' : path + '/';
  const jsonPath = `${outputDir}${pathFragment}${framework}.json`;
  const jsPath = `${outputDir}${pathFragment}${framework}.ts`;

  await Promise.all([
    // Output results to a JSON file
    fs.outputFile(jsonPath, JSON.stringify(report, null, 2)),
    // Output results to a JS file for importing
    fs.outputFile(
      jsPath,
      `export default ${JSON.stringify(report, null, 2)} as LH.Result`
    ),
  ]);

  // Don't throw an error when we kill the process below
  runningProcess.catch(() => null);
  runningProcess.kill();
}

function getTable(results: Record<string, SimpleReport>) {
  const table = Object.keys(results)
    // Add the framework name to the object
    .map((framework) => ({
      name: framework,
      ...results[framework],
    }))
    // Only include successful results (failed results have undefined values)
    .filter((item) => typeof item.jsKb === 'number')
    // Rank by tti
    .sort(sortBy('ttiNumber'))
    // Pick the display values
    .map((item) => ({
      name: item.name,
      TTI: item.ttiDisplay,
      FCP: item.fcpDisplay,
      LCP: item.lcpDisplay,
      TBT: item.tbtDisplay,
      Score: item.score,
      'Eager JS KiB': item.jsKb,
      'Total KiB': item.totalKb,
      // Getting really weird results for LCP, commenting out for now
      // LCP: item.lcpDisplay,
    }));

  return table;
}
