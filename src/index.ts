import 'zx/globals';

export async function main() {
  const frameworks = await fs.readdir('./frameworks');
  for (const framework of frameworks) {
    await $`cd frameworks/${framework} && npm run build`;
  }
}

if (require.main === module) {
  main();
}
