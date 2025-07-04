import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaTrash, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function ComplaintsManagement() {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = () => {
    axios
      .get("http://localhost:5000/api/admin/complaints")
      .then((res) => setComplaints(res.data))
      .catch(() => toast.error("Failed to fetch complaints"));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    axios
      .delete(`http://localhost:5000/api/admin/complaints/${id}`)
      .then(() => {
        toast.success("Complaint deleted");
        fetchComplaints();
      })
      .catch(() => toast.error("Failed to delete complaint"));
  };

  const markAsResolved = (id) => {
    axios
      .put(`http://localhost:5000/api/admin/complaints/${id}`, { status: "Resolved" })
      .then(() => {
        toast.success("Complaint marked as resolved");
        fetchComplaints();
      })
      .catch(() => toast.error("Failed to update status"));
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch = c.subject.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? c.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-3xl font-bold text-[#1b365d] mb-2">Complaints Management</h2>
        <p className="text-gray-600">View, filter, and manage user complaints.</p>
      </motion.div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 bg-white shadow p-3 rounded-lg w-full max-w-md">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search complaints"
            className="flex-1 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 bg-white shadow rounded-lg border"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg text-sm">
          <thead>
            <tr className="bg-[#f0f4fa] text-gray-700">
              <th className="p-3">Subject</th>
              <th className="p-3">Description</th>
              <th className="p-3">User</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((c, index) => (
              <tr key={c.id} className={`${index % 2 === 0 ? "bg-white" : "bg-[#f9fbfd]"} hover:bg-[#eef3fa] transition`}>
                <td className="p-3 font-medium text-[#1b365d]">{c.subject}</td>
                <td className="p-3">{c.description}</td>
                <td className="p-3">{c.user_name}</td>
                <td className="p-3">{new Date(c.created_at).toLocaleDateString()}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      c.status === "Resolved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                   <button
    onClick={() => markAsResolved(c.id)}
    className={`px-2 py-1 rounded text-sm flex items-center gap-1 ${
      c.status === "Resolved"
        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
        : "bg-green-100 text-green-700 hover:bg-green-200"
    }`}
    disabled={c.status === "Resolved"}
  >
    <FaCheck /> {c.status === "Resolved" ? "Resolved" : "Resolve"}
  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredComplaints.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
