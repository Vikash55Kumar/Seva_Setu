import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import LinearTotal from "./LinearTotal";
import { getChartOptions } from "../certificate/ChartOption";
import { getChartData } from "../certificate/ChartData";
import { Bar } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { generateReport } from "../../actions/adminAction";
import { DownloadPDF } from "../report/DownloadPdf";
import SpinnerLoader from "../../utility/SpinnerLoader";

const socket = io(`${import.meta.env.VITE_SOCKET_URL}`);

const MetricCard = ({ title, value }) => (
  <div className="metric-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

export default function DisabilityCertificate() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const totalForms = 1219;
  const pendingForms = 290;
  const processedForms = 854;
  const rejectedForms = 75;

  const [formStats, setFormStats] = useState({
    totalForms: totalForms,
    pendingForms: pendingForms,
    processedForms: processedForms,
    rejectedForms: rejectedForms,
  });

  const title = "Forms Monitoring Dashboard Disability Certificate"

  const formTitle = "Disability Certificate"

  //Linear Total
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May']

  const labelsName = 'Disability Certificate Issued'

  const data = [10000, 7650, 3450, 9430, 5540]

  const chartData = getChartData(formStats);
  const chartOptions = getChartOptions();

  useEffect(() => {
    // Listen for form statistics updates from the backend
    socket.on("disabilityCertificateUpdate", (data) => {
      setFormStats({
        totalForms: data.totalForms,
        pendingForms: data.pendingForms,
        processedForms: data.processedForms,
        rejectedForms: data.rejectedForms,
      });
    });

    // Clean up event listener when component unmounts
    return () => {
      socket.off("disabilityCertificateUpdate");
    };
  }, []);

  const handleGenerateReport = async () => {
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

      <h1>Revenue Depertment Rajasthan</h1>

      <div className="dashboard">
        <h2>{title}</h2>
        <div className="metrics-container">
          <div className="metrics-container">
            <MetricCard title="Total Forms Received" value={formStats.totalForms} />
            <MetricCard title="Pending Forms" value={formStats.pendingForms} />
            <MetricCard title="Processed Forms" value={formStats.processedForms} />
            <MetricCard title="Rejected Forms" value={formStats.rejectedForms} />
          </div>
        </div>
        <div className="chart-container2">
          <Bar data={chartData} options={chartOptions} />
          <div className="buttons">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGenerateReport}
            >
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
          </div>
        </div>
      </div>

      <section className="overview">
        <LinearTotal labels={labels} data={data} labelsName={labelsName} />
      </section>

      <br/><br/><br/><br/><br/><br/>
    </div>
  )
}
