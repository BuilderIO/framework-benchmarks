import { $, fs, chalk } from 'zx';
import { build } from './build.js';

const frameworks = await fs.readdir('./frameworks');

const results = await build(frameworks);
console.info(chalk.green('Done!'), results);
