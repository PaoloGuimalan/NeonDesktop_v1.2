import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { turnon } from '../libs/sounds/sounds';
import DefaultTab from './tabs/DefaultTab';
import ShutdownModal from '../reusables/widgets/ShutdownModal';

function Home() {
  useEffect(() => {
    // initTaskBar(true);
    turnon();

    // setTimeout(() => {
    //   dispatch({
    //     type: SET_DELAYS_STATUS,
    //     delaysstatus: false
    //   });
    //   // NeonSpeakProcess(temporarygreetings)
    // }, 3000);

    return () => {
      // initTaskBar(false);
    };
  }, []);

  return (
    <div
      id="div_main_bg"
      className="w-full h-full bg-transparent flex flex-col items-center justify-center overflow-y-hidden"
    >
      <Routes>
        <Route path="/*" element={<DefaultTab />} />
      </Routes>
      <ShutdownModal />
    </div>
  );
}

export default Home;
