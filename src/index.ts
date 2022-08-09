import 'zx/globals';

const frameworks = await fs.readdir('./frameworks');
for (const framework of frameworks) {
  await $`cd frameworks/${framework} && npm run build`;
}
