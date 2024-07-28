/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_BATTERY_STATUS,
  SET_COMMAND_LINE,
  SET_CPU_REGISTERS,
  SET_CURRENT_PATH,
  SET_DEFAULT_DIRECTORIES,
  SET_DEFAULT_SHORTCUTS_LIST,
  SET_DEVICE_HARDWARES,
  SET_DIRECTORIES,
  SET_INSTALLED_SOFTWARES,
  SET_MEMORY_REGISTERS,
  SET_SHORTCUTS_LIST,
  SET_SYSTEM_BRIGHTNESS,
  SET_SYSTEM_VOLUME
} from '../../../redux/types/types';
import { IDateTime, ReduxState } from '../../../redux/types/interfaces';
import systemReport from './systemReport';

const ipcTriggers = () => {
  const currentDir = useSelector((state: ReduxState) => state.currentpath);
  const datetime: IDateTime = useSelector((state: ReduxState) => state.datetime);
  const dispatch = useDispatch();

  const { systemcmdreport } = systemReport();

  const initsystemvolume = async () => {
    window.Main.on('systemvolume', (arg) => {
      // console.log(arg)
      dispatch({ type: SET_SYSTEM_VOLUME, payload: { systemvolume: arg } });
    });
  };

  const initsystembrightness = async () => {
    window.Main.on('systembrightness', (arg) => {
      // console.log(arg)
      dispatch({ type: SET_SYSTEM_BRIGHTNESS, payload: { systembrightness: arg } });
    });
  };

  const initCPU = async () => {
    window.Main.on('hardware', (arg) => {
      // setTimeout(() => {systemcmdreport(`Scanning device hardwares`)}, 1500)
      dispatch({ type: SET_DEVICE_HARDWARES, payload: { devicehardwares: arg } });
      dispatch({
        type: SET_CPU_REGISTERS,
        payload: {
          cpuregisters: {
            time: datetime.time,
            register: arg.cpu
          }
        }
      });
      dispatch({
        type: SET_MEMORY_REGISTERS,
        payload: {
          memoryregisters: {
            time: datetime.time,
            register: arg.memory
          }
        }
      });
    });
  };

  const initBatteryPower = async () => {
    const navigatorProt: any = navigator;
    navigatorProt.getBattery().then((battery: any) => {
      // console.log(battery)
      dispatch({
        type: SET_BATTERY_STATUS,
        payload: {
          batterstatus: {
            power: battery.charging,
            percentage: battery.level * 100
          }
        }
      });

      battery.addEventListener('chargingchange', () => {
        // console.log(battery)
        dispatch({
          type: SET_BATTERY_STATUS,
          payload: {
            batterstatus: {
              power: battery.charging,
              percentage: battery.level * 100
            }
          }
        });
      });

      battery.addEventListener('levelchange', () => {
        // console.log(battery)
        dispatch({
          type: SET_BATTERY_STATUS,
          payload: {
            batterstatus: {
              power: battery.charging,
              percentage: battery.level * 100
            }
          }
        });
      });
    });
  };

  const getData = async (dirLink: string) => {
    window.ipcRenderer.send('dirList', dirLink);
    setTimeout(() => {
      systemcmdreport('normal', 'Checking Directories ...');
    }, 1500);
  };

  const getInstalledSoftwares = async () => {
    window.ipcRenderer.send('installedsoftwares', '');
    setTimeout(() => {
      systemcmdreport('normal', 'Checking Installed Softwares ...');
    }, 1500);
  };

  const getShortcuts = async () => {
    window.ipcRenderer.send('getShortcuts', 'Desktop');
    setTimeout(() => {
      systemcmdreport('normal', 'Scanning Desktop Shortcuts ...');
    }, 1500);
  };

  const getsystemvolume = async () => {
    window.ipcRenderer.send('systemvolume', 'init');
  };

  const getsystembrightness = async () => {
    window.ipcRenderer.send('systembrightness', 'init');
  };

  const triggerTaskbar = () => {
    window.ipcRenderer.send('trigger_taskbar', true);
  };

  const initCurrentPath = async () => {
    setTimeout(() => {
      systemcmdreport('normal', 'Scanning Drive C ...');
    }, 1500);
    dispatch({ type: SET_CURRENT_PATH, payload: { currentpath: 'C:\\' } });
    setTimeout(() => {
      systemcmdreport('normal', 'Drive C Initialized');
    }, 1500);
  };

  const getFileIconData = (data: string) => {
    window.ipcRenderer.send('getFileIcon', data);
  };

  const initGetFileIcon = async () => {
    window.Main.on('getFileIcon', (arg) => {
      // setTimeout(() => {systemcmdreport(`${arg.fileName} scanned`)}, 1500)
      dispatch({ type: SET_DIRECTORIES, payload: { directories: arg } });
      // console.log(arg)
    });
  };

  const initDirList = async () => {
    window.Main.on('dirList', (arg) => {
      dispatch({ type: SET_DEFAULT_DIRECTORIES, payload: { directories: [] } });
      arg.map((data: string) => {
        getFileIconData(data);
      });
      setTimeout(() => {
        systemcmdreport('normal', `${arg.length} directories scanned in ${currentDir}`);
      }, 1500);
      // arg.map((dr, i) => {
      //   setTimeout(() => {systemcmdreport(`${dr.fileName} scanned`)}, 1500)
      // })
    });
  };

  const initInstalledSoftwares = async () => {
    window.Main.on('installedsoftwares', (arg) => {
      dispatch({ type: SET_INSTALLED_SOFTWARES, payload: { installedsoftwares: arg } });
      setTimeout(() => {
        systemcmdreport('normal', `${arg.length} Installed Softwares detected`);
      }, 1500);
      arg.map((dr: any) => {
        setTimeout(() => {
          if (dr.DisplayName) {
            systemcmdreport('normal', `${dr.DisplayName} software scanned`);
          } else {
            systemcmdreport('error', `${dr.DisplayName} software scanned`);
          }
        }, 1500);
      });
      setTimeout(() => {
        systemcmdreport('success', `System Setup Complete`);
      }, 1500);
    });
  };

  const initCommandLine = async () => {
    window.Main.on('executeCommand', (arg) => {
      // alert(arg)
      dispatch({ type: SET_COMMAND_LINE, payload: { commandline: arg.replace(/(?:\r\n|\r|\n)/g, '<br>') } });
      // dispatch({type: SET_COMMAND_LINE, commandline: arg})
    });
  };

  const initShortcuts = async () => {
    window.Main.on('getShortcuts', (arg) => {
      dispatch({ type: SET_DEFAULT_SHORTCUTS_LIST, payload: { shortcutslist: [] } });
      arg.map((data: any) => {
        // getFileIconData(data)
        dispatch({ type: SET_SHORTCUTS_LIST, payload: { shortcutslist: data } });
      });
      setTimeout(() => {
        systemcmdreport('normal', `${arg.length} shortcuts retrieved`);
      }, 1500);
    });
  };

  const openFile = (path: string) => {
    window.ipcRenderer.send('openFile', path);
  };

  return {
    initsystemvolume,
    initsystembrightness,
    initCPU,
    initBatteryPower,
    getData,
    getInstalledSoftwares,
    getShortcuts,
    getsystemvolume,
    getsystembrightness,
    initCurrentPath,
    getFileIconData,
    initGetFileIcon,
    initDirList,
    initInstalledSoftwares,
    initCommandLine,
    initShortcuts,
    triggerTaskbar,
    openFile
  };
};

export default ipcTriggers;
