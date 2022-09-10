import nodeResolve from '@rollup/plugin-node-resolve';
import common from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'http.jsx',
  output: [
    {
      file: 'dist/http.js',
      format: 'esm'
    },
  ],
  external: ['solid-js', 'solid-js/web', 'path', 'stream', 'http'],
  plugins: [
    nodeResolve({ preferBuiltins: true, exportConditions: ['solid', 'node'] }),
    babel({
      babelHelpers: 'bundled',
      presets: [['solid', { generate: 'ssr' }]],
    }),
    common(),
  ],
  preserveEntrySignatures: false,
};
