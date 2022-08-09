import { fs, chalk } from 'zx';
import { buildFramework } from './build.js';
import { getJsSize } from './get-js-size.js';
import { getLighthouseReport } from './get-lighthouse-report.js';
import { preview } from './preview.js';

const frameworks = await fs.readdir('./frameworks');

const skipBuild = process.env.SKIP_BUILD === 'true';

for (const framework of frameworks) {
  if (!skipBuild) {
    console.info(chalk.green(`Building ${framework}...`));
    const time = await buildFramework(framework);
    console.info(`${chalk.green(framework)} built in ${time}ms`);
  }
  const { process, port } = await preview(framework);
  console.info(
    `Getting lighthouse report for ${chalk.green(
      framework
    )} on http://localhost:${port}`
  );
  const report = await getLighthouseReport(`http://localhost:${port}`);
  const jsSize = getJsSize(report);
  console.info(chalk.green(`${framework}:`, jsSize + 'kb'));
  await fs.writeFile('debug.json', JSON.stringify(report, null, 2));

  // Don't throw an error when we kill the process below
  process.catch(() => null);
  process.kill();
}
