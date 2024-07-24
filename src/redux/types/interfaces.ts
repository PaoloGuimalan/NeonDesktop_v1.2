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

export interface ReduxState {
  userauthentication: IUserAuthentication;
  systemcmd: ISystemCMD[];
  neoninterface: boolean;
}
