import open from 'open';
import puppeteer from 'puppeteer';
import {
  startFlow,
  auditFlowArtifacts,
} from 'lighthouse/core/fraggle-rock/api.js';
import { getFrameworks } from '../helpers/get-frameworks.js';
import { killAll } from '../helpers/kill-process.js';
import { preview } from '../helpers/preview.js';
import { sleep, fs, chalk } from 'zx';
import { sortBy } from '../helpers/sort-by.js';

const reports: LH.FlowResult[] = [];

// TODO: implement runs and computeMedianRun
const RUNS = Number(process.env.RUNS || 1);

async function captureTodoReport(url: string, framework: string) {
  const page = await browser.newPage();

  const flow = await startFlow(page, {
    name: framework,
    config: {
      extends: 'lighthouse:default',
    },
  });

  await page.goto(url, { waitUntil: 'networkidle0' });
  await flow.snapshot({ stepName: 'Page loaded' });

  const todoButtonSelector = 'form button';
  await page.waitForSelector(todoButtonSelector);
  await page.type('form input', 'new todo!');
  await flow.startTimespan({ stepName: 'Add Todo' });
  await page.click(todoButtonSelector);
  await page.click(todoButtonSelector);
  await page.click(todoButtonSelector);
  await page.click(todoButtonSelector);
  const newItemSelector = 'li[data-index="5"]';
  await page.waitForSelector(newItemSelector);
  await flow.endTimespan();
  await flow.snapshot({ stepName: 'Added Todo Item' });

  page.close();

  const artifact = await flow.createArtifactsJson();
  const flowResult = await auditFlowArtifacts(artifact);
  reports.push(flowResult);
  const report = await flow.generateReport();
  await fs.writeFile('flow.report.html', report);
  await fs.writeFile('flow.report.json', JSON.stringify(flowResult, null, 2));
  console.info(
    chalk.green(
      `${framework} flow report generated. INP:`,
      getInp(flowResult).displayValue
    )
  );
}

const omit = (obj: any, omitKeys: string[]) => {
  const newObj = { ...obj };
  omitKeys.forEach((key) => delete newObj[key]);
  return newObj;
};

function getInp(report: LH.FlowResult) {
  const inpAudit =
    report.steps[1].lhr.audits['experimental-interaction-to-next-paint'];
  return inpAudit;
}

function getTable(reports: LH.FlowResult[]) {
  const table = reports
    .map((report) => {
      const inpAudit = getInp(report);
      return {
        name: report.name,
        INP: inpAudit.displayValue,
        inpNumber: inpAudit.numericValue,
      };
    })
    .sort(sortBy('inpNumber'))
    .map((item) => omit(item, ['inpNumber']));

  return table;
}

// Ignore the SSR-only examples
const IGNORE_FRAMEWORKS = ['react-ssr-node', 'react-ssr-bun', 'react-ssr-deno'];

const frameworks = (await getFrameworks()).filter(
  (fw) => !IGNORE_FRAMEWORKS.includes(fw)
);

const path = '/todo';

const chrome = await puppeteer.launch({ headless: false });
const browser = await chrome.createIncognitoBrowserContext();

await killAll(frameworks);
for (const framework of frameworks) {
  const { process: runningProcess, port } = await preview(framework);
  // Give the server a sec to start up
  await sleep(5000);

  const measureUrl = `http://localhost:${port}${path}`;
  await captureTodoReport(measureUrl, framework);

  // Don't throw an error when we kill the process below
  runningProcess.catch(() => null);
  await runningProcess.kill();
}

console.table(getTable(reports));

await chrome.close();
