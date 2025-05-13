/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { IoSend } from 'react-icons/io5';
import Axios from 'axios';
import { SET_CONTEXT_CONVERSATION, SET_NEONSPEAKING } from '../../../redux/types/types';
import { ReduxState } from '../../../redux/types/interfaces';

function ContextHolder() {
  const contextholder = useSelector((state: ReduxState) => state.contextholder);
  const neoninterface: boolean = useSelector((state: ReduxState) => state.neoninterface);
  // const delaysstatus = useSelector((state: ReduxState) => state.delaysstatus);
  const contextconversation = useSelector((state: ReduxState) => state.contextconversation);

  const [messageprompt, setmessageprompt] = useState('');

  const cmdrref = useRef(null);

  const dispatch = useDispatch();

  const sendPromptProcess = () => {
    if (messageprompt.trim() !== '') {
      dispatch({
        type: SET_CONTEXT_CONVERSATION,
        payload: {
          contextconversation: {
            id: Math.floor(Math.random() * 200),
            content: messageprompt,
            sender: 'User'
          }
        }
      });
      setmessageprompt('');
      Axios.post(`http://localhost:11434/api/chat`, {
        model: 'llama3.1',
        stream: false,
        messages: [
          {
            role: 'system',
            content:
              'You are an assistant that answers questions very fast and concise unless user asks for a longer response. To add, speak as human and fun as possible.'
          },
          { role: 'user', content: messageprompt }
        ]
      })
        .then((response) => {
          if (response.data.message) {
            dispatch({
              type: SET_NEONSPEAKING,
              payload: { neonspeaking: true }
            });

            const synth = window.speechSynthesis;
            const u = new SpeechSynthesisUtterance(response.data.message.content);
            const voices = synth.getVoices();

            u.voice = voices[2];
            synth.speak(u);
            u.onend = () => {
              dispatch({
                type: SET_NEONSPEAKING,
                payload: { neonspeaking: false }
              });
            };

            dispatch({
              type: SET_CONTEXT_CONVERSATION,
              payload: {
                contextconversation: {
                  id: Math.floor(Math.random() * 200),
                  content: response.data.message.content,
                  sender: 'Neon'
                }
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const items = document.querySelectorAll('.div_messages_result');
    const last = items[items.length - 1];

    if (last) {
      last.scrollIntoView({
        behavior: 'instant',
        block: 'end'
      });
    }
  }, [contextconversation]);

  return (
    <motion.div
      animate={{
        right: neoninterface ? (contextholder ? '-15px' : '-1000px') : '-1000px'
      }}
      transition={{
        duration: 1,
        delay: 0 // delaysstatus ? 2.5 : 0
      }}
      id="div_assistance_context_holder"
    >
      <div id="div_cmdr_header">
        <p id="p_cmdr_label">Neon👋</p>
      </div>
      <div id="div_context_holder_container" ref={cmdrref}>
        {contextconversation.map((mp: any, i: number) => {
          return (
            <div key={i} className={mp.sender === 'Neon' ? 'div_neonprompt' : 'div_userprompt'}>
              {mp.content}
            </div>
          );
        })}
        <div className="div_messages_result" />
      </div>
      <div id="div_context_holder_footer">
        <input
          type="text"
          value={messageprompt}
          onChange={(e) => {
            setmessageprompt(e.target.value);
          }}
          id="input_context_user_prompt"
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              sendPromptProcess();
            }
          }}
        />
        <button
          id="button_send_prompt"
          onClick={() => {
            sendPromptProcess();
          }}
        >
          <IoSend style={{ fontSize: '20px' }} />
        </button>
      </div>
    </motion.div>
  );
}

export default ContextHolder;
