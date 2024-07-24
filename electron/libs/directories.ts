import fs from 'fs';
import fetchInstalledSoftware from 'fetch-installed-software';
import osf from 'os';
import pathh from 'path';

async function getDirectoryList(path: string) {
  const newPath = path.split('\\').length === 1 ? `${path}` : `${path}\\`;

  const dirs = fs.readdirSync(path, { withFileTypes: true });
  const data = dirs.map((dr) => ({
    fileName: dr.name,
    isFile: dr.isFile(),
    isDirectory: dr.isDirectory(),
    filepath: `${newPath}${dr.name}`
  }));

  return data;
}

async function getInstalledSoftwares() {
  return fetchInstalledSoftware.getAllInstalledSoftwareSync();
}

async function getShortcutsList(pathd: string) {
  const newPath = pathh.join(osf.homedir(), pathd);

  // console.log(newPath)

  const dirs = fs.readdirSync(newPath, { withFileTypes: true });
  const data = dirs.map((dr) => ({
    fileName: dr.name,
    isFile: dr.isFile(),
    isDirectory: dr.isDirectory(),
    filepath: `${newPath}\\${dr.name}`
  }));

  return data;
}

export { getDirectoryList, getInstalledSoftwares, getShortcutsList };
