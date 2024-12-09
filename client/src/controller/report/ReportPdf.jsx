// import React, { useEffect, useState } from "react";
// import Chart from "chart.js/auto"; // Corrected import
// import { getChartData } from "../certificate/ChartData";
// import { getChartOptions } from "../certificate/ChartOption";
// import { Document, Page, Image, Text } from "@react-pdf/renderer"; // Use Image from @react-pdf/renderer for PDF rendering

// // Function to generate chart image as base64
// const generateChartImage = (chartData, chartOptions) => {
//   const canvas = document.createElement("canvas");
//   const chart = new Chart(canvas, {
//     type: "bar", // Specify your chart type (bar, line, etc.)
//     data: chartData,
//     options: chartOptions,
//   });

//   // Explicitly render and update the chart
//   chart.render();
  
//   // Use setTimeout to ensure chart is fully rendered before capturing the image
//   setTimeout(() => {
//     const base64Image = chart.toBase64Image();
// // 
//     // Check if base64 image is valid
//     if (!base64Image.startsWith("data:image/png;base64,")) {
//       console.error("Generated image is not valid:", base64Image);  // Debugging invalid image
//       return "";
//     }

//     return base64Image;
//   }, 500); // Give enough time (500ms) for rendering
// };

// const ReportPdf = () => {
//   const [chartImage, setChartImage] = useState(null);

//   const formStats = {
//     totalForms: 2374,
//     pendingForms: 587,
//     processedForms: 1700,
//     rejectedForms: 87,
//   };

//   useEffect(() => {
//     const chartData = getChartData(formStats);
//     const chartOptions = getChartOptions();

//     // Generate the chart image after the component has mounted
//     const image = generateChartImage(chartData, chartOptions);

//     console.log("Generated Chart Image:", image);  // Debugging: Check the full base64 image string
    
//     if (image) {
//       setChartImage(image); // Save the base64 image to state
//     } else {
//       console.error("Chart image is empty or invalid.");
//     }
//   }, []);

//   if (!chartImage) {
//     return <div>Loading...</div>;
//   }

//   console.log("hello", chartImage);
  

//   return (
//     <Document>
//       <Page size="A4" style={{ padding: 20 }}>
//         <Text style={{ fontSize: 18, marginBottom: 10 }}>Forms Monitoring Dashboard</Text>
//         <Text>Total Forms: 2374</Text>
//         <Text>Pending Forms: 587</Text>
//         <Text>Processed Forms: 1700</Text>
//         <Text>Rejected Forms: 87</Text>

//         {/* Add the chart image into the PDF */}
//         {chartImage && (
//           <Image src={chartImage} style={{ width: "100%", height: 300 }} />
//         )}
//       </Page>
//     </Document>
//   );
// };

// export default ReportPdf;












// import React from 'react';
// import { Page, Document, Image, Text, View, StyleSheet } from '@react-pdf/renderer';
// import { getChartData } from '../certificate/ChartData';
// import { getChartOptions } from '../certificate/ChartOption';
// import generateChartImage from './Chart';

// const ReportPdf = () => {
//   const styles = StyleSheet.create({
//     page: {
//       padding: 40,
//       fontSize: 12,
//       lineHeight: 1.5,
//       fontFamily: 'Helvetica',
//       backgroundColor: '#ffffff',
//       color: '#000000',
//     },
//     title: {
//       fontSize: 20,
//       marginBottom: 20,
//       textAlign: 'center',
//     },
//     image: {
//       width: '100%',
//       height: 'auto',
//       marginVertical: 20,
//     },
//   });

//   const formStats = {
//     totalForms: 2374,
//     pendingForms: 587,
//     processedForms: 1700,
//     rejectedForms: 87,
//   };

//   const title = 'Forms Monitoring Dashboard Income Certificate';

//   const chartData = getChartData(formStats);
//   const chartOptions = getChartOptions();

//   console.log(chartData, chartOptions)

//   // Generate chart as a base64 image
//   // const chartImage = generateChartImage(chartData, chartOptions);

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <Text style={styles.title}>{title}</Text>
//         {/* {chartImage && <Image style={styles.image} src={chartImage} />} */}
//         <View>
//           <Text>Total Forms: {formStats.totalForms}</Text>
//           <Text>Pending Forms: {formStats.pendingForms}</Text>
//           <Text>Processed Forms: {formStats.processedForms}</Text>
//           <Text>Rejected Forms: {formStats.rejectedForms}</Text>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default ReportPdf;



import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { jsPDF } from "jspdf";

const ReportPdf = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Chart.js configuration
    const data = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Weekly Sales",
          data: [18, 12, 6, 9, 12, 3, 9],
          backgroundColor: [
            "rgba(255, 26, 104, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(0, 0, 0, 0.2)",
          ],
          borderColor: [
            "rgba(255, 26, 104, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(0, 0, 0, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "bar",
      data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const canvas = canvasRef.current;
    new Chart(canvas, config);
  }, []);

  const downloadPdf = () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();

    // Add the image to the PDF
    pdf.addImage(imageData, "PNG", 10, 10, 180, 100); // Adjust dimensions as needed
    pdf.save("chart.pdf"); // Download the PDF
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Weekly Sales Report</h1>
      <div style={{ width: "700px", margin: "0 auto" }}>
        <canvas ref={canvasRef} width="700" height="400"></canvas>
      </div>
      <button
        onClick={downloadPdf}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#1A1A1A",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Download PDF
      </button>
    </div>
  );
};

export default ReportPdf;
