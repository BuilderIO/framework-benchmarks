import { $ } from 'zx';
import { getFrameworks } from './get-frameworks.js';

export async function install(framework: string, packageName?: string) {
  return $`cd frameworks/${framework} && npm install ${packageName || ''}`;
}

// Fresh uses deno, so we do not npm install dependencies
const noInstallFrameworks = new Set(['fresh']);

export async function installAll(frameworks?: string[], packageName?: string) {
  if (!frameworks) {
    frameworks = await getFrameworks();
  }
  return Promise.all(
    frameworks
      .filter((framework) => !noInstallFrameworks.has(framework))
      .map((framework) => install(framework, packageName))
  );
}
