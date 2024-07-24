import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { IUserAuthentication, ReduxState } from '../../../redux/types/interfaces';
import { SET_USER_AUTHENTICATION } from '../../../redux/types/types';
import Buttonloader from '../loaders/ButtonLoader';

function LoginForm() {
  const userauthentication: IUserAuthentication = useSelector((state: ReduxState) => state.userauthentication);
  const dispatch = useDispatch();

  const [enableForm, setenableForm] = useState<boolean>(false);
  const [isLoggingIn, setisLoggingIn] = useState<boolean>(false);

  useEffect(() => {
    if (userauthentication.isEnabled) {
      setTimeout(() => {
        setenableForm(true);
      }, 2000);
    }
  }, [userauthentication]);

  const ConfirmLogin = () => {
    if (userauthentication.isEnabled) {
      setisLoggingIn(true);
      setenableForm(false);
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
          <button
            disabled={isLoggingIn}
            onClick={ConfirmLogin}
            className="bg-[#a3a3a3] p-[5px] pl-[10px] pr-[10px] fontNeon rounded-[5px] text-[12px]"
          >
            {!isLoggingIn ? 'Confirm' : <Buttonloader size="20px" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default LoginForm;
