// import Chart  from 'chart.js/auto';

// const generateChartImage = (chartData, chartOptions) => {
//   const canvas = document.createElement('canvas');
//   const chart = new Chart(canvas, {
//     type: 'bar',
//     data: chartData,
//     options: chartOptions,
//   });
//   return chart.toBase64Image(); // Converts the chart to a base64 image
// };

// export default generateChartImage







import Chart from 'chart.js/auto';

const generateChartImage = (chartData, chartOptions) => {
  const canvas = document.createElement('canvas');
  const chart = new Chart(canvas, {
    type: 'bar', // or your desired chart type
    data: chartData,
    options: chartOptions,
    plugins: [
      {
        afterRender: () => {
          // Convert chart to base64 image once it's fully rendered
          const base64Image = canvas.toDataURL("image/png");
          return base64Image;
        }
      }
    ]
  });

  // Force chart rendering
  chart.update();

  // Since the image conversion is inside the plugin's afterRender,
  // we need to return the base64 image after rendering.
  return canvas.toDataURL("image/png");
};

export default generateChartImage;
