/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import MainTBIcon from '@material-ui/icons/DataUsage';
import SearchTBIcon from '@material-ui/icons/Search';
import { motion } from 'framer-motion';
import VolumeIcon from '@material-ui/icons/VolumeUp';
import BrightnessIcon from '@material-ui/icons/BrightnessHigh';
import MapIcon from '@material-ui/icons/Map';
import FolderIcon from '@material-ui/icons/Folder';
import ChargingIcon from '@material-ui/icons/Power';
import ChargedIcon from '@material-ui/icons/Check';

function Taskbar() {
  const [battery, setbattery] = useState({
    power: 'not-charging',
    percentage: 0
  });
  const [datetime, setdatetime] = useState({
    time: '',
    date: '',
    dateintext: ''
  });

  const navigatorRepl: any = navigator;

  const initBatteryPower = async () => {
    navigatorRepl.getBattery().then((batteryval: any) => {
      // console.log(battery)
      setbattery({
        power: batteryval.charging,
        percentage: batteryval.level * 100
      });

      batteryval.addEventListener('chargingchange', () => {
        // console.log(battery)
        setbattery({
          power: batteryval.charging,
          percentage: batteryval.level * 100
        });
      });

      batteryval.addEventListener('levelchange', () => {
        // console.log(battery)
        setbattery({
          power: batteryval.charging,
          percentage: batteryval.level * 100
        });
      });
    });
  };

  const openFile = (path: string) => {
    window.ipcRenderer.send('openFile', path);
  };

  const initMaps = () => {
    window.ipcRenderer.send('initmaps', 'open');
  };

  const defaultCircleMenuIterable = [
    {
      available: true,
      title: 'File Explorer',
      component: <FolderIcon style={{ color: 'white', fontSize: '30px' }} />,
      action: () => {
        openFile('C:\\');
      }
    },
    {
      available: true,
      title: 'Map',
      component: <MapIcon style={{ color: 'white', fontSize: '30px' }} />,
      action: () => {
        initMaps();
      }
    }
  ];

  const openMediaAccessibility = () => {
    window.ipcRenderer.send('initmediaaccessibility', 'open');
  };

  useEffect(() => {
    initBatteryPower();
  }, []);

  function showTime() {
    const date = new Date();
    const months: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    const n = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const time = date.toLocaleTimeString();
    const dateinwords = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

    setdatetime({
      time,
      date: n,
      dateintext: dateinwords
    });
  }

  useEffect(() => {
    setInterval(showTime, 1000);
  }, []);

  return (
    <div id="div_taskbar_container">
      <div id="div_taskbar">
        <div id="div_menusearch_portion">
          <motion.button
            whileHover={{
              top: '-10px'
            }}
            className="btns_taskbar"
          >
            <MainTBIcon style={{ color: 'white', fontSize: '30px' }} />
          </motion.button>
          <motion.button
            whileHover={{
              top: '-10px'
            }}
            className="btns_taskbar"
          >
            <SearchTBIcon style={{ color: 'white', fontSize: '30px' }} />
          </motion.button>
        </div>
        <div id="div_tasks_portion">
          {defaultCircleMenuIterable.map((btns) => {
            return (
              <motion.button
                key={btns.title}
                whileHover={{
                  top: '-10px'
                }}
                className="btns_taskbar"
                onClick={btns.action}
              >
                {btns.component}
              </motion.button>
            );
          })}
        </div>
        <div id="div_accessibilities">
          <motion.button
            whileHover={{
              top: '-10px'
            }}
            className="btn_accessibilities"
            onClick={() => {
              openMediaAccessibility();
            }}
          >
            <VolumeIcon style={{ color: 'white', fontSize: '15px' }} />
            <BrightnessIcon style={{ color: 'white', fontSize: '15px' }} />
          </motion.button>
        </div>
        <div id="div_dateTimeBattery" title={`${Math.round(battery.percentage)}%`}>
          <div id="div_battery_tb_container">
            <div id="div_battery_total_container">
              {battery.power ? (
                battery.percentage === 100 ? (
                  <div id="div_charging_label">
                    <ChargedIcon style={{ color: '#242424', fontSize: '12px' }} />
                  </div>
                ) : (
                  <div id="div_charging_label">
                    <ChargingIcon style={{ color: '#242424', fontSize: '12px' }} />
                  </div>
                )
              ) : null}
              <motion.div
                animate={{
                  height: `${battery.percentage}%`
                }}
                id="div_battery_level"
              />
            </div>
          </div>
          <div id="div_datetime_tb_container" title={datetime.dateintext}>
            <span className="span_datetime_label">{datetime.time}</span>
            <span className="span_datetime_label">{datetime.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Taskbar;
