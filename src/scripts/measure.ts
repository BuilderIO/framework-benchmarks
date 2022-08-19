import { fs, chalk, sleep } from 'zx';
import { getFrameworks } from '../helpers/get-frameworks.js';
import {
  DEFAULT_RUNS,
  getLighthouseReport,
  teardownBrowser,
} from '../helpers/get-lighthouse-report.js';
import { getSimpleReport, SimpleReport } from '../helpers/get-simple-report.js';
import { getTable } from '../helpers/get-table.js';
import { killAll } from '../helpers/kill-process.js';
import { preview } from '../helpers/preview.js';

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

  if (process.env.NO_WRITE !== 'true') {
    await Promise.all([
      // Output results to a JSON file
      fs.outputFile(jsonPath, JSON.stringify(report, null, 2)),
      // Output results to a TS file for importing
      fs.outputFile(
        jsPath,
        `export default ${JSON.stringify(report, null, 2)} as LH.Result`
      ),
    ]);
  }

  // Don't throw an error when we kill the process below
  runningProcess.catch(() => null);
  runningProcess.kill();
}
