import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NoDuesPanel({darkMode}) {
  const [requests, setRequests] = useState([]);

  const fetchRequests = () => {
    fetch("http://localhost:5000/api/admin/nodues")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRequests(data);
        } else {
          console.error("Unexpected response:", data);
          toast.error("Failed to fetch No Dues requests.");
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Server error while fetching No Dues requests.");
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = (id, status) => {
    fetch(`http://localhost:5000/api/admin/nodues/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then(res => res.json())
      .then(data => {
        toast.success(data.message);
        fetchRequests();
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to update status");
      });
  };

  return (
    <>
    {darkMode?(<div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow space-y-4">
  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">No Dues Requests</h2>

  <div className="overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-700 text-left">
          <th className="p-2 text-gray-700 dark:text-gray-200">Student Name</th>
          <th className="p-2 text-gray-700 dark:text-gray-200">Student ID</th>
          <th className="p-2 text-gray-700 dark:text-gray-200">Department</th>
          <th className="p-2 text-gray-700 dark:text-gray-200">Year</th>
          <th className="p-2 text-gray-700 dark:text-gray-200">Semester</th>
          <th className="p-2 text-gray-700 dark:text-gray-200">Status</th>
          <th className="p-2 text-gray-700 dark:text-gray-200">Certificate</th>
          <th className="p-2 text-gray-700 dark:text-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.length === 0 ? (
          <tr>
            <td colSpan="8" className="p-2 text-gray-500 dark:text-gray-400 text-center">No requests found.</td>
          </tr>
        ) : (
          requests.map(req => (
            <tr key={req.id} className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-2 text-gray-800 dark:text-gray-100">{req.student_name}</td>
              <td className="p-2 text-gray-800 dark:text-gray-100">{req.student_id}</td>
              <td className="p-2 text-gray-800 dark:text-gray-100">{req.department || "-"}</td>
              <td className="p-2 text-gray-800 dark:text-gray-100">{req.year}</td>
              <td className="p-2 text-gray-800 dark:text-gray-100">{req.semester}</td>
              <td className="p-2 capitalize text-gray-800 dark:text-gray-100">{req.status}</td>
              <td className="p-2">
                {req.status === "approved" && req.certificate_url ? (
                  <a
                    href={`http://localhost:5000${req.certificate_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    View Certificate
                  </a>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">N/A</span>
                )}
              </td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => updateStatus(req.id, "approved")}
                  className={`px-2 py-1 rounded text-sm ${
                    (req.status === "approved" || req.status === "rejected")
                      ? "bg-gray-400 text-black opacity-60 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300"
                      : "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
                  }`}
                  disabled={req.status !== "pending"}
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(req.id, "rejected")}
                  className={`px-2 py-1 rounded text-sm ${
                    (req.status === "approved" || req.status === "rejected")
                      ? "bg-gray-400 text-black opacity-60 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300"
                      : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                  }`}
                  disabled={req.status !== "pending"}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
):(<div className="p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">No Dues Requests</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Student Name</th>
              <th className="p-2">Student ID</th>
              <th className="p-2">Department</th>
              <th className="p-2">Year</th>
              <th className="p-2">Semester</th>
              <th className="p-2">Status</th>
              <th className="p-2">Certificate</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-2 text-gray-500 text-center">No requests found.</td>
              </tr>
            ) : (
              requests.map(req => (
                <tr key={req.id} className="border-t">
                  <td className="p-2">{req.student_name}</td>
                  <td className="p-2">{req.student_id}</td>
                  <td className="p-2">{req.department || "-"}</td>
                  <td className="p-2">{req.year}</td>
                  <td className="p-2">{req.semester}</td>
                  <td className="p-2 capitalize">{req.status}</td>
                  <td className="p-2">
                    {req.status === "approved" && req.certificate_url ? (
                      <a
                        href={`http://localhost:5000${req.certificate_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Certificate
                      </a>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => updateStatus(req.id, "approved")}
                      className={`px-2 py-1 rounded text-sm ${
                        (req.status === "approved" || req.status === "rejected")
                          ? "bg-gray-400 text-black opacity-60 cursor-not-allowed"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                      disabled={req.status !== "pending"}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(req.id, "rejected")}
                      className={`px-2 py-1 rounded text-sm ${
                        (req.status === "approved" || req.status === "rejected")
                          ? "bg-gray-400 text-black opacity-60 cursor-not-allowed"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                      disabled={req.status !== "pending"}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>)}
    </>
  );
}
