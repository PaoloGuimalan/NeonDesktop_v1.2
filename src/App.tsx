import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IUserAuthentication, ReduxState } from './redux/types/interfaces';
import Home from './app/home/Home';
import Login from './app/auth/Login';
import { initeffects } from './app/libs/sounds/sounds';
import Portables from './app/portables/Portables';

function App() {
  // console.log(window.ipcRenderer);
  const userauthentication: IUserAuthentication = useSelector((state: ReduxState) => state.userauthentication);

  useEffect(() => {
    initeffects();
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

  return (
    <div className="flex flex-col h-screen">
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
