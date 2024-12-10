import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import LinearTotal from "./LinearTotal";
import { getChartOptions } from "../certificate/ChartOption";
import { getChartData } from "../certificate/ChartData";
import { Bar } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { generateReport } from "../../actions/adminAction";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DownloadPDF } from "../report/DownloadPdf";
import SpinnerLoader from "../../utility/SpinnerLoader";
import { useLocation } from "react-router-dom";

const socket = io(`${import.meta.env.VITE_SOCKET_URL}`);

const MetricCard = ({ title, value }) => (
  <div className="metric-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

export default function IncomeCertificate({adminProfile = {}}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { provider } = adminProfile || {}; 


  const location = useLocation();
  const title2 = location.state?.title;
  const stateTitle = location.state?.stateTitle;
  
  const totalForms = 2374;
  const pendingForms = 587;
  const processedForms = 1700;
  const rejectedForms = 87;

  const [formStats, setFormStats] = useState({
    totalForms: totalForms,
    pendingForms: pendingForms,
    processedForms: processedForms,
    rejectedForms: rejectedForms,
  });

  const title = "Forms Monitoring Dashboard Income Certificate";
  const formTitle = "Income Certificate";
  
  // Linear Total
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const labelsName = 'Income Certificate Issued';
  const data = [10000, 7650, 3450, 9430, 5540];

  const chartData = getChartData(formStats);
  const chartOptions = getChartOptions();

  useEffect(() => {
    socket.on("incomeCertificateUpdate", (data) => {
      setFormStats({
        totalForms: data.totalForms,
        pendingForms: data.pendingForms,
        processedForms: data.processedForms,
        rejectedForms: data.rejectedForms,
      });
    });

    return () => {
      socket.off("incomeCertificateUpdate");
    };
  }, []);

  const handleGenerateReport = async () => {
    const imgPdf = await handleDownloadPDF()
    console.log(imgPdf)
    const reportData = {
      title: title,
      formTitle: formTitle,
      totalForms: formStats.totalForms,
      pendingForms: formStats.pendingForms,
      processedForms: formStats.processedForms,
      rejectedForms: formStats.rejectedForms,
      labels: labels,
      labelsName: labelsName,
      data: data,
    };

    try {
      const response = await dispatch(generateReport(reportData));
      toast.success("Certificate Report generated successfully!");
      console.log("Certificate Report Response:", response);
    } catch (error) {
      console.error("Error generating certificate report:", error);
      toast.error("Failed to generate certificate report.");
    }
  };

  // const handleDownloadPDF = async () => {
  //   DownloadPDF(formTitle)
  // };
  
  const handleDownloadPDF = async () => {

    setLoading(true); // Start the spinner
    try {
      await DownloadPDF(formTitle); // Wait for the PDF to download
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download report.");
    } finally {
      setLoading(false); // Stop the spinner
    }
  };

  return (
    <div className="report">
      <h1>Revenue Department {stateTitle}</h1>

      <div className="dashboard">
        <h2>{title}</h2>
        <div className="metrics-container">
          <MetricCard title="Total Forms Received" value={formStats.totalForms} />
          <MetricCard title="Pending Forms" value={formStats.pendingForms} />
          <MetricCard title="Processed Forms" value={formStats.processedForms} />
          <MetricCard title="Rejected Forms" value={formStats.rejectedForms} />
        </div>
        <div className="chart-container2">
          <Bar data={chartData} options={chartOptions} />
          { provider=="Officer" ? 
          <div className="buttons">
            <button type="button" className="btn btn-primary" onClick={handleGenerateReport} > 
              Generate Report
            </button>
            <br />
            <br />
            {loading ? (
            <SpinnerLoader />
            ) : (
              <button type="button" className="btn btn-success" onClick={handleDownloadPDF}>
                Download Report
              </button>
            )}
          </div> : ""}
          
        </div>
      </div>

      <section className="overview">
        <LinearTotal labels={labels} data={data} labelsName={labelsName} title2={title2}/>
      </section>
    </div>
  );
}
