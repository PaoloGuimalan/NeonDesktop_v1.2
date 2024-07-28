import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { IUserAuthentication, ReduxState } from './redux/types/interfaces';
import Home from './app/home/Home';
import Login from './app/auth/Login';
import { initeffects } from './app/libs/sounds/sounds';
import Portables from './app/portables/Portables';
import ipcTriggers from './app/libs/hooks/ipcTriggers';
import { SET_DATE_TIME } from './redux/types/types';

function App() {
  // console.log(window.ipcRenderer);
  const userauthentication: IUserAuthentication = useSelector((state: ReduxState) => state.userauthentication);
  const dispatch = useDispatch();

  const {
    initInstalledSoftwares,
    initBatteryPower,
    initDirList,
    initCPU,
    initCurrentPath,
    initCommandLine,
    initGetFileIcon,
    initShortcuts
  } = ipcTriggers();

  function showTime() {
    const date = new Date();
    // const months: string[] = [
    //   'January',
    //   'February',
    //   'March',
    //   'April',
    //   'May',
    //   'June',
    //   'July',
    //   'August',
    //   'September',
    //   'October',
    //   'November',
    //   'December'
    // ];

    const n = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const time = date.toLocaleTimeString();
    // const dateinwords = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

    dispatch({
      type: SET_DATE_TIME,
      payload: {
        datetime: {
          time,
          date: n
        }
      }
    });
  }

  const InitModules = async () => {
    await initInstalledSoftwares();
    await initBatteryPower();
    await initDirList();
    await initCPU();
    await initCurrentPath();
    await initCommandLine();
    await initGetFileIcon();
    await initShortcuts();
    setInterval(showTime, 1000);
  };

  useEffect(() => {
    initeffects();
    InitModules();
  }, []);

  const mainRenderer = (pathIdentifier: string) => {
    if (userauthentication.isAuth !== null) {
      if (userauthentication.isAuth) {
        if (pathIdentifier === 'home') {
          return <Home />;
        }
        return <Navigate to="/home" />;
      }
      if (pathIdentifier === 'login') {
        return <Login />;
      }
      return <Navigate to="/login" />;
    }

    if (pathIdentifier === 'base') {
      return <Navigate to="/login" />;
    }

    if (pathIdentifier === 'home') {
      return <Home />;
    }

    if (pathIdentifier === 'login') {
      return <Login />;
    }

    return null;
  };

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    // console.log(pathname)
    if (pathname.includes('portables')) {
      const divApp = document.getElementById('div_main_bg');
      if (!divApp) return;
      divApp.style.backgroundImage = 'none';
      divApp.style.backgroundColor = 'transparent';
    } else {
      const divApp = document.getElementById('div_main_bg');
      if (!divApp) return;
      divApp.style.backgroundImage = 'radial-gradient(rgb(65, 65, 65) 1px, transparent 0)';
    }
  }, [pathname]);

  return (
    <div id="div_main_bg" className="flex flex-col h-screen overflow-y-hidden">
      <Routes>
        <Route path="/" element={mainRenderer('base')} />
        <Route path="/home/*" element={mainRenderer('home')} />
        <Route path="/login" element={mainRenderer('login')} />
        <Route path="/portables/*" element={<Portables />} />
      </Routes>
    </div>
  );
}

export default App;
