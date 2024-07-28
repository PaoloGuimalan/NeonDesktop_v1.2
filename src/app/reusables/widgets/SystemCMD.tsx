/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../redux/types/interfaces';

function SystemCMD() {
  const neoninterface: boolean = useSelector((state: ReduxState) => state.neoninterface);
  const systemcmd = useSelector((state: ReduxState) => state.systemcmd);

  const systemcmdref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (systemcmdref && systemcmdref.current) {
      systemcmdref.current.scrollTop = systemcmdref.current.scrollHeight;
    }
  }, [systemcmd]);

  return (
    <motion.div
      animate={{
        left: neoninterface ? '5px' : '-100%'
      }}
      transition={{
        duration: 1,
        delay: 0.5
      }}
      id="div_system_cmd"
    >
      <div id="div_inner_system_cmd" ref={systemcmdref}>
        {systemcmd.map((scmd, i) => {
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
              id="p_system_cmd"
            >
              {scmd.report}
            </motion.p>
          );
        })}
      </div>
    </motion.div>
  );
}

export default SystemCMD;
