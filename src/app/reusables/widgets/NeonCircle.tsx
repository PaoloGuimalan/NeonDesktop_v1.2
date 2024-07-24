import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../redux/types/interfaces';

function NeonCircle() {
  const neoninterface: boolean = useSelector((state: ReduxState) => state.neoninterface);
  //   const dispatch = useDispatch();

  //   const setconfirmexitmodaltoggle = (bool) => {
  //     dispatch({ type: SET_CONFIRM_EXIT_MODAL_TOGGLE, confirmexitmodaltoggle: bool });
  //   };

  //   const setconfirmexitmodaltoggledelay = (bool) => {
  //     dispatch({ type: SET_CONFIRM_EXIT_MODAL_TOGGLE_DELAY, confirmexitmodaltoggledelay: bool });
  //   };

  //   const confirmexitmodal = () => {
  //     clearMediaAccessibilityModal();
  //     setconfirmexitmodaltoggle(true);
  //     setTimeout(() => {
  //       setconfirmexitmodaltoggledelay(true);
  //     }, 0);
  //   };

  //   const clearMediaAccessibilityModal = () => {
  //     dispatch({
  //       type: SET_TOGGLE_MEDIAACCESSIBILITY,
  //       togglemediaaccessibility: {
  //         toggle: false,
  //         delay: true
  //       }
  //     });

  //     setTimeout(() => {
  //       dispatch({
  //         type: SET_TOGGLE_MEDIAACCESSIBILITY,
  //         togglemediaaccessibility: {
  //           toggle: false,
  //           delay: false
  //         }
  //       });
  //     }, 1000);
  //   };

  return (
    <motion.div
      initial={{
        scale: 0
      }}
      animate={{
        border: neoninterface ? 'solid 3px white' : 'solid 3px transparent',
        boxShadow: neoninterface
          ? '0px 0px 30px white, inset 0px 0px 70px white'
          : '0px 0px 30px transparent, inset 0px 0px 70px transparent',
        scale: 1
      }}
      transition={{
        duration: 1,
        delay: 0
      }}
      id="div_neon_interface_home"
    >
      <motion.div
        animate={
          neoninterface
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
        id="div_inner_neon_home"
      >
        <motion.div
          animate={
            neoninterface
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
          id="div_inner2_neon_home"
        />
      </motion.div>
      <motion.p
        animate={{
          color: neoninterface ? 'white' : 'grey',
          textShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
        }}
        id="p_label_neon_home"
        onClick={() => {
          //   confirmexitmodal();
        }}
      >
        NEON
      </motion.p>
    </motion.div>
  );
}

export default NeonCircle;
