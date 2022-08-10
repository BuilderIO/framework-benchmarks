const transpilerOptions = {
  format: 'esm',
};

const vueConfig = {
  transpiler: transpilerOptions,
  asyncComponentImports: true,
};

/**
 * @type {import('@builder.io/mitosis').MitbosisConfig}
 */
module.exports = {
  files: 'src/**',
  targets: [
    'angular',
    'react',
    'solid',
    'svelte',
    'vue2',
    'vue3',
    'marko',
    'qwik',
  ],
  options: {
    react: { transpiler: { ...transpilerOptions, languages: ['ts'] } },
    solid: { transpiler: { ...transpilerOptions, languages: ['ts'] } },
    vue2: vueConfig,
    vue3: vueConfig,
    angular: { standalone: true, transpiler: transpilerOptions },
    qwik: { transpiler: { ...transpilerOptions } },
    marko: { transpiler: { ...transpilerOptions } },
  },
};
