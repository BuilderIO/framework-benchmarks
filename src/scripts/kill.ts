import { getFrameworks } from '../helpers/get-frameworks.js';
import { killAll } from '../helpers/kill-process.js';

// Kill all processes running on our framework ports
killAll(await getFrameworks());
