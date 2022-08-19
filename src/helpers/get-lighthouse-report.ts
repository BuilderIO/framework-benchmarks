import lighthouse from 'lighthouse';
import * as puppeteer from 'puppeteer';
import fetch from 'node-fetch';
import { computeMedianRun } from 'lighthouse/core/lib/median-run.js';

import * as chromeLauncher from 'chrome-launcher';
import reportGenerator from 'lighthouse/report/generator/report-generator.js';
import lhConfig from './lh-config.js';

let ports: number[] = [];
const chromeInstances: chromeLauncher.LaunchedChrome[] = [];
const browserInstances: puppeteer.Browser[] = [];

const PARALLEL = process.env.PARALLEL === 'true';

/**
 * Setup a chrome and puppeteer instance if we haven't already
 *
 * @param {number} n - the number of the given run
 */
async function setupBrowser(n: number, options: chromeLauncher.Options = {}) {
  // If we have initialized, return
  if (chromeInstances[n]) {
    return;
  }
  chromeInstances[n] = await chromeLauncher.launch(options);
  ports[n] = chromeInstances[n].port;

  // Connect chrome-launcher to puppeteer
  const { webSocketDebuggerUrl } = (await fetch(
    `http://localhost:${ports[n]}/json/version`
  ).then((res) => res.json())) as any;

  browserInstances[n] = await puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
  });
}

export async function teardownBrowser() {
  for (const browser of browserInstances) {
    await browser.close();
  }
  for (const chrome of chromeInstances) {
    await chrome.kill();
  }
  ports = [];
}

export const DEFAULT_RUNS = 3;

/**
 * Get a median lighthouse report for a given url
 */
export async function getLighthouseReport(
  url: string,
  runs = DEFAULT_RUNS,
  options: chromeLauncher.Options = {}
) {
  let reports: LH.Result[] = [];
  if (PARALLEL) {
    reports = await Promise.all(
      range(runs).map(async (n) => {
        const report = await getSingleLighthouseReport(url, n, options);
        return report;
      })
    );
  } else {
    for (let i = 0; i < runs; i++) {
      const report = await getSingleLighthouseReport(url, i, options);
      reports.push(report);
    }
  }
  const median = computeMedianRun(reports);
  return {
    report: median,
  };
}

// TODO: move this to lighthouse directly. I'm not finding how to do this,
// but it is supposed to exist: https://twitter.com/cjamcl/status/1558303078452867074
async function getInlineJsBytes(url: string) {
  const browser = browserInstances[0];
  const page = await browser.newPage();
  await page.goto(url);

  // Assumes one byte per character. Does not account for gzipping
  const inlineJsBytes = await page?.evaluate(() => {
    return Array.from(document.querySelectorAll('script:not([src])')).reduce(
      (memo, _script) => {
        const script = _script as HTMLScriptElement;
        if (
          !['module', ''].includes(script.type) ||
          script.type.includes('javascript')
        ) {
          return memo;
        }

        return memo + (script.textContent || '').length;
      },
      0
    );
  });
  await page.close();

  return inlineJsBytes;
}

// Adapted from: https://addyosmani.com/blog/puppeteer-recipes/#lighthouse-metrics
export async function getSingleLighthouseReport(
  url: string,
  n: number,
  options: chromeLauncher.Options = {}
) {
  await setupBrowser(n);

  // Run Lighthouse
  const { lhr } = await lighthouse(
    url,
    {
      ...options,
      port: ports[n],
      preset: 'experimental',
    }
    // lhConfig
  );

  const lhReport: LH.Result = JSON.parse(
    reportGenerator.generateReport(lhr, 'json')
  );

  return lhReport;
}

process.on('beforeExit', async () => {
  await teardownBrowser();
});

process.on('uncaughtException', async (err) => {
  console.error(new Date().toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);
  await teardownBrowser();
  process.exit(1);
});
