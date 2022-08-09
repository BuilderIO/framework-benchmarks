import 'zx/globals';

const frameworks = await fs.readdir('./frameworks');
await Promise.all(
  frameworks.map((framework) => $`cd frameworks/${framework} && npm run build`)
);
