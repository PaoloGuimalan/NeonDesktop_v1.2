import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { IUserAuthentication, ReduxState } from '../../redux/types/interfaces';
import { SET_NEON_INTERFACE, SET_SYSTEM_CMD, SET_USER_AUTHENTICATION } from '../../redux/types/types';
import { clicksound } from '../libs/sounds/sounds';

function NeonInterface() {
  const userauthentication: IUserAuthentication = useSelector((state: ReduxState) => state.userauthentication);
  const dispatch = useDispatch();

  const enableNeon = () => {
    clicksound();
    if (!userauthentication.isEnabled) {
      dispatch({
        type: SET_USER_AUTHENTICATION,
        payload: {
          userauthentication: {
            ...userauthentication,
            status: false,
            isEnabled: true
          }
        }
      });
      dispatch({
        type: SET_SYSTEM_CMD,
        payload: {
          systemcmd: {
            status: 'normal',
            report: 'System starting...'
          }
        }
      });
      dispatch({ type: SET_NEON_INTERFACE, payload: { neoninterface: true } });
      //   dispatch({ type: SET_NEON_INTERFACE_DELAY, neoninterfacedelay: true });
      //   dispatch({ type: SET_CIRCLE_MENU_TOGGLE, circlemenutoggle: true });
    }
  };

  return (
    <motion.div
      animate={{
        border: userauthentication.isEnabled ? 'solid 3px white' : 'solid 3px transparent',
        boxShadow: userauthentication.isEnabled
          ? '0px 0px 30px white, inset 0px 0px 70px white'
          : '0px 0px 30px transparent, inset 0px 0px 70px transparent',
        scale: userauthentication.status ? 0 : 1
      }}
      transition={{
        duration: userauthentication.status ? 1 : 0,
        delay: userauthentication.status ? 1 : 0
      }}
      className="bg-transparent w-[90%] h-[90%] max-w-[210px] max-h-[210px] rounded-[210px] border-[1px] border-transparent flex justify-center items-center neonBoxShadow"
    >
      <motion.div
        animate={
          userauthentication.isEnabled
            ? {
                rotate: 360,
                borderTop: 'solid 5px white',
                borderLeft: 'solid 5px white',
                borderRight: 'solid 5px white',
                borderBottom: 'solid 5px white',
                borderRightStyle: 'dashed',
                borderBottomStyle: 'dashed'
              }
            : {
                borderTop: 'solid 5px transparent',
                borderLeft: 'solid 5px transparent',
                borderRight: 'solid 5px transparent',
                borderBottom: 'solid 5px transparent',
                borderRightStyle: 'dashed',
                borderBottomStyle: 'dashed'
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity
        }}
        id="div_inner_neon"
      >
        <motion.div
          animate={
            userauthentication.isEnabled
              ? {
                  rotate: -360,
                  borderTop: 'solid 5px white',
                  borderLeft: 'solid 5px white',
                  borderRight: 'solid 5px white',
                  borderBottom: 'solid 5px white',
                  borderRightStyle: 'dashed',
                  borderBottomStyle: 'dashed'
                }
              : {
                  borderTop: 'solid 5px transparent',
                  borderLeft: 'solid 5px transparent',
                  borderRight: 'solid 5px transparent',
                  borderBottom: 'solid 5px transparent',
                  borderRightStyle: 'dashed',
                  borderBottomStyle: 'dashed'
                }
          }
          transition={{
            duration: 3,
            repeat: Infinity
          }}
          id="div_inner2_neon"
        />
      </motion.div>
      <motion.p
        animate={{
          color: userauthentication.isEnabled ? 'white' : 'grey',
          textShadow: userauthentication.isEnabled ? '0px 0px 10px white' : '0px 0px 10px transparent'
        }}
        id="p_label_neon"
        onClick={() => {
          enableNeon();
        }}
      >
        NEON
      </motion.p>
    </motion.div>
  );
}

export default NeonInterface;
