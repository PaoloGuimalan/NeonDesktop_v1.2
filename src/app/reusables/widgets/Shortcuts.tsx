/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import UnknownIcon from '@material-ui/icons/BrokenImage';
import { ReduxState } from '../../../redux/types/interfaces';
import { SET_CURRENT_PATH, SET_SYSTEM_CMD } from '../../../redux/types/types';
import ipcTriggers from '../../libs/hooks/ipcTriggers';

function Shortcuts() {
  const neoninterface = useSelector((state: ReduxState) => state.neoninterface);
  const shortcutslist = useSelector((state: ReduxState) => state.shortcutslist);
  const currentDir = useSelector((state: ReduxState) => state.currentpath);
  const dispatch = useDispatch();

  const { getShortcuts } = ipcTriggers();

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

  const openFile = (path: string) => {
    window.ipcRenderer.send('openFile', path);
  };

  useEffect(() => {
    getShortcuts();
  }, []);

  return (
    <motion.div
      animate={{
        top: neoninterface ? '5px' : '-100%'
      }}
      transition={{
        duration: 1,
        delay: neoninterface ? 3 : 0
      }}
      id="div_shortcut_widget"
    >
      <div id="div_shortcut_container">
        <div id="div_shortcut_header">
          <p id="p_shortcut_header_label">Shortcuts</p>
        </div>
        <div id="div_shortcut_list">
          {shortcutslist.map((scl: any, i: number) => {
            if (scl.isDirectory) {
              return (
                <div
                  key={i}
                  title={scl.fileName}
                  className="div_shortcuts_template"
                  onClick={() => {
                    goToPath(scl.fileName);
                  }}
                >
                  <FolderIcon style={{ color: 'black', fontSize: '35px' }} />
                  {/* <img src={scl.icon} /> */}
                  <p className="p_folder_shortcut_label">{scl.fileName}</p>
                </div>
              );
            }
            if (scl.isFile) {
              return (
                <div
                  key={i}
                  title={scl.fileName}
                  className="div_shortcuts_template"
                  onClick={() => {
                    openFile(scl.filepath);
                  }}
                >
                  <FileIcon style={{ color: 'black', fontSize: '35px' }} />
                  {/* <img src={scl.icon} className='img_files_indicator' /> */}
                  <p className="p_folder_shortcut_label">{scl.fileName}</p>
                </div>
              );
            }
            <div key={i} title={scl.fileName} className="div_shortcuts_template" onClick={() => {}}>
              <UnknownIcon style={{ color: 'black', fontSize: '35px' }} />
              {/* <img src={scl.icon} className='img_files_indicator' /> */}
              <p className="p_folder_shortcut_label">{scl.fileName}</p>
            </div>;
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default Shortcuts;
