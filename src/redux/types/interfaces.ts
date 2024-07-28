/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUserAuthentication {
  isAuth: boolean | null;
  isEnabled: boolean;
  status: boolean;
  user: {
    username: string;
  };
}

export interface ISystemCMD {
  status: 'normal' | 'success' | 'warning' | 'error';
  report: string;
}

export interface IDeviceHardwaresState {
  cpu: number;
  totalcpu: number;
  memory: number;
  totalmemory: number;
  harddrive?: number;
  processes?: number;
}

export interface IDateTime {
  time: string;
  date: string;
}

export interface IBatteryStatusState {
  power: string;
  percentage: number;
}

export interface ReduxState {
  userauthentication: IUserAuthentication;
  systemcmd: ISystemCMD[];
  neoninterface: boolean;
  currentpath: string;
  datetime: IDateTime;
  shutdownmodal: boolean;
  batterystatus: IBatteryStatusState;
  directories: any[];
  cpuregisters: any[];
  memoryregisters: any[];
  installedsoftwares: any[];
  commandline: string[];
  shortcutslist: any[];
  circlemenutoggle: boolean;
}
