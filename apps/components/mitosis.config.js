const transpilerOptions = {
  format: 'esm',
};

const vueConfig = {
  transpiler: transpilerOptions,
  asyncComponentImports: true,
};

/**
 * @type {import('@builder.io/mitosis').MitosisConfig}
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
    'preact',
  ],
  options: {
    react: { transpiler: { ...transpilerOptions, languages: ['ts'] } },
    solid: {
      stylesType: 'style-tag',
      transpiler: { ...transpilerOptions, languages: ['ts'] },
    },
    preact: { transpiler: { ...transpilerOptions, languages: ['ts'] } },
    vue2: vueConfig,
    vue3: vueConfig,
    angular: { standalone: true, transpiler: transpilerOptions },
    qwik: { transpiler: { ...transpilerOptions } },
    marko: { transpiler: { ...transpilerOptions } },
  },
};
