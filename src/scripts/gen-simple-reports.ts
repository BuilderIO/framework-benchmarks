import { glob, fs } from 'zx';
import { getSimpleReport } from '../helpers/get-simple-report.js';

const reports = await glob('apps/components/src/reports/**/*.json');
await Promise.all(
  reports.map(async (path) => {
    const json = JSON.parse(await fs.readFile(path, 'utf8')) as LH.Result;
    const newFilePath = path.replace('.json', '_simple.ts');
    const simpleReport = getSimpleReport(json);
    const newFile = `export default ${JSON.stringify(simpleReport, null, 2)}`;
    await fs.writeFile(newFilePath, newFile);
  })
);
