import { useState } from "react";
import { motion } from "framer-motion";
import { FaRupeeSign, FaClock, FaSearch, FaFilePdf } from "react-icons/fa";

export default function Fines() {
  const [activeTab, setActiveTab] = useState("unpaid");
  const [search, setSearch] = useState("");

  const unpaidFines = [
    { title: "Database Systems", dueDate: "12 June 24", amount: 50, status: "Unpaid" },
    { title: "Operating Systems", dueDate: "15 June 24", amount: 100, status: "Unpaid" },
  ];

  const paidFines = [
    { title: "Database Systems", paidOn: "15 June 24", amount: 50, txnId: "TXN24587" },
    { title: "Operating Systems", paidOn: "20 June 24", amount: 100, txnId: "TXN24589" },
  ];

  const totalUnpaid = unpaidFines.reduce((acc, fine) => acc + fine.amount, 0);
  const totalPaid = paidFines.reduce((acc, fine) => acc + fine.amount, 0);

  const filteredUnpaid = unpaidFines.filter(fine =>
    fine.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPaid = paidFines.filter(fine =>
    fine.title.toLowerCase().includes(search.toLowerCase())
  );

  const exportPDF = () => {
    alert("PDF Export triggered. Integrate with jsPDF if needed.");
  };

  return (
    <div className="space-y-8">
      
      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        <div className="bg-white shadow rounded-xl p-4 flex items-center gap-4">
          <FaRupeeSign className="text-red-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Total Unpaid Fines</p>
            <p className="text-xl font-semibold">₹{totalUnpaid}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex items-center gap-4">
          <FaRupeeSign className="text-green-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Total Paid Fines</p>
            <p className="text-xl font-semibold">₹{totalPaid}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex items-center gap-4">
          <FaClock className="text-yellow-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Overdue Books</p>
            <p className="text-xl font-semibold">{unpaidFines.length}</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("unpaid")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "unpaid"
              ? "bg-blue-500 text-white shadow"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } transition`}
        >
          Unpaid Fines
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "history"
              ? "bg-blue-500 text-white shadow"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } transition`}
        >
          Payment History
        </button>
      </div>

      {/* Search & Export */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by book title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
          />
        </div>

        {activeTab === "history" && (
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
          >
            <FaFilePdf /> Export to PDF
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
        {activeTab === "unpaid" && (
          <>
            {filteredUnpaid.length === 0 ? (
              <p className="text-gray-500">No unpaid fines found.</p>
            ) : (
              <table className="w-full text-sm text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="py-3">Book Title</th>
                    <th>Due Date</th>
                    <th>Fine Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUnpaid.map((fine, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition border-b last:border-none"
                    >
                      <td className="py-3">{fine.title}</td>
                      <td>{fine.dueDate}</td>
                      <td>₹{fine.amount}</td>
                      <td>
                        <span className="text-red-500 font-medium">{fine.status}</span>
                      </td>
                      <td>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition">
                          Pay Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {totalUnpaid > 0 && (
              <div className="mt-4 flex justify-between items-center">
                <span className="font-medium">Total Due: ₹{totalUnpaid}</span>
                <button className="px-4 py-1 bg-green-600 text-white rounded shadow hover:bg-green-700 transition">
                  Pay All Fines
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === "history" && (
          <>
            {filteredPaid.length === 0 ? (
              <p className="text-gray-500">No payment history found.</p>
            ) : (
              <table className="w-full text-sm text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="py-3">Book Title</th>
                    <th>Paid On</th>
                    <th>Amount</th>
                    <th>Transaction ID</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPaid.map((fine, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition border-b last:border-none"
                    >
                      <td className="py-3">{fine.title}</td>
                      <td>{fine.paidOn}</td>
                      <td>₹{fine.amount}</td>
                      <td>{fine.txnId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>

      {/* Helpful Info */}
      <div className="bg-white shadow rounded-xl p-4 space-y-2 text-sm text-gray-600">
        <p>💡 Fine Policy: ₹5 per day overdue.</p>
        <p>
          💬 For disputes,{" "}
          <a href="/dashboard/student/support" className="text-blue-500 hover:underline">
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
}
