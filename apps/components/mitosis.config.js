const traverse = require('traverse');

/**
 * Simple plugin to allow you to write variables as dollars and convert to
 * var() syntax, e.g.
 *
 *    <div css={{ background: '$blue' }}></div>
 *
 * becomes:
 *
 *    <div css={{ background: 'var(--blue)' }}></div>
 *
 * Why? Terse syntax, familiar to scss devs, less error prone (I kept
 * beaking our CSS output by forgetting to have a closing paren :D)
 */
const dollarVarsPlugin = () => () => ({
  json: {
    pre: (json) => {
      traverse(json).forEach(function (item) {
        if (item?.['@type'] === '@builder.io/mitosis/node') {
          if (item.bindings?.css?.code) {
            item.bindings.css.code = item.bindings.css.code.replace(
              /(^|[^\\])\$([a-z0-9_\-]+)/g,
              'var(--$2)'
            );
          }
        }
      });
    },
  },
});

const baseOptions = {
  plugins: [dollarVarsPlugin()],
};

const transpilerOptions = {
  format: 'esm',
};

const vueConfig = {
  ...baseOptions,
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
    'lit',
    'svelte',
    'vue2',
    'vue3',
    'marko',
    'qwik',
    'preact',
  ],
  options: {
    react: {
      ...baseOptions,
      transpiler: { ...transpilerOptions, languages: ['ts'] },
    },
    solid: {
      ...baseOptions,
      stylesType: 'style-tag',
      transpiler: { ...transpilerOptions, languages: ['ts'] },
    },
    preact: {
      ...baseOptions,
      transpiler: { ...transpilerOptions, languages: ['ts'] },
    },
    vue2: vueConfig,
    vue3: vueConfig,
    angular: {
      ...baseOptions,
      standalone: true,
      transpiler: transpilerOptions,
    },
    qwik: { ...baseOptions, transpiler: { ...transpilerOptions } },
    marko: { ...baseOptions, transpiler: { ...transpilerOptions } },
    lit: {
      ...baseOptions,
      transpiler: { ...transpilerOptions, languages: ['ts'] },
    },
  },
};
