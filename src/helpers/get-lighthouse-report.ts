import lighthouse from 'lighthouse';
import * as puppeteer from 'puppeteer';
import fetch from 'node-fetch';

import * as chromeLauncher from 'chrome-launcher';
import reportGenerator from 'lighthouse/report/generator/report-generator.js';

// Original source: https://addyosmani.com/blog/puppeteer-recipes/#lighthouse-metrics
export async function getLighthouseReport(
  url: string,
  options: chromeLauncher.Options = {}
) {
  options = {
    ...options,
  };
  // Launch chrome using chrome-launcher
  const chrome = await chromeLauncher.launch(options);
  options.port = chrome.port;

  // Connect chrome-launcher to puppeteer
  const { webSocketDebuggerUrl } = (await fetch(
    `http://localhost:${options.port}/json/version`
  ).then((res) => res.json())) as any;

  const browser = await puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
  });

  // Run Lighthouse
  const { lhr } = await lighthouse(url, options);
  await browser.disconnect();
  await chrome.kill();

  const json: LH.Result = JSON.parse(
    reportGenerator.generateReport(lhr, 'json')
  );

  return json;
}
