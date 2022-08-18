import { getJsSize } from './get-js-size.js';

export type SimpleReport = {
  jsKb?: number;
  totalKb?: number;
  fcpDisplay?: string;
  fcpNumber?: number;
  tbtDisplay?: string;
  tbtNumber?: number;
  ttiDisplay?: string;
  ttiNumber?: number;
  lcpDisplay?: string;
  lcpNumber?: number;
  score?: number;
};

export function getSimpleReport(report: LH.Result) {
  const jsSize = Math.round(getJsSize(report) / 1024);
  const fcp = report.audits['first-contentful-paint'];
  const lcp = report.audits['largest-contentful-paint'];
  const tbt = report.audits['total-blocking-time'];
  const tti = report.audits['interactive'];
  const score = (report.categories.performance.score || 0) * 100;

  const simpleReport = {
    jsKb: jsSize,
    totalKb: Math.round(
      (report.audits['total-byte-weight']?.numericValue || 0) / 1024
    ),
    fcpDisplay: fcp?.displayValue,
    fcpNumber: fcp?.numericValue,
    tbtDisplay: tbt?.displayValue,
    tbtNumber: tbt?.numericValue,
    ttiDisplay: tti?.displayValue,
    ttiNumber: tti?.numericValue,
    lcpDisplay: lcp?.displayValue,
    lcpNumber: lcp?.numericValue,
    score,
  };
  return simpleReport;
}
