import { getFrameworks } from '../helpers/get-frameworks.js';
import { preview } from '../helpers/preview.js';

const frameworks = await getFrameworks();
frameworks.forEach((fw) => preview(fw));
