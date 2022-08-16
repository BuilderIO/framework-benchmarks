const traverse = require('traverse');
const { escapeRegExp } = require('lodash');

/**
 * Simple plugin to allow you to write variables as dollars and convert to
 * var() syntax, e.g.
 *
 *    <div css={{ background: '$color-blue' }}></div>
 *
 * becomes:
 *
 *    <div css={{ background: 'var(--color-blue)' }}></div>
 *
 * Why? Terse syntax, familiar to scss devs, less error prone (I kept
 * beaking our CSS output by forgetting to have a closing paren :D)
 */
const dollarVarsPlugin = (options) => () => ({
  json: {
    pre: (json) => {
      traverse(json).forEach(function (item) {
        if (item?.['@type'] === '@builder.io/mitosis/node') {
          if (item.bindings?.css?.code) {
            item.bindings.css.code = item.bindings.css.code
              // $foo-bar -> var(--foo-bar)
              .replace(/(^|[^\\])\$([a-z0-9_\-]+)/g, '$1var(--$2)');
          }
        }
      });
    },
  },
});

/**
 * Allow simple find and replace swaps in CSS
 * 
 * e.g. 
 *  cssReplacePlugin({ '%mobile': '640px' }) 
 * 
 * will replace:
 *  '@media (max-width: %mobile)': { .. }
 * with:
 *  '@media (max-width: 640px)': { .. }
 */
const cssReplacePlugin = (options) => () => ({
  json: {
    pre: (json) => {
      traverse(json).forEach(function (item) {
        if (item?.['@type'] === '@builder.io/mitosis/node') {
          if (item.bindings?.css?.code) {
            for (const key of Object.keys(options)) {
              item.bindings.css.code = item.bindings.css.code.replace(
                new RegExp(escapeRegExp(key), 'g'),
                options[key]
              );
            }
          }
        }
      });
    },
  },
});

const baseOptions = {
  plugins: [
    dollarVarsPlugin(),
    cssReplacePlugin({
      '%mobile': '640px',
    }),
  ],
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
      stylesType: 'style-tag',
      transpiler: { ...transpilerOptions, languages: ['ts'] },
    },
    solid: {
      ...baseOptions,
      stylesType: 'style-tag',
      transpiler: { ...transpilerOptions, languages: ['ts'] },
    },
    preact: {
      ...baseOptions,
      stylesType: 'style-tag',
      transpiler: { ...transpilerOptions, languages: ['ts'] },
    },
    vue2: vueConfig,
    vue3: vueConfig,
    svelte: baseOptions,
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
