import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const BarChart = ({ data }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: false,
        align: "center",
        font: {
          size: 16,
        },
        color: "#000",
        text: "Revenue per Resto",
      },
      legend: {
        display: false,
        position: "bottom",
        labels: {
          color: "#000",
          font: {
            size: 10,
          },
          boxWidth: 10,
          borderRadius: 10,
          margin: 5,
        },
      },
    },

  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
