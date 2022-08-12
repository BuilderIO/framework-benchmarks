import chalk from 'chalk';
import { build } from '../helpers/build.js';
import { getFrameworks } from '../helpers/get-frameworks.js';
import { sortBy } from '../helpers/sort-by.js';

const frameworks = await getFrameworks();

console.info(chalk.green(`Building frameworks...`));
const times = await build(frameworks, process.env.PARALLEL !== 'false');

console.table(getTable(times));

function getTable(results: Record<string, number>) {
  const table = Object.keys(results)
    // Add the framework name to the object
    .map((framework) => ({
      name: framework,
      time: results[framework],
    }))
    // Rank by tti
    .sort(sortBy('time'))
    // Pick the display values
    .map((item) => ({
      Name: item.name,
      'Build Time (Seconds)': Math.round(item.time / 100) / 10,
    }));

  return table;
}
