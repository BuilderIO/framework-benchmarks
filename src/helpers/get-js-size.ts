export type NetworkRequestItem = {
  url: string;
  transferSize: number;
  resourceType: string;
};

export type TreemapNode = {
  name: string;
  resourceBytes: number;
};

/**
 * From a lighthouse report, get the size of all JS requested
 *
 * @param {LighthouseReport} report - lighthouse report
 * @returns {number} - size of all JS requested in kb
 */
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
