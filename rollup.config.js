import fs from 'node:fs';
import path from 'node:path';

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from "rollup-plugin-dts";
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import image from '@rollup/plugin-image';
import svgr from '@svgr/rollup';
// import typescript from '@rollup/plugin-typescript';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import { getFiles } from './scripts/buildUtils.js';

import pkg from './package.json' assert { type: 'json' };

// see https://github.com/Hacker0x01/react-datepicker/issues/1606
const dateFnsDirs = fs
  .readdirSync(path.join(".", "node_modules", "date-fns"))
  .map((d) => `date-fns/${d}`);

const plugins = [
  peerDepsExternal({ includeDependencies: true }),
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
    useTsconfigDeclarationDir: true,
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    preventAssignment: true,
    __IS_DEV__: process.env.NODE_ENV === 'development',
  }),
  terser(),
];

const subfolderPlugins = (folderName) => [
  ...plugins,
  generatePackageJson({
    baseContents: {
      name: `${pkg.name}/${folderName.toLowerCase()}`,
      private: true,
      main: "./index.cjs",
      module: "./index.mjs",
      types: "./index.d.ts",
      peerDependencies: pkg.peerDependencies,
      version: pkg.version,
    },
    outputFolder: `dist/${folderName}/`
  }),
];

const folderBuilds = fs.readdirSync('./src/@commonsku/styles').map((folder) => {
  if (!fs.existsSync(`src/@commonsku/styles/${folder}/index.ts`)) {
    return null;
  }

  return {
    input: `src/@commonsku/styles/${folder}/index.ts`,
    output: [{
      file: `dist/${folder}/index.mjs`,
      format: 'es',
      exports: 'named',
    }, {
      file: `dist/${folder}/index.cjs`,
      format: 'cjs',
      exports: 'named',
    }],
    plugins: subfolderPlugins(folder),
    external: Object.keys(pkg.dependencies)
      .concat(Object.keys(pkg.peerDependencies))
      .concat(dateFnsDirs)
      .concat([/node_modules/]),
  };
}).filter(v => v);

const folderTypes = fs.readdirSync('./src/@commonsku/styles').map((folder) => {
  if (!fs.existsSync(`src/@commonsku/styles/${folder}/index.ts`)) {
    return null;
  }

  return {
    input: `dist/styles/${folder}/index.d.ts`,
    output: [{ file: `dist/${folder}/index.d.ts`, format: "es" }],
    plugins: [dts()],
  };
}).filter(v => v);

const config = [
  {
    input: getFiles('src/@commonsku/utils', ['js', 'ts', 'tsx']),
    output: {
      dir: 'dist/utils/',
      format: 'es',
    },
    plugins: plugins,
    external: [/node_modules/],
  },
  {
    input: 'src/@commonsku/styles/index.ts',
    output: [{
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      interop: 'compat',
    }, {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      interop: 'compat',
    }],
    plugins,
    external: Object.keys(pkg.dependencies)
      .concat(Object.keys(pkg.peerDependencies))
      .concat(dateFnsDirs)
      .concat([/node_modules/]),
  },
  ...folderBuilds,
  {
    input: "dist/styles/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
  ...folderTypes,
];

export default config;
