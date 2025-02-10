import axios from "axios";

const DownloadReport = ({ reportType }) => {
  const handleDownload = async () => {
    const url = reportType === "admin" ? "/api/reports/admin/disputes" : "/api/reports/vendor/transactions";
    
    try {
      const response = await axios.get(url, { responseType: "blob" });

      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = reportType === "admin" ? "Dispute-Report.pdf" : "Transaction-Report.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  return (
    <button onClick={handleDownload}>
      {reportType === "admin" ? "Download Dispute Report" : "Download Transaction Report"}
    </button>
  );
};

export default DownloadReport;
