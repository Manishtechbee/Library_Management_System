import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function IssueRequestsPanel() {
  const [activeTab, setActiveTab] = useState("pending");
  const [requests, setRequests] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [fineData, setFineData] = useState([]);

  // Fetch Functions
  const fetchRequests = () => {
    fetch("http://localhost:5000/api/admin/issuerequests")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRequests(data);
        else toast.error("Failed to fetch Issue Requests.");
      })
      .catch(() => toast.error("Server error while fetching Issue Requests."));
  };

  const fetchReturnedBooks = () => {
    fetch("http://localhost:5000/api/admin/returnedbooks")
      .then(res => res.json())
      .then(data => setReturnedBooks(data))
      .catch(() => toast.error("Error fetching returned books"));
  };

  const fetchOverdueBooks = () => {
    fetch("http://localhost:5000/api/admin/overduebooks")
      .then(res => res.json())
      .then(data => setOverdueBooks(data))
      .catch(() => toast.error("Error fetching overdue books"));
  };

  const fetchFineData = () => {
    fetch("http://localhost:5000/api/admin/manualfines")
      .then(res => res.json())
      .then(data => setFineData(data))
      .catch(() => toast.error("Error fetching fine data"));
  };

  // Status Update
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
      .catch(() => toast.error("Failed to update status"));
  };

  useEffect(() => {
    if (activeTab === "pending") fetchRequests();
    if (activeTab === "returned") fetchReturnedBooks();
    if (activeTab === "overdue") fetchOverdueBooks();
    if (activeTab === "fine") fetchFineData();
  }, [activeTab]);

  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-[#1b365d] mb-4">Issue & Return</h2>

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === "pending" ? "bg-[#dceafb] text-[#1b365d] font-medium" : "bg-gray-100 text-gray-700"
          }`}
        >
          Pending Requests
        </button>
        <button
          onClick={() => setActiveTab("returned")}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === "returned" ? "bg-[#dceafb] text-[#1b365d] font-medium" : "bg-gray-100 text-gray-700"
          }`}
        >
          Mark as Returned
        </button>
        <button
          onClick={() => setActiveTab("overdue")}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === "overdue" ? "bg-[#dceafb] text-[#1b365d] font-medium" : "bg-gray-100 text-gray-700"
          }`}
        >
          Overdue List
        </button>
        <button
          onClick={() => setActiveTab("fine")}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === "fine" ? "bg-[#dceafb] text-[#1b365d] font-medium" : "bg-gray-100 text-gray-700"
          }`}
        >
          Manual Fine Entry
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "pending" && (
        <div className="overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">Book Issue Requests</h3>
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
      )}

      {activeTab === "returned" && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Returned Books</h3>
          {returnedBooks.length === 0 ? (
            <p className="text-gray-500">No returned books found.</p>
          ) : (
            <ul className="space-y-2">
              {returnedBooks.map(book => (
                <li key={book.id} className="p-3 bg-gray-50 rounded shadow">
                  {book.title} - Returned by {book.student_name} on {new Date(book.return_date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeTab === "overdue" && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Overdue Books</h3>
          {overdueBooks.length === 0 ? (
            <p className="text-gray-500">No overdue books found.</p>
          ) : (
            <ul className="space-y-2">
              {overdueBooks.map(book => (
                <li key={book.id} className="p-3 bg-gray-50 rounded shadow">
                  {book.title} - Borrowed by {book.student_name} (Due: {new Date(book.due_date).toLocaleDateString()})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeTab === "fine" && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Manual Fine Records</h3>
          {fineData.length === 0 ? (
            <p className="text-gray-500">No fine records found.</p>
          ) : (
            <ul className="space-y-2">
              {fineData.map(fine => (
                <li key={fine.id} className="p-3 bg-gray-50 rounded shadow">
                  {fine.student_name} - ₹{fine.amount} - Reason: {fine.reason}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
