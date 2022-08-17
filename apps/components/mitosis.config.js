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
 *  cssReplacePlugin({ '@mobile': '@media screen and (max-width: 640px)' })
 *
 * will replace:
 *  '@mobil': { ... }
 * with:
 *  '@media screen and (max-width: 640px)': { .. }
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

const stripSvelteNonRootStyle = () => () => ({
  code: {
    // Remove generated inline styles for svelte - they break the build
    // This matches what we generate:
    post: (code) => code.replace(/<style>\s*{@html[\s\S]+?<\/style>/g, ''),
  },
});

const baseOptions = {
  plugins: [
    dollarVarsPlugin(),
    cssReplacePlugin({
      '@mobile': '@media screen and (max-width: 640px)',
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
      transpiler: { ...transpilerOptions },
    },
    solid: {
      ...baseOptions,
      stylesType: 'style-tag',
      transpiler: { ...transpilerOptions },
    },
    preact: {
      ...baseOptions,
      stylesType: 'style-tag',
      transpiler: { ...transpilerOptions },
    },
    vue2: vueConfig,
    vue3: vueConfig,
    svelte: {
      ...baseOptions,
      plugins: baseOptions.plugins.concat([stripSvelteNonRootStyle()]),
    },
    angular: {
      ...baseOptions,
      standalone: true,
      transpiler: transpilerOptions,
    },
    qwik: { ...baseOptions, transpiler: { ...transpilerOptions } },
    marko: { ...baseOptions, transpiler: { ...transpilerOptions } },
    lit: {
      ...baseOptions,
      transpiler: { ...transpilerOptions },
    },
  },
};
