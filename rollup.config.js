import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import image from '@rollup/plugin-image';
import svgr from '@svgr/rollup';
// import typescript from '@rollup/plugin-typescript';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';

import pkg from './package.json';

export default {
  input: 'src/@commonsku/styles/index.ts',
  output: [{
    file: pkg.main,
    format: 'cjs',
    exports: 'named',
    sourcemap: true
  }, {
    file: pkg.module,
    format: 'es',
    exports: 'named',
    sourcemap: true
  }],
  plugins: [
    peerDepsExternal(),
    progress(),
    image(),
    url({ 
      include: [
        '**/*.eot', '**/*.otf', '**/*.ttf', '**/*.woff', '**/*.woff2', 
        '**/*.png', '**/*.jpg', '**/*.gif'
      ], 
    }),
    svgr(),
    commonjs({
      include: ['node_modules/**'],
      exclude: ['node_modules/process-es6/**'],
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'PropTypes',
          'createElement',
        ],
        'node_modules/react-dom/index.js': ['render'],
        'node_modules/react-table/index.js': [
          'useTable', 
          'useSortBy', 
          'useBlockLayout', 
          'usePagination', 
          'useColumnOrder'
        ],
        'node_modules/react-is/index.js': ['isValidElementType', 'isContextConsumer']
      },
    }),
    postcss({
      modules: true
    }),
    resolve(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime'
    }),
    filesize(),
    typescript({
      tsconfig: 'tsconfig.lib.json',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ]
};
