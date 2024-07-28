import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../redux/types/interfaces';
import { SET_SHUTDOWN_MODAL } from '../../../redux/types/types';
import NeonButton from '../navs/NeonButton';

function ShutdownModal() {
  const shutdownmodal: boolean = useSelector((state: ReduxState) => state.shutdownmodal);
  const dispatch = useDispatch();

  return (
    <motion.div
      animate={{
        bottom: shutdownmodal ? '85px' : '-1000px',
        display: 'flex'
      }}
      transition={{
        duration: 0.4
      }}
      id="div_confirmexit_container"
    >
      <div id="div_confirmexit_header">
        <p id="p_confirmexit_label">Warning</p>
      </div>
      <div id="div_confirmexit_body">
        <p id="div_confirmexit_body_content">Are you sure you want to execute system shutdown?</p>
      </div>
      <div id="div_confirmexit_navigations">
        <NeonButton
          isDisabled={false}
          className="btn_confirmexit"
          onClick={() => {
            // exitNeonDesktop();
          }}
        >
          Proceed
        </NeonButton>
        <NeonButton
          isDisabled={false}
          className="btn_confirmexit"
          onClick={() => {
            dispatch({ type: SET_SHUTDOWN_MODAL, payload: { shutdownmodal: false } });
            // setTimeout(() => {
            //   setconfirmexitmodaltoggledelay(false);
            // }, 1000);
          }}
        >
          Cancel
        </NeonButton>
      </div>
    </motion.div>
  );
}

export default ShutdownModal;
