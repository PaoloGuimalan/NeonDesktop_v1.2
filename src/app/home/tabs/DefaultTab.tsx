import React, { useEffect } from 'react';
import NeonCircle from '../../reusables/widgets/NeonCircle';
import ipcTriggers from '../../libs/hooks/ipcTriggers';
import DateTimeBattery from '../../reusables/widgets/DateTimeBattery';
import SystemCMD from '../../reusables/widgets/SystemCMD';
import DesktopFileSystem from '../../reusables/widgets/DesktopFileSystem';
import HardwareMini from '../../reusables/widgets/HardwareMini';

function DefaultTab() {
  const { triggerTaskbar } = ipcTriggers();

  useEffect(() => {
    triggerTaskbar();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <NeonCircle />
      <DateTimeBattery />
      <SystemCMD />
      <DesktopFileSystem />
      <HardwareMini />
    </div>
  );
}

export default DefaultTab;
