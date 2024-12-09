// Register required components in Chart.js
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// ChartOptions.js
export const getChartOptions = () => ({
    scales: {
      x: {
        title: {
          display: true,
          text: 'Type of Form', // X-axis label
          font: {
            size: 22, // Font size
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'No. of Forms Received', // Y-axis label
          font: {
            size: 22, // Font size
          },
        },
        beginAtZero: true, // Ensures the y-axis starts at 0
      },
    },
  });
  