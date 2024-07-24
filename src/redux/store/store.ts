import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  setbatterystatus,
  setcommandline,
  setcpuregisters,
  setcurrentpath,
  setdatetime,
  setdevicehardwares,
  setdirectories,
  setinstalledsoftwares,
  setmemoryregisters,
  setneoninterface,
  setshortcutslist,
  setsystembrightness,
  setsystemcmd,
  setsystemvolume,
  setuserauthentication
} from '../actions/actions';

const combiner = combineReducers({
  userauthentication: setuserauthentication,
  systemcmd: setsystemcmd,
  neoninterface: setneoninterface,
  currentpath: setcurrentpath,
  directories: setdirectories,
  installedsoftwares: setinstalledsoftwares,
  devicehardwares: setdevicehardwares,
  cpuregisters: setcpuregisters,
  memoryregisters: setmemoryregisters,
  datetime: setdatetime,
  commandline: setcommandline,
  shortcutslist: setshortcutslist,
  batterystatus: setbatterystatus,
  systemvolume: setsystemvolume,
  systembrightness: setsystembrightness
});

const store = configureStore({
  reducer: combiner
});

export default store;
