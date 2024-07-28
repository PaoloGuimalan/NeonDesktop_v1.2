/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import { useSelector } from 'react-redux';
import ExeIcon from '@material-ui/icons/SaveRounded';
import { motion } from 'framer-motion';
import { ReduxState } from '../../../redux/types/interfaces';

function InstalledSoftwares() {
  const neoninterface: boolean = useSelector((state: ReduxState) => state.neoninterface);
  const installedsoftwares = useSelector((state: ReduxState) => state.installedsoftwares);

  const openFile = (path: string) => {
    window.ipcRenderer.send('openFile', path);
  };

  return (
    <motion.div
      animate={{
        right: neoninterface ? '5px' : '-1000px'
      }}
      transition={{
        duration: 1,
        delay: 2
      }}
      id="div_installed_softwares"
    >
      <div id="div_hu_header">
        <p id="p_fs_label">Softwares</p>
      </div>
      <div id="div_is_content">
        {installedsoftwares
          .filter((fl: any) => fl.DisplayIcon)
          .map((isf: any, i: number) => {
            if (isf.DisplayName) {
              if (isf.DisplayIcon.includes('.exe')) {
                return (
                  <div
                    key={i}
                    title={isf.DisplayName}
                    className="div_folder_template"
                    onClick={() => {
                      openFile(isf.DisplayIcon.split(',')[0]);
                    }}
                  >
                    <ExeIcon style={{ color: 'white', fontSize: '35px' }} />
                    <p className="p_folder_label">{isf.DisplayName}</p>
                  </div>
                );
              }
            }
          })}
      </div>
    </motion.div>
  );
}

export default InstalledSoftwares;
