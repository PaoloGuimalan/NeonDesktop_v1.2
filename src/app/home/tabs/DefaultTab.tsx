import React, { useEffect } from 'react';
import NeonCircle from '../../reusables/widgets/NeonCircle';
import ipcTriggers from '../../libs/hooks/ipcTriggers';

function DefaultTab() {
  const { triggerTaskbar } = ipcTriggers();

  useEffect(() => {
    triggerTaskbar();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <NeonCircle />
    </div>
  );
}

export default DefaultTab;
