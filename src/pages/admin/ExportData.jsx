import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ExportData() {
  const [reportType, setReportType] = useState("weekly");
  const [format, setFormat] = useState("pdf");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDownload = () => {
    if (reportType === "custom" && (!startDate || !endDate)) {
      return toast.error("Please select start and end date for custom report");
    }

    const url = new URL("http://localhost:5000/api/admin/reports/download");
    url.searchParams.append("type", reportType);
    url.searchParams.append("format", format);

    if (reportType === "custom") {
      url.searchParams.append("startDate", startDate);
      url.searchParams.append("endDate", endDate);
    }

    window.open(url.toString(), "_blank");
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-[#1b365d] mb-4">Export Reports</h2>

      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        
        {/* Report Type */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-2 border rounded-lg shadow"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="custom">Custom Timeline</option>
          </select>
        </div>

        {/* Date Range for Custom */}
        {reportType === "custom" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-gray-700 font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border rounded-lg shadow"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border rounded-lg shadow"
              />
            </div>
          </div>
        )}

        {/* Format */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full p-2 border rounded-lg shadow"
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
          </select>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-[#3a7ce1] text-white px-4 py-2 rounded hover:bg-[#285dad] w-full justify-center"
        >
          <FaDownload /> Download Report
        </button>
      </div>
    </div>
  );
}
