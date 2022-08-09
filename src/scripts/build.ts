import chalk from 'chalk';
import { build } from '../helpers/build';
import { getFrameworks } from '../helpers/get-frameworks';

const frameworks = await getFrameworks();

console.info(chalk.green(`Buildingg frameworks...`));
await build(frameworks);
