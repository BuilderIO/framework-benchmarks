import { fs, chalk, sleep } from 'zx';
import { getFrameworks } from '../helpers/get-frameworks.js';
import { getJsSize } from '../helpers/get-js-size.js';
import { getLighthouseReport } from '../helpers/get-lighthouse-report.js';
import { killAll } from '../helpers/kill-process.js';
import { preview } from '../helpers/preview.js';

const frameworks = await getFrameworks();

const path = process.env.MEASURE_PATH || '/todo';

// Kill any currently running servers
await killAll(frameworks);

export type Measurement = {
  jsKb: number | 'ERR';
  fcp?: string;
  tbt?: string;
  tti?: string;
};

const frameworkKbMap: Record<string, Measurement> = {};
for (const framework of frameworks) {
  const { process, port } = await preview(framework);
  // Give the server a sec to start up
  await sleep(2000);

  const measureUrl = `http://localhost:${port}${path}`;
  console.info(
    `Getting lighthouse report for ${chalk.green(framework)} on ${measureUrl}`
  );
  const report = await getLighthouseReport(measureUrl);
  const jsSize = getJsSize(report);
  const fcp = report.audits['first-contentful-paint'].displayValue;
  const tbt = report.audits['total-blocking-time'].displayValue;
  const tti = report.audits['interactive'].displayValue;

  frameworkKbMap[framework] = {
    jsKb: jsSize,
    fcp,
    tbt,
    tti,
  };
  console.info(chalk.green(`${framework}:`, jsSize + 'kb'));

  if (global.process.env.DEBUG === 'true') {
    await fs.writeFile('debug.json', JSON.stringify(report, null, 2));
  }

  // Don't throw an error when we kill the process below
  process.catch(() => null);
  process.kill();
}

console.info(chalk.green('Done!'));
console.table(frameworkKbMap);
