/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-danger */
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ReduxState } from '../../../redux/types/interfaces';
import { SET_COMMAND_LINE, SET_DEFAULT_COMMAND_LINE } from '../../../redux/types/types';

function WindowsCMD() {
  const neoninterface: boolean = useSelector((state: ReduxState) => state.neoninterface);
  const commandline = useSelector((state: ReduxState) => state.commandline);
  const contextholder = useSelector((state: ReduxState) => state.contextholder);
  const dispatch = useDispatch();

  const cmdrref = useRef<HTMLDivElement | null>(null);

  const initcmdwelcomemessage = () => {
    const message = '<h1>Welcome, System is now ready for use.</h1> \n Neon Desktop Beta version 1.1.0';
    dispatch({ type: SET_COMMAND_LINE, payload: { commandline: message.replace(/(?:\r\n|\r|\n)/g, '<br>') } });
  };

  useEffect(() => {
    setTimeout(() => {
      initcmdwelcomemessage();
    }, 6000);
  }, []);

  useEffect(() => {
    if (!cmdrref) return;
    if (!cmdrref.current) return;
    cmdrref.current.scrollTop = cmdrref.current.scrollHeight;
    // console.log(commandline)
  }, [commandline]);

  const executeCommandPrompt = (command: string) => {
    window.ipcRenderer.send('executeCommand', command);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      // console.log('do validate')
      if (!event.target) return;
      if (!event.target.value) return;
      if (event.target.value.split('').length !== 0) {
        if (event.target.value === 'cls') {
          dispatch({ type: SET_DEFAULT_COMMAND_LINE, commandline: [] });
        } else if (event.target.value === 'init') {
          initcmdwelcomemessage();
        } else {
          executeCommandPrompt(event.target.value);
        }
      }
      event.currentTarget.value = '';
    }
  };

  return (
    <motion.div
      animate={{
        right: neoninterface ? (!contextholder ? '-15px' : '-1000px') : '-1000px'
      }}
      transition={{
        duration: 1,
        delay: 2.5
      }}
      id="div_windows_cmd"
    >
      <div id="div_cmdr_header">
        <p id="p_cmdr_label">Command Line</p>
      </div>
      <div id="div_cmdr_container" ref={cmdrref}>
        {commandline.map((cmdr: any, i: number) => {
          return <div key={i} className="p_cmdr_format" dangerouslySetInnerHTML={{ __html: cmdr }} />;
        })}
        <div id="div_cmd_input_container">
          <p id="p_cmd_prompt_label">Neon&gt;</p>
          <input type="text" onKeyDown={handleKeyDown} id="input_cmd_prompt" />
        </div>
      </div>
      <div id="div_cmdr_footer" />
    </motion.div>
  );
}

export default WindowsCMD;
