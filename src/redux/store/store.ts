import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  setbatterystatus,
  setcommandline,
  setcontextconversation,
  setcontextholder,
  setcpuregisters,
  setcurrentpath,
  setdatetime,
  setdevicehardwares,
  setdirectories,
  setinstalledsoftwares,
  setmemoryregisters,
  setneoninterface,
  setneonspeaking,
  setshortcutslist,
  setshutdownmodal,
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
  systembrightness: setsystembrightness,
  shutdownmodal: setshutdownmodal,
  contextholder: setcontextholder,
  neonspeaking: setneonspeaking,
  contextconversation: setcontextconversation
});

const store = configureStore({
  reducer: combiner
});

export default store;
