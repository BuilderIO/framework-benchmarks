import lighthouse from 'lighthouse';
import * as puppeteer from 'puppeteer';
import fetch from 'node-fetch';

import * as chromeLauncher from 'chrome-launcher';
import reportGenerator from 'lighthouse/report/generator/report-generator.js';

let port: number;
let chrome: chromeLauncher.LaunchedChrome | null = null;
let browser: puppeteer.Browser | null = null;

/**
 * Setup a chrome and puppeteer instance if we haven't already
 */
async function setupBrowser(options: chromeLauncher.Options = {}) {
  // If we have initialized, return
  if (chrome) {
    return;
  }
  chrome = await chromeLauncher.launch(options);
  port = chrome.port;

  // Connect chrome-launcher to puppeteer
  const { webSocketDebuggerUrl } = (await fetch(
    `http://localhost:${port}/json/version`
  ).then((res) => res.json())) as any;

  browser = await puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
  });
}

export async function teardownBrowser() {
  await browser?.disconnect();
  await chrome?.kill();
  chrome = null;
  browser = null;
}

// Adapted from: https://addyosmani.com/blog/puppeteer-recipes/#lighthouse-metrics
export async function getLighthouseReport(
  url: string,
  options: chromeLauncher.Options = {}
) {
  await setupBrowser();

  // Run Lighthouse
  const { lhr } = await lighthouse(url, {
    ...options,
    port,
  });
  const page = await browser!.newPage();
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

  const lhReport: LH.Result = JSON.parse(
    reportGenerator.generateReport(lhr, 'json')
  );

  return {
    lhReport,
    inlineJsBytes,
  };
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
