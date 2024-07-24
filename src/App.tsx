import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { IUserAuthentication, ReduxState } from './redux/types/interfaces';
import Home from './app/home/Home';
import Login from './app/auth/Login';
import { initeffects } from './app/libs/sounds/sounds';
import Portables from './app/portables/Portables';
import ipcTriggers from './app/libs/hooks/ipcTriggers';

function App() {
  // console.log(window.ipcRenderer);
  const userauthentication: IUserAuthentication = useSelector((state: ReduxState) => state.userauthentication);

  const { initInstalledSoftwares } = ipcTriggers();

  const InitModules = async () => {
    await initInstalledSoftwares();
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
    <div id="div_main_bg" className="flex flex-col h-screen">
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
