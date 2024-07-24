/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import fs from 'fs';
import path from 'path';

async function getMusicList(pathString: string) {
  const validFileFormats = [
    '.3gp',
    '.aa',
    '.aac',
    '.aax',
    '.act',
    '.aiff',
    '.alac',
    '.amr',
    '.ape',
    '.au',
    '.awb',
    '.dss',
    '.dvf',
    '.flac',
    '.gsm',
    '.iklax',
    '.ivs',
    '.m4a',
    '.m4b',
    '.m4p',
    '.mmf',
    '.movpkg',
    '.mp3',
    '.mpc',
    '.msv',
    '.nmf',
    '.ogg',
    '.oga',
    '.mogg',
    '.opus',
    '.ra',
    '.rm',
    '.raw',
    '.rf64',
    '.sln',
    '.tta',
    '.voc',
    '.vox',
    '.wav',
    '.wma',
    '.wv',
    '.webm',
    '.8svx',
    '.cda'
  ];
  const newPath = pathString.split('\\').length === 1 ? `${pathString}` : `${pathString}\\`;

  const dirs = fs.readdirSync(pathString, { withFileTypes: true });
  const data = dirs.map((dr) => ({
    fileName: dr.name,
    isFile: dr.isFile(),
    fileType: dr.isFile() ? path.extname(`${newPath}${dr.name}`) : null,
    isDirectory: dr.isDirectory(),
    filepath: `${newPath}${dr.name}`
  }));

  return data.filter((flt) => {
    if (!flt.isDirectory) {
      if (flt.fileType) {
        if (validFileFormats.includes(flt.fileType)) {
          return flt;
        }
      }
    } else {
      return flt;
    }
  });
}

export { getMusicList };
