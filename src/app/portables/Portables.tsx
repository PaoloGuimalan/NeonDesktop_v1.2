import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Taskbar from './taskbar/Taskbar';

function Portables() {
  return (
    <Routes>
      <Route path="/taskbar" element={<Taskbar />} />
    </Routes>
  );
}

export default Portables;
