import lighthouse from "lighthouse";
import * as puppeteer from "puppeteer";

import * as chromeLauncher from "chrome-launcher";
import { generateReport } from "lighthouse/lighthouse-core/report/report-generator";

// Original source: https://addyosmani.com/blog/puppeteer-recipes/#lighthouse-metrics
export async function lighthouseFromPuppeteer(
  url: string,
  options: chromeLauncher.Options
) {
  // Launch chrome using chrome-launcher
  const chrome = await chromeLauncher.launch(options);
  options.port = chrome.port;

  // Connect chrome-launcher to puppeteer
  const { webSocketDebuggerUrl } = await fetch(
    `http://localhost:${options.port}/json/version`
  ).then((res) => res.json());

  const browser = await puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
  });

  // Run Lighthouse
  const { lhr } = await lighthouse(url, options);
  await browser.disconnect();
  await chrome.kill();

  const json = generateReport(lhr, "json");

  const audits = (JSON.parse(json) as LH.Result).audits; // Lighthouse audits
  const first_contentful_paint = audits["first-contentful-paint"].displayValue;
  const total_blocking_time = audits["total-blocking-time"].displayValue;
  const time_to_interactive = audits["interactive"].displayValue;

  console.log(`\n
     Lighthouse metrics: 
     🎨 First Contentful Paint: ${first_contentful_paint}, 
     ⌛️ Total Blocking Time: ${total_blocking_time},
     👆 Time To Interactive: ${time_to_interactive}`);
}
