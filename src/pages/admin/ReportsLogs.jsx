import { useEffect, useState } from "react";
import { FaBook, FaUsers, FaBookmark, FaExclamationTriangle, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReportsStatus() {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [issuedBooks, setIssuedBooks] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [popularBooks, setPopularBooks] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [weeklyReports, setWeeklyReports] = useState([]);
  const [reportType, setReportType] = useState("weekly"); // weekly, monthly, yearly, custom
  
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

  useEffect(() => {
    fetchStats();
    fetchPopularBooks();
    fetchRecentActivity();
    fetchWeeklyReports();
  }, []);

  const fetchStats = () => {
    fetch("http://localhost:5000/api/admin/stats")
      .then(res => res.json())
      .then(data => {
        setTotalBooks(data.totalBooks || 0);
        setTotalUsers(data.totalUsers || 0);
        setIssuedBooks(data.issuedBooks || 0);
        setOverdueCount(data.overdueCount || 0);
      })
      .catch(() => toast.error("Failed to load statistics"));
  };

  const fetchPopularBooks = () => {
    fetch("http://localhost:5000/api/admin/popular-books")
      .then(res => res.json())
      .then(data => setPopularBooks(data))
      .catch(() => toast.error("Failed to load popular books"));
  };

  const fetchRecentActivity = () => {
    fetch("http://localhost:5000/api/admin/recent-activity")
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setRecentActivity(data);
      } else {
        setRecentActivity([]);
      }
    })
    .catch(err => {
      console.error(err);
      setRecentActivity([]);
    });
  };
  


  const fetchWeeklyReports = () => {
    fetch("http://localhost:5000/api/admin/weekly-reports")
      .then(res => res.json())
      .then(data => setWeeklyReports(data))
      .catch(() => toast.error("Failed to load weekly reports"));
  };

 const downloadReport = (format) => {
  let url = `http://localhost:5000/api/admin/reports/download?type=${reportType}&format=${format}`;

  if (reportType === "custom") {
    const startDate = prompt("Enter Start Date (YYYY-MM-DD):");
    const endDate = prompt("Enter End Date (YYYY-MM-DD):");

    if (!startDate || !endDate) {
      toast.error("Start and End date are required for custom reports");
      return;
    }

    url += `&startDate=${startDate}&endDate=${endDate}`;
  }

  window.open(url, "_blank");
};


  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-[#1b365d] mb-4">Reports & Status</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-[#dceafb] rounded-lg shadow flex items-center gap-4">
          <FaBook className="text-3xl text-[#1b365d]" />
          <div>
            <p className="text-gray-600">Total Books</p>
            <h3 className="text-xl font-bold text-[#1b365d]">{totalBooks}</h3>
          </div>
        </div>

        <div className="p-4 bg-[#dceafb] rounded-lg shadow flex items-center gap-4">
          <FaUsers className="text-3xl text-[#1b365d]" />
          <div>
            <p className="text-gray-600">Total Users</p>
            <h3 className="text-xl font-bold text-[#1b365d]">{totalUsers}</h3>
          </div>
        </div>

        <div className="p-4 bg-[#dceafb] rounded-lg shadow flex items-center gap-4">
          <FaBookmark className="text-3xl text-[#1b365d]" />
          <div>
            <p className="text-gray-600">Books Issued</p>
            <h3 className="text-xl font-bold text-[#1b365d]">{issuedBooks}</h3>
          </div>
        </div>

        <div className="p-4 bg-[#dceafb] rounded-lg shadow flex items-center gap-4">
          <FaExclamationTriangle className="text-3xl text-[#1b365d]" />
          <div>
            <p className="text-gray-600">Overdue Books</p>
            <h3 className="text-xl font-bold text-[#1b365d]">{overdueCount}</h3>
          </div>
        </div>
      </div>

      {/* Reports Download Section */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Download Reports</h3>


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

      {/* Weekly Reports Section */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Weekly Reports</h3>
        {weeklyReports.length === 0 ? (
          <p className="text-gray-500">No weekly reports available.</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Week</th>
                <th className="p-2">Issued Books</th>
                <th className="p-2">Returned</th>
                <th className="p-2">Overdue</th>
              </tr>
            </thead>
            <tbody>
              {weeklyReports.map((report) => (
                <tr key={`${report.year}-${report.week}`} className="border-t">
    <td className="p-2">
      Week {report.week} ({new Date(report.week_start).toLocaleDateString()} - {new Date(report.week_end).toLocaleDateString()})
    </td>
                  <td className="p-2">{report.issued}</td>
                  <td className="p-2">{report.returned}</td>
                  <td className="p-2">{report.overdue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Popular Books */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Most Popular Books</h3>
        {popularBooks.length === 0 ? (
          <p className="text-gray-500">No data available.</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Title</th>
                <th className="p-2">Author</th>
                <th className="p-2">Times Issued</th>
              </tr>
            </thead>
            <tbody>
              {popularBooks.map((book) => (
                <tr key={book.id} className="border-t">
                  <td className="p-2">{book.title}</td>
                  <td className="p-2">{book.author}</td>
                  <td className="p-2">{book.issuedCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Recent User Activity</h3>
        {recentActivity.length === 0 ? (
          <p className="text-gray-500">No recent activity found.</p>
        ) : (
          <ul className="space-y-2">
            {recentActivity.map((activity) => (
  <div key={activity.id} className="border-b py-2">
    <div className="text-gray-800">{activity.activity}</div>
    <div className="text-sm text-gray-500">
      on {new Date(activity.timestamp).toLocaleString()}
    </div>
  </div>
))}

          </ul>
        )}
      </div>
    </div>
  );
}
