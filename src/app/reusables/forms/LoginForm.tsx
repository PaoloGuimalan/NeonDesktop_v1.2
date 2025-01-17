import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { ISystemCMD, IUserAuthentication, ReduxState } from '../../../redux/types/interfaces';
import { SET_USER_AUTHENTICATION } from '../../../redux/types/types';
import ipcTriggers from '../../libs/hooks/ipcTriggers';
import NeonButton from '../navs/NeonButton';

function LoginForm() {
  const userauthentication: IUserAuthentication = useSelector((state: ReduxState) => state.userauthentication);
  const systemcmd: ISystemCMD[] = useSelector((state: ReduxState) => state.systemcmd);
  const dispatch = useDispatch();

  const [enableForm, setenableForm] = useState<boolean>(false);
  const [isLoggingIn, setisLoggingIn] = useState<boolean>(false);

  const { getInstalledSoftwares } = ipcTriggers();

  useEffect(() => {
    const filterSystemCMD = systemcmd.filter((flt: ISystemCMD) => flt.status === 'success');
    if (filterSystemCMD.length > 0) {
      setTimeout(() => {
        dispatch({
          type: SET_USER_AUTHENTICATION,
          payload: {
            userauthentication: {
              ...userauthentication,
              status: true
            }
          }
        });
      }, 2000);
      setTimeout(() => {
        dispatch({
          type: SET_USER_AUTHENTICATION,
          payload: {
            userauthentication: {
              ...userauthentication,
              isAuth: true
            }
          }
        });
      }, 4000);
    }
  }, [systemcmd]);

  useEffect(() => {
    if (userauthentication.isEnabled) {
      setTimeout(() => {
        setenableForm(true);
      }, 2000);
    }
  }, [userauthentication]);

  const InitIPCRequests = () => {
    getInstalledSoftwares();
  };

  const ConfirmLogin = () => {
    if (userauthentication.isEnabled) {
      setisLoggingIn(true);
      setenableForm(false);
      InitIPCRequests();
    }
  };

  return (
    <motion.div
      animate={{
        width: enableForm ? '100%' : '0px',
        maxWidth: enableForm ? '350px' : '0px',
        paddingLeft: enableForm ? '50px' : '0px',
        paddingRight: enableForm ? '0px' : '0px'
      }}
      transition={{
        delay: 0.5,
        duration: 1
      }}
      className="w-[0px] max-w-[0px] bg-tranparent overflow-x-hidden"
    >
      <div className="w-full h-full bg_semi_transparent p-[15px] pt-[15px] pb-[20px] flex flex-col gap-[10px]">
        <span className="fontNeon text-[14px] text-white">Login</span>
        <div className="w-full flex items-center justify-center">
          <NeonButton isDisabled={isLoggingIn} onClick={ConfirmLogin}>
            Confirm
          </NeonButton>
        </div>
      </div>
    </motion.div>
  );
}

export default LoginForm;
