import { glob, fs } from 'zx';

const files = await glob([
  'frameworks/**/generated-components/**',
  '!**/node_modules/**',
]);
await Promise.all(
  files.map(async (file) => {
    await fs.remove(file);
  })
);
