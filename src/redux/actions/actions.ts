/* eslint-disable default-param-last */
import {
  IBatteryStatusState,
  IDateTime,
  IDeviceHardwaresState,
  ISystemCMD,
  IUserAuthentication
} from '../types/interfaces';
import { ActionProp } from '../types/props';
import { BatteryStatusState, DateTimeState, DeviceHardwaresState, UserAuthenticationState } from '../types/states';
import {
  SET_BATTERY_STATUS,
  SET_COMMAND_LINE,
  SET_CPU_REGISTERS,
  SET_CURRENT_PATH,
  SET_DATE_TIME,
  SET_DEFAULT_COMMAND_LINE,
  SET_DEFAULT_DIRECTORIES,
  SET_DEFAULT_SHORTCUTS_LIST,
  SET_DEVICE_HARDWARES,
  SET_DIRECTORIES,
  SET_INSTALLED_SOFTWARES,
  SET_MEMORY_REGISTERS,
  SET_NEON_INTERFACE,
  SET_SHORTCUTS_LIST,
  SET_SHUTDOWN_MODAL,
  SET_SYSTEM_BRIGHTNESS,
  SET_SYSTEM_CMD,
  SET_SYSTEM_CMD_DEFAULT,
  SET_SYSTEM_VOLUME,
  SET_USER_AUTHENTICATION
} from '../types/types';

export const setuserauthentication = (state: IUserAuthentication = UserAuthenticationState, action: ActionProp) => {
  switch (action.type) {
    case SET_USER_AUTHENTICATION:
      return action.payload.userauthentication;
    default:
      return state;
  }
};

export const setsystemcmd = (state: ISystemCMD[] = [], action: ActionProp) => {
  switch (action.type) {
    case SET_SYSTEM_CMD:
      return state.concat(action.payload.systemcmd);
    case SET_SYSTEM_CMD_DEFAULT:
      return action.payload.systemcmd;
    default:
      return state;
  }
};

export const setneoninterface = (state = false, action: ActionProp) => {
  switch (action.type) {
    case SET_NEON_INTERFACE:
      return action.payload.neoninterface;
    default:
      return state;
  }
};

export const setcurrentpath = (state = '', action: ActionProp) => {
  switch (action.type) {
    case SET_CURRENT_PATH:
      return action.payload.currentpath;
    default:
      return state;
  }
};

export const setdirectories = (state = [], action: ActionProp) => {
  switch (action.type) {
    case SET_DIRECTORIES:
      return state.concat(action.payload.directories);
    case SET_DEFAULT_DIRECTORIES:
      return action.payload.directories;
    default:
      return state;
  }
};

export const setinstalledsoftwares = (state = [], action: ActionProp) => {
  switch (action.type) {
    case SET_INSTALLED_SOFTWARES:
      return action.payload.installedsoftwares;
    default:
      return state;
  }
};

export const setdevicehardwares = (state: IDeviceHardwaresState = DeviceHardwaresState, action: ActionProp) => {
  switch (action.type) {
    case SET_DEVICE_HARDWARES:
      return action.payload.devicehardwares;
    default:
      return state;
  }
};

export const setcpuregisters = (state = [], action: ActionProp) => {
  switch (action.type) {
    case SET_CPU_REGISTERS:
      return state.concat(action.payload.cpuregisters);
    default:
      return state;
  }
};

export const setmemoryregisters = (state = [], action: ActionProp) => {
  switch (action.type) {
    case SET_MEMORY_REGISTERS:
      return state.concat(action.payload.memoryregisters);
    default:
      return state;
  }
};

export const setdatetime = (state: IDateTime = DateTimeState, action: ActionProp) => {
  switch (action.type) {
    case SET_DATE_TIME:
      return action.payload.datetime;
    default:
      return state;
  }
};

export const setcommandline = (state = [], action: ActionProp) => {
  switch (action.type) {
    case SET_COMMAND_LINE:
      return state.concat(action.payload.commandline);
    case SET_DEFAULT_COMMAND_LINE:
      return action.payload.commandline;
    default:
      return state;
  }
};

export const setshortcutslist = (state = [], action: ActionProp) => {
  switch (action.type) {
    case SET_SHORTCUTS_LIST:
      return state.concat(action.payload.shortcutslist);
    case SET_DEFAULT_SHORTCUTS_LIST:
      return action.payload.shortcutslist;
    default:
      return state;
  }
};

export const setbatterystatus = (state: IBatteryStatusState = BatteryStatusState, action: ActionProp) => {
  switch (action.type) {
    case SET_BATTERY_STATUS:
      return action.payload.batterstatus;
    default:
      return state;
  }
};

export const setsystemvolume = (state = 0, action: ActionProp) => {
  switch (action.type) {
    case SET_SYSTEM_VOLUME:
      return action.payload.systemvolume;
    default:
      return state;
  }
};

export const setsystembrightness = (state = 0, action: ActionProp) => {
  switch (action.type) {
    case SET_SYSTEM_BRIGHTNESS:
      return action.payload.systembrightness;
    default:
      return state;
  }
};

export const setshutdownmodal = (state = false, action: ActionProp) => {
  switch (action.type) {
    case SET_SHUTDOWN_MODAL:
      return action.payload.shutdownmodal;
    default:
      return state;
  }
};
