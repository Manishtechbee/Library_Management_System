import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function IssueRequestsPanel() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = () => {
    fetch("http://localhost:5000/api/admin/issuerequests")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRequests(data);
        } else {
          console.error("Unexpected response:", data);
          toast.error("Failed to fetch Issue Requests.");
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Server error while fetching Issue Requests.");
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = (id, status) => {
    fetch(`http://localhost:5000/api/admin/issuerequests/${id}`, {
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
    <div className="p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Book Issue Requests</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Student Name</th>
              <th className="p-2">Student ID</th>
              <th className="p-2">Book Title</th>
              <th className="p-2">Request Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-2 text-gray-500 text-center">No requests found.</td>
              </tr>
            ) : (
              requests.map(req => (
                <tr key={req.id} className="border-t">
                  <td className="p-2">{req.student_name}</td>
                  <td className="p-2">{req.student_id}</td>
                  <td className="p-2">{req.book_title}</td>
                  <td className="p-2">{new Date(req.request_date).toLocaleDateString()}</td>
                  <td className="p-2 capitalize">{req.status}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => updateStatus(req.id, "approved")}
                      className={`px-2 py-1 rounded text-sm ${
                        req.status !== "pending"
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
                        req.status !== "pending"
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
    </div>
  );
}
