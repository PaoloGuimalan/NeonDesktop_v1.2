/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ReduxState } from '../../../redux/types/interfaces';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function HardwareMini() {
  const neoninterface: boolean = useSelector((state: ReduxState) => state.neoninterface);
  const cpuregisters = useSelector((state: ReduxState) => state.cpuregisters);
  const memoryregisters = useSelector((state: ReduxState) => state.memoryregisters);

  const options: any = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      y: {
        max: 100,
        min: 0,
        ticks: {
          stepSize: 10,
          color: 'white'
        }
      }
    }
  };

  const labels = cpuregisters.map((cpur: any) => cpur.time);

  const data = {
    labels,
    datasets: [
      {
        label: 'CPU',
        data: cpuregisters.map((cpur: any) => cpur.register),
        borderColor: 'cyan',
        backgroundColor: 'cyan'
      },
      {
        label: 'Memory',
        data: memoryregisters.map((cpur: any) => cpur.register),
        borderColor: 'orange',
        backgroundColor: 'orange'
      }
    ]
  };

  return (
    <motion.div
      animate={{
        right: neoninterface ? '5px' : '-1000px'
      }}
      transition={{
        duration: 1,
        delay: 1.5
      }}
      id="div_hardware_usage"
    >
      <div id="div_hu_header">
        <p id="p_fs_label">Hardwares</p>
      </div>
      <div id="div_graph_container">
        <Line options={options} data={data} />
      </div>
    </motion.div>
  );
}

export default HardwareMini;
