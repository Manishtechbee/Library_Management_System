import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRupeeSign, FaClock, FaSearch, FaFilePdf, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Fines() {
  const [activeTab, setActiveTab] = useState("unpaid");
  const [search, setSearch] = useState("");
  const [unpaidFines, setUnpaidFines] = useState([]);
  const [paidFines, setPaidFines] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchFines();
  }, []);

  const fetchFines = () => {
    setLoading(true);
    axios
  .get(`http://localhost:5000/api/student/fines/${user.id}`)
  .then((res) => {
    const unpaid = res.data.filter(f => f.paid === 0);
    const paid = res.data.filter(f => f.paid === 1);

    // Map to align with your frontend expectations
    setUnpaidFines(unpaid.map(f => ({
      id: f.id,
      title: f.reason,
      due_date: f.issued_date, 
      amount: f.fine_amount,
    })));

    setPaidFines(paid.map(f => ({
      id: f.id,
      title: f.reason,
      paid_on: f.issued_date, 
      amount: f.fine_amount,
      txn_id: `TXN${f.id}` // Placeholder Transaction ID for frontend display
    })));
  })
  .catch(() => toast.error("Failed to load fines"))
  .finally(() => setLoading(false));

  };
const totalUnpaid = unpaidFines.reduce((acc, fine) => acc + Number(fine.amount), 0);
const totalPaid = paidFines.reduce((acc, fine) => acc + Number(fine.amount), 0);


  const filteredUnpaid = unpaidFines.filter((fine) =>
    fine.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPaid = paidFines.filter((fine) =>
    fine.title.toLowerCase().includes(search.toLowerCase())
  );

 const handlePay = (fine) => {
  axios
    .post("http://localhost:5000/api/student/fines/pay", {
      fine_id: fine.id,
      user_id: user.id,
    })
    .then((res) => {
      toast.success(res.data.message || "Fine paid successfully");
      fetchFines();
    })
    .catch(() => toast.error("Failed to process payment"));
};


const handlePayAll = () => {
  axios
    .post("http://localhost:5000/api/student/fines/pay-all", {
      user_id: user.id,
    })
    .then((res) => {
      toast.success(res.data.message || "All fines paid successfully");
      fetchFines();
    })
    .catch(() => toast.error("Failed to process payment"));
};

const exportPDF = () => {
  const doc = new jsPDF();
  doc.text("Payment History", 14, 20);

  const tableColumn = ["Book Title", "Paid On", "Amount", "Transaction ID"];
  const tableRows = paidFines.map((fine) => [
    fine.title,
    fine.paid_on,
    `₹${fine.amount}`,
    fine.txn_id,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
  });

  doc.save("payment_history.pdf");
};


  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1b365d] mb-2">
      Fines
    </h2>
      </div>
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
      <div className="flex gap-4 flex-wrap">
        {/* Search & Export */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by book title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
          />
        </div>

        
      </div>






        <button
          onClick={() => setActiveTab("unpaid")}
          className={`px-4 py-2 rounded-xl ${
            activeTab === "unpaid"
              ? "bg-blue-500 text-white shadow "
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } transition`}
        >
          Unpaid Fines
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded-xl ${
            activeTab === "history"
              ? "bg-blue-500 text-white shadow"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } transition`}
        >
          Payment History
        </button>
        <div className="ml-auto mr-3">
          {activeTab === "history" && (
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
          >
            <FaFilePdf /> Export to PDF
          </button>
        )}
        </div>
        
      </div>

      

      {/* Tab Content */}
      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
        {loading ? (
          <p className="text-gray-600">Loading fines...</p>
        ) : activeTab === "unpaid" ? (
          filteredUnpaid.length === 0 ? (
            <p className="text-gray-500">No unpaid fines found.</p>
          ) : (
            <>
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
                    <tr key={idx} className="hover:bg-gray-50 transition border-b last:border-none">
                      <td className="py-3">{fine.title}</td>
                      <td>{fine.due_date}</td>
                      <td>₹{fine.amount}</td>
                      <td><span className="text-red-500 font-medium">Unpaid</span></td>
                      <td>
                        <button
                          onClick={() => handlePay(fine)}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
                        >
                          Pay Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {totalUnpaid > 0 && (
                <div className="mt-6 flex justify-between items-center">
                  <span className="font-medium">Total Due: ₹{totalUnpaid}</span>
                  <button
                    onClick={handlePayAll}
                    className="px-4 py-1 mr-20 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
                  >
                    Pay All
                  </button>
                </div>
              )}
            </>
          )
        ) : filteredPaid.length === 0 ? (
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
                <tr key={idx} className="hover:bg-gray-50 transition border-b last:border-none">
                  <td className="py-3">{fine.title}</td>
                  <td>{fine.paid_on}</td>
                  <td>₹{fine.amount}</td>
                  <td className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> {fine.txn_id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Helpful Info */}
      <div className="bg-white shadow rounded-xl p-4 space-y-2 text-sm text-gray-600">
        <p>💡 Fine Policy: ₹10 per day overdue after due date.</p>
        <p>
          💬 For disputes,{" "}
          <a href="/dashboard/faculty/support" className="text-blue-500 hover:underline">
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
}
