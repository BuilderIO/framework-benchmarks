import { SimpleReport } from './get-simple-report.js';
import { sortBy } from './sort-by.js';

export function getTable(results: Record<string, SimpleReport>) {
  const table = Object.keys(results)
    // Add the framework name to the object
    .map((framework) => ({
      name: framework,
      ...results[framework],
    }))
    // Only include successful results (failed results have undefined values)
    .filter((item) => typeof item.jsKb === 'number')
    // Rank by tti
    .sort(sortBy('ttiNumber'))
    // Pick the display values
    .map((item) => ({
      name: item.name,
      TTI: item.ttiDisplay,
      FCP: item.fcpDisplay,
      LCP: item.lcpDisplay,
      TBT: item.tbtDisplay,
      Score: item.score,
      'Eager JS KiB': item.jsKb,
      'Total KiB': item.totalKb,
      // Getting really weird results for LCP, commenting out for now
      // LCP: item.lcpDisplay,
    }));

  return table;
}
