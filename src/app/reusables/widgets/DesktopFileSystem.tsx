/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import FolderIcon from '@material-ui/icons/Folder';
import UnknownIcon from '@material-ui/icons/BrokenImage';
import { ReduxState } from '../../../redux/types/interfaces';
import { SET_CURRENT_PATH, SET_SYSTEM_CMD } from '../../../redux/types/types';

function DesktopFileSystem() {
  const neoninterface: boolean = useSelector((state: ReduxState) => state.neoninterface);
  const directories = useSelector((state: ReduxState) => state.directories);
  const currentDir = useSelector((state: ReduxState) => state.currentpath);
  const dispatch = useDispatch();

  const getData = (dirLink: string) => {
    window.ipcRenderer.send('dirList', dirLink);
  };

  const goToPath = (path: string) => {
    const currentPath = currentDir;
    const newPath = currentPath.split('\\').length === 1 ? `${currentDir}${path}` : `${currentDir}\\${path}`;
    dispatch({ type: SET_CURRENT_PATH, payload: { currentpath: newPath } });
    dispatch({ type: SET_SYSTEM_CMD, payload: { systemcmd: `Entered ${newPath}` } });
    getData(newPath);
  };

  const goBackPath = () => {
    const currentPath = currentDir.split('\\');
    const finalNewPath = currentPath.length === 1 ? `${currentPath.join('')}\\` : currentPath.join('\\');
    dispatch({ type: SET_CURRENT_PATH, payload: { currentpath: finalNewPath } });
    dispatch({ type: SET_SYSTEM_CMD, payload: { systemcmd: `Returned to ${finalNewPath}` } });
    if (currentPath.length > 1) {
      getData(finalNewPath);
    }
  };

  const openFile = (path: string) => {
    window.ipcRenderer.send('openFile', path);
  };

  return (
    <motion.div
      animate={{
        left: neoninterface ? '5px' : '-100%'
      }}
      transition={{
        duration: 1,
        delay: 1
      }}
      id="div_file_system"
    >
      <div id="div_fs_header">
        <p id="p_fs_label">File System</p>
        <p id="p_fs_path_label">{currentDir}</p>
      </div>
      <div id="div_fs_content">
        <div
          className="div_folder_template"
          onClick={() => {
            goBackPath();
          }}
        >
          <FolderIcon style={{ color: 'white', fontSize: '35px' }} />
          <p className="p_folder_label">..</p>
        </div>
        {directories.map((dr: any, i: number) => {
          if (dr.isDirectory) {
            return (
              <div
                key={i}
                className="div_folder_template"
                onClick={() => {
                  goToPath(dr.fileName);
                }}
              >
                <FolderIcon style={{ color: 'white', fontSize: '35px' }} />
                {/* <img src={dr.icon} /> */}
                <p className="p_folder_label">{dr.fileName}</p>
              </div>
            );
          }
          if (dr.isFile) {
            return (
              <div
                key={i}
                className="div_folder_template"
                onClick={() => {
                  openFile(dr.filepath);
                }}
              >
                {/* <FileIcon style={{color: "white", fontSize: "35px"}} /> */}
                <img src={dr.icon} className="img_files_indicator" />
                <p className="p_folder_label">{dr.fileName}</p>
              </div>
            );
          }
          <div className="div_folder_template" onClick={() => {}}>
            <UnknownIcon style={{ color: 'white', fontSize: '35px' }} />
            {/* <img src={dr.icon} className='img_files_indicator' /> */}
            <p className="p_folder_label">{dr.fileName}</p>
          </div>;
        })}
      </div>
    </motion.div>
  );
}

export default DesktopFileSystem;
