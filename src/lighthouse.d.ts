/// <reference types="lighthouse/types/global-lh" />

declare module "lighthouse" {
  function lighthouse(
    url: string,
    options: Partial<LH.CliFlags>
  ): Promise<LH.RunnerResult>;
  export = lighthouse;
}

declare module "lighthouse/lighthouse-core/report/report-generator" {
  function generateReport(lhr: LH.LHResult, type: string): string;

  export { generateReport };
}
