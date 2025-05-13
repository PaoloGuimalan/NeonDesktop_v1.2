/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CONTEXT_HOLDER } from '../../../redux/types/types';
import { ReduxState } from '../../../redux/types/interfaces';

function VoiceInterface() {
  const neoninterface = useSelector((state: ReduxState) => state.neoninterface);
  const contextholder = useSelector((state: ReduxState) => state.contextholder);
  const neonspeaking = useSelector((state: ReduxState) => state.neonspeaking);

  const dispatch = useDispatch();

  const settogglecontextholder = (bool: boolean) => {
    dispatch({
      type: SET_CONTEXT_HOLDER,
      payload: { contextholder: bool }
    });
  };

  return (
    <div id="div_voiceinterface">
      <div
        id="div_speaking_anim"
        onClick={() => {
          settogglecontextholder(!contextholder);
        }}
      >
        <motion.div
          animate={{
            maxHeight: neonspeaking ? '50px' : '2px',
            backgroundColor: neoninterface ? 'white' : 'grey',
            boxShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
          }}
          transition={
            neonspeaking
              ? {
                  delay: 0.8,
                  duration: 0.4,
                  repeat: Infinity
                }
              : {}
          }
          className="div_loader"
        ></motion.div>
        <motion.div
          animate={{
            maxHeight: neonspeaking ? '50px' : '2px',
            backgroundColor: neoninterface ? 'white' : 'grey',
            boxShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
          }}
          transition={
            neonspeaking
              ? {
                  delay: 0.7,
                  duration: 0.4,
                  repeat: Infinity
                }
              : {}
          }
          className="div_loader"
        ></motion.div>
        <motion.div
          animate={{
            maxHeight: neonspeaking ? '50px' : '2px',
            backgroundColor: neoninterface ? 'white' : 'grey',
            boxShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
          }}
          transition={
            neonspeaking
              ? {
                  delay: 0.6,
                  duration: 0.4,
                  repeat: Infinity
                }
              : {}
          }
          className="div_loader"
        ></motion.div>
        <motion.div
          animate={{
            maxHeight: neonspeaking ? '50px' : '2px',
            backgroundColor: neoninterface ? 'white' : 'grey',
            boxShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
          }}
          transition={
            neonspeaking
              ? {
                  delay: 0.5,
                  duration: 0.4,
                  repeat: Infinity
                }
              : {}
          }
          className="div_loader"
        ></motion.div>
        <motion.div
          animate={{
            maxHeight: neonspeaking ? '50px' : '2px',
            backgroundColor: neoninterface ? 'white' : 'grey',
            boxShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
          }}
          transition={
            neonspeaking
              ? {
                  delay: 0.4,
                  duration: 0.4,
                  repeat: Infinity
                }
              : {}
          }
          className="div_loader"
        ></motion.div>
        <motion.div
          animate={{
            maxHeight: neonspeaking ? '50px' : '2px',
            backgroundColor: neoninterface ? 'white' : 'grey',
            boxShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
          }}
          transition={
            neonspeaking
              ? {
                  delay: 0.3,
                  duration: 0.4,
                  repeat: Infinity
                }
              : {}
          }
          className="div_loader"
        ></motion.div>
        <motion.div
          animate={{
            maxHeight: neonspeaking ? '50px' : '2px',
            backgroundColor: neoninterface ? 'white' : 'grey',
            boxShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
          }}
          transition={
            neonspeaking
              ? {
                  delay: 0.2,
                  duration: 0.4,
                  repeat: Infinity
                }
              : {}
          }
          className="div_loader"
        ></motion.div>
        <motion.div
          animate={{
            maxHeight: neonspeaking ? '50px' : '2px',
            backgroundColor: neoninterface ? 'white' : 'grey',
            boxShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
          }}
          transition={
            neonspeaking
              ? {
                  delay: 0,
                  duration: 0.4,
                  repeat: Infinity
                }
              : {}
          }
          className="div_loader"
        ></motion.div>
        <motion.div
          animate={{
            maxHeight: neonspeaking ? '50px' : '2px',
            backgroundColor: neoninterface ? 'white' : 'grey',
            boxShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
          }}
          transition={
            neonspeaking
              ? {
                  delay: 0.2,
                  duration: 0.4,
                  repeat: Infinity
                }
              : {}
          }
          className="div_loader"
        ></motion.div>
        <motion.div
          animate={{
            maxHeight: neonspeaking ? '50px' : '2px',
            backgroundColor: neoninterface ? 'white' : 'grey',
            boxShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
          }}
          transition={
            neonspeaking
              ? {
                  delay: 0.3,
                  duration: 0.4,
                  repeat: Infinity
                }
              : {}
          }
          className="div_loader"
        ></motion.div>
        <motion.div
          animate={{
            maxHeight: neonspeaking ? '50px' : '2px',
            backgroundColor: neoninterface ? 'white' : 'grey',
            boxShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
          }}
          transition={
            neonspeaking
              ? {
                  delay: 0.4,
                  duration: 0.4,
                  repeat: Infinity
                }
              : {}
          }
          className="div_loader"
        ></motion.div>
        <motion.div
          animate={{
            maxHeight: neonspeaking ? '50px' : '2px',
            backgroundColor: neoninterface ? 'white' : 'grey',
            boxShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
          }}
          transition={
            neonspeaking
              ? {
                  delay: 0.5,
                  duration: 0.4,
                  repeat: Infinity
                }
              : {}
          }
          className="div_loader"
        ></motion.div>
        <motion.div
          animate={{
            maxHeight: neonspeaking ? '50px' : '2px',
            backgroundColor: neoninterface ? 'white' : 'grey',
            boxShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
          }}
          transition={
            neonspeaking
              ? {
                  delay: 0.6,
                  duration: 0.4,
                  repeat: Infinity
                }
              : {}
          }
          className="div_loader"
        ></motion.div>
        <motion.div
          animate={{
            maxHeight: neonspeaking ? '50px' : '2px',
            backgroundColor: neoninterface ? 'white' : 'grey',
            boxShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
          }}
          transition={
            neonspeaking
              ? {
                  delay: 0.7,
                  duration: 0.4,
                  repeat: Infinity
                }
              : {}
          }
          className="div_loader"
        ></motion.div>
        <motion.div
          animate={{
            maxHeight: neonspeaking ? '50px' : '2px',
            backgroundColor: neoninterface ? 'white' : 'grey',
            boxShadow: neoninterface ? '0px 0px 10px white' : '0px 0px 10px transparent'
          }}
          transition={
            neonspeaking
              ? {
                  delay: 0.8,
                  duration: 0.4,
                  repeat: Infinity
                }
              : {}
          }
          className="div_loader"
        ></motion.div>
      </div>
    </div>
  );
}

export default VoiceInterface;
