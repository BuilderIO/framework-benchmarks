import chalk from 'chalk';
import { build } from '../helpers/build.js';
import { getFrameworks } from '../helpers/get-frameworks.js';

const frameworks = await getFrameworks();

console.info(chalk.green(`Buildingg frameworks...`));
await build(frameworks);
