import { IBatteryStatusState, IDateTime, IDeviceHardwaresState, IUserAuthentication } from './interfaces';

const UserAuthenticationState: IUserAuthentication = {
  isAuth: null,
  isEnabled: false,
  status: false,
  user: {
    username: 'Admin'
  }
};

const DeviceHardwaresState: IDeviceHardwaresState = {
  cpu: 0,
  totalcpu: 0,
  memory: 0,
  totalmemory: 0
  // harddrive: os.harddrive(),
  // processes: os.getProcesses()
};

const DateTimeState: IDateTime = { time: '', date: '' };

const BatteryStatusState: IBatteryStatusState = {
  power: 'not-charging',
  percentage: 0
};

export { UserAuthenticationState, DeviceHardwaresState, DateTimeState, BatteryStatusState };
