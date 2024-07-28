/* eslint-disable no-nested-ternary */
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import BatteryNotCharging from '@material-ui/icons/BatteryStd';
import BatteryCharging from '@material-ui/icons/BatteryChargingFull';
import BatteryAlert from '@material-ui/icons/BatteryAlert';
import { ReduxState } from '../../../redux/types/interfaces';

function DateTimeBattery() {
  const neoninterface: boolean = useSelector((state: ReduxState) => state.neoninterface);
  const datetime = useSelector((state: ReduxState) => state.datetime);
  const batterystatus = useSelector((state: ReduxState) => state.batterystatus);

  return (
    <motion.div
      animate={{
        left: neoninterface ? '5px' : '-100%'
      }}
      transition={{
        duration: 1,
        delay: 0
      }}
      id="div_top_header"
    >
      <div id="div_datetime_header">
        <p id="p_time_label">{datetime.time}</p>
        <p id="p_date_label">{datetime.date}</p>
      </div>
      <div id="div_battery_container">
        <div id="div_battery_icon_label">
          {batterystatus.power ? (
            <BatteryCharging style={{ fontSize: '25px', color: 'white' }} />
          ) : batterystatus.percentage <= 20 ? (
            <BatteryAlert style={{ fontSize: '25px', color: 'white' }} />
          ) : (
            <BatteryNotCharging style={{ fontSize: '25px', color: 'white' }} />
          )}
          <p id="p_batterylevel_label">
            {batterystatus.percentage.toFixed(0)}%{' '}
            {batterystatus.power ? (batterystatus.percentage === 100 ? 'Charged' : 'Charging') : 'On Battery'}
          </p>
        </div>
        <div id="div_battery_level_bar_outer">
          <motion.div
            animate={{
              width: `${batterystatus.percentage}%`
            }}
            id="div_battery_level_bar_inner"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default DateTimeBattery;
