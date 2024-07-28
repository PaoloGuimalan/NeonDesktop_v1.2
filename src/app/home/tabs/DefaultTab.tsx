import React, { useEffect } from 'react';
import NeonCircle from '../../reusables/widgets/NeonCircle';
import ipcTriggers from '../../libs/hooks/ipcTriggers';
import DateTimeBattery from '../../reusables/widgets/DateTimeBattery';
import SystemCMD from '../../reusables/widgets/SystemCMD';
import DesktopFileSystem from '../../reusables/widgets/DesktopFileSystem';
import HardwareMini from '../../reusables/widgets/HardwareMini';
import InstalledSoftwares from '../../reusables/widgets/InstalledSoftwares';
import WindowsCMD from '../../reusables/widgets/WindowsCMD';
import Shortcuts from '../../reusables/widgets/Shortcuts';
import CircleMenu from '../../reusables/widgets/CircleMenu';

function DefaultTab() {
  const { triggerTaskbar, getData } = ipcTriggers();

  useEffect(() => {
    triggerTaskbar();
    getData('C://');
    // getInstalledSoftwares();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <NeonCircle />
      <CircleMenu />
      <DateTimeBattery />
      <Shortcuts />
      <SystemCMD />
      <DesktopFileSystem />
      <HardwareMini />
      <InstalledSoftwares />
      <WindowsCMD />
    </div>
  );
}

export default DefaultTab;
