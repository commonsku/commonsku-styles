import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import image from '@rollup/plugin-image';
// import typescript from '@rollup/plugin-typescript';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

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
    postcss({
      modules: true
    }),
    image(),
    url({ 
      include: [
        '**/*.eot', '**/*.otf', '**/*.ttf', '**/*.woff', '**/*.woff2', 
        '**/*.png', '**/*.jpg', '**/*.gif'
      ], 
    }),
    resolve(),
    typescript({
      tsconfig: 'tsconfig.lib.json',
    }),
    commonjs()
  ]
};