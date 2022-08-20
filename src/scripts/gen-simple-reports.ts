import { glob, fs, chalk } from 'zx';
import { getSimpleReport, SimpleReport } from '../helpers/get-simple-report.js';
import { getTable } from '../helpers/get-table.js';

const reports = await glob('apps/components/src/reports/**/*.json');

type ResultsMap = Record<string, SimpleReport>;
type PathResultsMap = Record<string, ResultsMap>;
const pathResultsMap: PathResultsMap = {};

const IGNORE_FRAMEWORKS = process.env.IGNORE_FRAMEWORKS?.split(',') || [];

await Promise.all(
  reports.map(async (path) => {
    const pathSplit = path.split('/');
    let routePathPart = pathSplit.at(-2)!;
    if (routePathPart === 'reports') {
      routePathPart = 'hello-world';
    }
    const framework = pathSplit.at(-1)!.split('.json')[0];
    if (IGNORE_FRAMEWORKS.includes(framework)) {
      return;
    }
    const json = JSON.parse(await fs.readFile(path, 'utf8')) as LH.Result;
    const newFilePath = path.replace('.json', '_simple.ts');
    const simpleReport = getSimpleReport(json);

    if (!pathResultsMap[routePathPart]) {
      pathResultsMap[routePathPart] = {};
    }
    pathResultsMap[routePathPart][framework] = simpleReport;

    const newFile = `export default ${JSON.stringify(simpleReport, null, 2)}`;
    await fs.writeFile(newFilePath, newFile);
  })
);

for (const key of Object.keys(pathResultsMap)) {
  const resultsMap = pathResultsMap[key];
  const table = getTable(resultsMap);
  console.info(chalk.green(`Results for ${key}:`));
  console.table(table);
}
