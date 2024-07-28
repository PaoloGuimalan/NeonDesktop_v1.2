/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-template */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import MenuIcon from '@material-ui/icons/Apps';
import MapIcon from '@material-ui/icons/Map';
import FolderIcon from '@material-ui/icons/Folder';
import UnknownIcon from '@material-ui/icons/BrokenImage';
import MediaSettingsIcon from '@material-ui/icons/Tune';
import SettingsIcon from '@material-ui/icons/Settings';
import MusicIcon from '@material-ui/icons/MusicNote';
import { ReduxState } from '../../../redux/types/interfaces';
import { SET_SYSTEM_CMD } from '../../../redux/types/types';

function CircleMenu() {
  const neoninterface = useSelector((state: ReduxState) => state.neoninterface);
  //   const togglemediaaccessibility = useSelector((state: ReduxState) => state.togglemediaaccessibility);
  //   const neoninterfacedelay = useSelector((state) => state.neoninterfacedelay);
  //   const circlemenutoggle = useSelector((state: ReduxState) => state.circlemenutoggle);
  const dispatch = useDispatch();

  const systemcmdreport = (status: string, report: string) => {
    dispatch({
      type: SET_SYSTEM_CMD,
      payload: {
        systemcmd: {
          status,
          report
        }
      }
    });
  };

  //   const setconfirmexitmodaltoggle = (bool) => {
  //     dispatch({ type: SET_CONFIRM_EXIT_MODAL_TOGGLE, confirmexitmodaltoggle: bool });
  //   };

  //   const setconfirmexitmodaltoggledelay = (bool) => {
  //     dispatch({ type: SET_CONFIRM_EXIT_MODAL_TOGGLE_DELAY, confirmexitmodaltoggledelay: bool });
  //   };

  //   const clearShutdownModal = () => {
  //     setconfirmexitmodaltoggle(false);
  //     setTimeout(() => {
  //       setconfirmexitmodaltoggledelay(false);
  //     }, 1000);
  //   };

  const openFile = (path: string) => {
    window.ipcRenderer.send('openFile', path);
  };

  //   const openMediaAccessibility = () => {
  //     if (!togglemediaaccessibility.toggle) {
  //       ipcRenderer.send('initmediaaccessibility', 'open');
  //       // clearShutdownModal()
  //       if (togglemediaaccessibility.toggle && togglemediaaccessibility.delay) {
  //         dispatch({
  //           type: SET_TOGGLE_MEDIAACCESSIBILITY,
  //           togglemediaaccessibility: {
  //             toggle: false,
  //             delay: true
  //           }
  //         });

  //         setTimeout(() => {
  //           dispatch({
  //             type: SET_TOGGLE_MEDIAACCESSIBILITY,
  //             togglemediaaccessibility: {
  //               toggle: false,
  //               delay: false
  //             }
  //           });
  //         }, 1000);
  //       } else {
  //         dispatch({
  //           type: SET_TOGGLE_MEDIAACCESSIBILITY,
  //           togglemediaaccessibility: {
  //             toggle: true,
  //             delay: true
  //           }
  //         });
  //       }
  //     } else {
  //       ipcRenderer.send('initmediaaccessibility', 'close');
  //       // clearShutdownModal()
  //       if (togglemediaaccessibility.toggle && togglemediaaccessibility.delay) {
  //         dispatch({
  //           type: SET_TOGGLE_MEDIAACCESSIBILITY,
  //           togglemediaaccessibility: {
  //             toggle: false,
  //             delay: false
  //           }
  //         });

  //         setTimeout(() => {
  //           dispatch({
  //             type: SET_TOGGLE_MEDIAACCESSIBILITY,
  //             togglemediaaccessibility: {
  //               toggle: false,
  //               delay: false
  //             }
  //           });
  //         }, 1000);
  //       } else {
  //         dispatch({
  //           type: SET_TOGGLE_MEDIAACCESSIBILITY,
  //           togglemediaaccessibility: {
  //             toggle: false,
  //             delay: false
  //           }
  //         });
  //       }
  //     }
  //   };

  const initSettings = () => {
    window.ipcRenderer.send('initsettings', 'open');
  };

  const initMaps = () => {
    window.ipcRenderer.send('initmaps', 'open');
  };

  const initMP = () => {
    window.ipcRenderer.send('initMP', 'open');
  };

  //   const toggleMenuIcon = () => {
  //     // dispatch({type: SET_NEON_INTERFACE_DELAY, neoninterfacedelay: false})
  //     dispatch({ type: SET_CIRCLE_MENU_TOGGLE, circlemenutoggle: false });
  //     setTimeout(() => {
  //       dispatch({ type: SET_NEON_INTERFACE, neoninterface: false });
  //       dispatch({ type: SET_TOGGLE_MINI_INTERFACE, toggleminiinterface: true });
  //     }, 1000);
  //   };

  const defaultCircleMenuIterable = [
    {
      available: true,
      title: 'Menu',
      component: <MenuIcon style={{ color: 'white', fontSize: '35px' }} />,
      action: () => {
        // toggleMenuIcon();
      }
    },
    {
      available: true,
      title: "God's Eye",
      component: <MapIcon style={{ color: 'white', fontSize: '35px' }} />,
      action: () => {
        initMaps();
      }
    },
    {
      available: true,
      title: 'File Explorer',
      component: <FolderIcon style={{ color: 'white', fontSize: '35px' }} />,
      action: () => {
        openFile('C:\\');
      }
    },
    {
      available: true,
      title: 'Media and Accessibility',
      component: <MediaSettingsIcon style={{ color: 'white', fontSize: '35px' }} />,
      action: () => {
        // openMediaAccessibility();
      }
    },
    {
      available: true,
      title: 'Settings',
      component: <SettingsIcon style={{ color: 'white', fontSize: '35px' }} />,
      action: () => {
        initSettings();
      }
    },
    {
      available: true,
      title: 'Synthesizer',
      component: <MusicIcon style={{ color: 'white', fontSize: '35px' }} />,
      action: () => {
        initMP();
      }
    },
    {
      available: false,
      title: 'Unavailable',
      component: <UnknownIcon style={{ color: 'grey', fontSize: '35px' }} />,
      action: () => {
        systemcmdreport('error', 'Module Unavailable');
      }
    }
  ];

  return (
    <motion.div
      animate={{
        rotate: -360,
        scale: neoninterface ? 1 : 0
      }}
      transition={{
        delay: neoninterface ? 1 : 0,
        duration: 50,
        repeat: Infinity
      }}
      id="div_circle_menu"
    >
      {defaultCircleMenuIterable.map((btns, i) => {
        return (
          <motion.button
            title={btns.title}
            onClick={btns.action}
            key={i}
            initial={{
              left:
                (50 - 50 * Math.cos(-0.5 * Math.PI - 2 * (1 / defaultCircleMenuIterable.length) * i * Math.PI)).toFixed(
                  4
                ) + '%',
              top:
                (50 - 50 * Math.sin(-0.5 * Math.PI - 2 * (1 / defaultCircleMenuIterable.length) * i * Math.PI)).toFixed(
                  4
                ) + '%',
              scale: 0
            }}
            animate={{
              scale: neoninterface ? 1 : 0,
              opacity: btns.available ? 1 : 0.8
            }}
            transition={{
              delay: 1,
              duration: 1
            }}
            className="btns_circle_menu"
          >
            <motion.div
              animate={{
                rotate: 360,
                boxShadow: btns.available
                  ? '0px 0px 10px white, inset 0px 0px 50px white'
                  : '0px 0px 10px red, inset 0px 0px 50px red'
              }}
              transition={{
                delay: 0,
                duration: 50,
                repeat: Infinity
              }}
              className="div_circle_btn_holder"
            >
              {btns.component}
            </motion.div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

export default CircleMenu;
