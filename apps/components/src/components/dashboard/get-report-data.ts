export interface ReportData {
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
}

export function getReportData(report: LH.Result): ReportData {
  const jsSize = Math.round(getJsSize(report) / 1024);
  const fcp = report.audits['first-contentful-paint'];
  const lcp = report.audits['largest-contentful-paint'];
  const tbt = report.audits['total-blocking-time'];
  const tti = report.audits['interactive'];

  const data: ReportData = {
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
  };

  return data;
}

export function getJsSize(report: LH.Result) {
  try {
    const scriptTagBytes =
      (
        (report.audits['network-requests'] as any)?.details
          .items as NetworkRequestItem[]
      )
        ?.filter((item) => item.resourceType === 'Script')
        ?.reduce((acc, item) => acc + item.transferSize, 0) || 0;

    const inlineJsBytes =
      (
        (report.audits['script-treemap-data'] as any)?.details?.nodes?.[0]
          ?.children as TreemapNode[]
      )?.reduce((memo, node) => {
        if (node.name.startsWith('(inline)')) {
          return memo + node.resourceBytes || 0;
        }
        return memo;
      }, 0) || 0;

    return scriptTagBytes + inlineJsBytes;
  } catch (err) {
    console.warn('Could not get JS size', err);
    return 0;
  }
}

export type NetworkRequestItem = {
  url: string;
  transferSize: number;
  resourceType: string;
};

export type TreemapNode = {
  name: string;
  resourceBytes: number;
};
