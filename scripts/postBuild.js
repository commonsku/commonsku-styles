import fs from 'node:fs';
import { resolve, join, basename } from 'node:path';

const packagePath = process.cwd();
const distPath = join(packagePath, './dist');

const writeJson = (targetPath, obj) =>
  fs.writeFileSync(targetPath, JSON.stringify(obj, null, 2), 'utf8');

function createPackageFile() {
  const packageData = fs.readFileSync(resolve(packagePath, './package.json'), 'utf8');
  const { scripts, devDependencies, ...packageOthers } = JSON.parse(packageData);
  const newPackageData = {
    ...packageOthers,
    private: false,
    typings: './index.d.ts',
    main: './index.cjs',
    module: './index.mjs',
  };

  const targetPath = resolve(distPath, './package.json');

  writeJson(targetPath, newPackageData);
  console.log(`Created package.json in ${targetPath}`);
}

function includeFileInBuild(file) {
  const sourcePath = resolve(packagePath, file);
  const targetPath = resolve(distPath, basename(file));
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

function run() {
  try {
    createPackageFile();
    includeFileInBuild('./README.md');
    // await includeFileInBuild('../../LICENSE');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
