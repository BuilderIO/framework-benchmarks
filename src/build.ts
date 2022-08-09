import { $ } from 'zx';

/**
 * Build a list of frameworks
 */
export async function build(frameworks: string[], parallel = true) {
  const buildResults: Record<string, number> = {};

  if (parallel) {
    await Promise.all(
      frameworks.map(async (framework) => {
        buildResults[framework] = await buildFramework(framework);
      })
    );
  } else {
    for (const framework of frameworks) {
      buildResults[framework] = await buildFramework(framework);
    }
  }

  return buildResults;
}

/**
 * Build a single framework
 */
export async function buildFramework(framework: string) {
  const start = Date.now();
  await $`cd frameworks/${framework} && npm run build`;
  return Date.now() - start;
}
