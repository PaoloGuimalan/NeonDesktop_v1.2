/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { ISystemCMD, IUserAuthentication, ReduxState } from '../../redux/types/interfaces';
import NeonInterface from '../reusables/NeonInterface';
import LoginForm from '../reusables/forms/LoginForm';

function Login() {
  const userauthentication: IUserAuthentication = useSelector((state: ReduxState) => state.userauthentication);
  const systemcmd: ISystemCMD[] = useSelector((state: ReduxState) => state.systemcmd);

  return (
    <div id="div_main_bg" className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-full flex flex-row items-center justify-center">
        <NeonInterface />
        <LoginForm />
      </div>
      <motion.div
        animate={{
          left: userauthentication.status ? '-100%' : 0
        }}
        transition={{
          duration: userauthentication.status ? 1 : 0,
          delay: userauthentication.status ? 1 : 0
        }}
        id="div_startup_cmd"
      >
        {systemcmd.map((scmd: ISystemCMD, i: number) => {
          return (
            <motion.p
              animate={{
                color:
                  scmd.status === 'normal'
                    ? 'white'
                    : scmd.status === 'success'
                    ? 'lime'
                    : scmd.status === 'warning'
                    ? 'orange'
                    : scmd.status === 'error'
                    ? 'red'
                    : 'normal'
              }}
              key={i}
              className="p_startup_cmd"
            >
              {scmd.report}
            </motion.p>
          );
        })}
      </motion.div>
    </div>
  );
}

export default Login;
