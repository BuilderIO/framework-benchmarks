import open from 'open';
import puppeteer from 'puppeteer';
import { startFlow } from 'lighthouse/core/fraggle-rock/api.js';
import { getFrameworks } from '../helpers/get-frameworks.js';
import { killAll } from '../helpers/kill-process.js';
import { preview } from '../helpers/preview.js';
import { sleep, fs } from 'zx';

async function captureTodoReport(url: string) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const flow = await startFlow(page, { name: 'Squoosh snapshots' });

  await page.goto(url, { waitUntil: 'networkidle0' });

  const todoButtonSelector = 'form button';
  await page.waitForSelector(todoButtonSelector);
  await flow.snapshot({ stepName: 'Page loaded' });
  await page.click(todoButtonSelector);

  const newItemSelector = 'li:nth-of-type(3)';
  await page.waitForSelector(newItemSelector);
  await flow.snapshot({ stepName: 'Added Todo Item' });

  browser.close();

  const result = await flow.createFlowResult();
  const report = await flow.generateReport();
  await fs.writeFile('flow.report.html', report);
  await fs.writeFile('flow.report.json', JSON.stringify(result, null, 2));
  open('flow.report.html', { wait: false });
}

// Ignore the SSR-only examples
const IGNORE_FRAMEWORKS = ['react-ssr-node', 'react-ssr-bun', 'react-ssr-deno'];

const frameworks = (await getFrameworks()).filter(
  (fw) => !IGNORE_FRAMEWORKS.includes(fw)
);

const path = '/todo';

await killAll(frameworks);
for (const framework of frameworks) {
  const { process: runningProcess, port } = await preview(framework);
  // Give the server a sec to start up
  await sleep(2000);

  const measureUrl = `http://localhost:${port}${path}`;
  await captureTodoReport(measureUrl);

  // Don't throw an error when we kill the process below
  runningProcess.catch(() => null);
  await runningProcess.kill();
}
