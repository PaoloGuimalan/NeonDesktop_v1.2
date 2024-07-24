/* eslint-disable default-param-last */
import { ISystemCMD, IUserAuthentication } from '../types/interfaces';
import { ActionProp } from '../types/props';
import { UserAuthenticationState } from '../types/states';
import { SET_NEON_INTERFACE, SET_SYSTEM_CMD, SET_SYSTEM_CMD_DEFAULT, SET_USER_AUTHENTICATION } from '../types/types';

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
