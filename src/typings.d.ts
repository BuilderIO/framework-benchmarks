import { Page } from 'puppeteer';

declare module 'lighthouse/core/lib/median-run.js' {
  export function computeMedianRun(runs: LH.Result[]): LH.Result;
}

declare module 'lighthouse/core/fraggle-rock/api.js' {
  export async function startFlow(page: Page, options: any): any;
  export async function auditFlowArtifacts(artifact: any): Promise<any>;
}
