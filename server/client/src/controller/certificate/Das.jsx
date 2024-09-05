import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './das.css';

const MetricCard = ({ title, value }) => (
  <div className="metric-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

const Das = ({ totalForms, pendingForms, processedForms, recjectedForms }) => {
  const metrics = [
    { title: 'Total Forms Received', value: totalForms },
    { title: 'Pending Forms', value: pendingForms },
    { title: 'Processed Forms', value: processedForms },
    { title: 'Rejected Forms', value: recjectedForms },
  ];

  const chartData = {
    labels: ['Total Forms', 'Pending Forms', 'Processed Forms', 'recjectedForms'],
    datasets: [
      {
        label: 'Forms Statistics',
        data: [totalForms, pendingForms, processedForms, recjectedForms],
        backgroundColor: ['#007bff', '#ffc107', '#28a745', 'red'],
        borderColor: ['#007bff', '#ffc107', '#28a745', 'red'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Type of Form', // X-axis label
          font: {
            size: 22, // Increases the font size of the x-axis label
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'No. of Forms Received', // Y-axis label
          font: {
            size: 22, // Increases the font size of the x-axis label
          },
        },
        beginAtZero: true, // Ensures the y-axis starts at 0
      },
    },
  };

  return (
    <div className="dashboard">
       <h2>Forms Monitoring Dashboard Jodhpur</h2>
      <div className="metrics-container">
        {metrics.map((metric, index) => (
          <MetricCard key={index} title={metric.title} value={metric.value} />
        ))}
      </div>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Das;
