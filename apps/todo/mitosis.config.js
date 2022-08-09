const vueConfig = {
  transpiler: { format: 'esm' },
  asyncComponentImports: true,
};

/**
 * @type {import('@builder.io/mitosis'.MitosisConfig)}
 */
module.exports = {
  files: 'src/**',
  targets: ['angular', 'qwik', 'react', 'solid', 'svelte', 'vue2', 'vue3'],
  options: {
    react: { transpiler: { format: 'esm', languages: ['ts'] } },
    solid: { transpiler: { languages: ['ts'] } },
    vue2: vueConfig,
    vue3: vueConfig,
  },
};
