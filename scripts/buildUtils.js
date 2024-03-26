import fs from 'node:fs';

export const getComponentsFolders = (entry) => (
  fs.readdirSync(entry).filter(
    dir => fs.existsSync(`${entry}/${dir}/index.ts`) && (![
      'utils',
      'types',
      'img',
      '.DS_Store',
    ].includes(dir))
  )
);

export const getFiles = (entry, extensions = [], excludeExtensions = []) => {
  let fileNames = [];
  const dirs = fs.readdirSync(entry);
  dirs.forEach((dir) => {
    const path = `${entry}/${dir}`;

    if (fs.lstatSync(path).isDirectory()) {
      fileNames = [
        ...fileNames,
        ...getFiles(path, extensions, excludeExtensions),
      ];

      return;
    }

    if (!excludeExtensions.some((exclude) => dir.endsWith(exclude))
      && extensions.some((ext) => dir.endsWith(ext))
    ) {
      fileNames.push(path);
    }
  });
  return fileNames;
};