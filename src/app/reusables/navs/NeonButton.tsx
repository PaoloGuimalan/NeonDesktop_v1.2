import React from 'react';
import { NeonButtonProp } from '../../libs/constants/props';
import Buttonloader from '../loaders/ButtonLoader';

function NeonButton({ isDisabled, onClick, children, className }: NeonButtonProp) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`bg-[#a3a3a3] p-[5px] pl-[10px] pr-[10px] pb-[2px] fontNeon rounded-[0px] text-[12px] border-b-[4px] border-white ${className}`}
    >
      {!isDisabled ? children : <Buttonloader size="20px" />}
    </button>
  );
}

export default NeonButton;
