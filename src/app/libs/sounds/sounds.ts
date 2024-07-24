/* eslint-disable no-var */
import poweron from '../../../assets/resources/sounds/startup1.wav';
import systemcmdeff from '../../../assets/resources/sounds/cmdstdout.wav';
import clickeff from '../../../assets/resources/sounds/clickeffect.wav';

var poweronAudio: HTMLAudioElement | null = null;
var systemcmdAudio: HTMLAudioElement | null = null;
var clickAudio: HTMLAudioElement | null = null;

async function initeffects() {
  poweronAudio = new Audio(poweron);
  systemcmdAudio = new Audio(systemcmdeff);
  clickAudio = new Audio(clickeff);

  return true;
}

function turnon() {
  if (!poweronAudio) return;
  poweronAudio.play();
}

function systemcmdlog() {
  if (!systemcmdAudio) return;
  systemcmdAudio.play();
}

function clicksound() {
  if (!clickAudio) return;
  clickAudio.play();
}

export { initeffects, turnon, systemcmdlog, clicksound };
