import { $ } from 'zx';
import { getFrameworks } from './get-frameworks.js';

export async function install(framework: string) {
  return $`cd frameworks/${framework} && npm install`;
}

export async function installAll(frameworks?: string[]) {
  if (!frameworks) {
    frameworks = await getFrameworks();
  }
  return Promise.all(frameworks.map(install));
}
