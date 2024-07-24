import { IUserAuthentication } from './interfaces';

const UserAuthenticationState: IUserAuthentication = {
  isAuth: null,
  isEnabled: false,
  status: false,
  user: {
    username: 'Admin'
  }
};

export { UserAuthenticationState };
