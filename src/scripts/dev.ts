import { $ } from 'zx/core';
import { getFrameworks } from '../helpers/get-frameworks.js';

const frameworks = await getFrameworks();
frameworks.forEach((fw) => $`cd frameworks/${fw} && npm run dev`);
