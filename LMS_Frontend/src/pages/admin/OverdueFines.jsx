import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify"; // ✅ Import toast
import "react-toastify/dist/ReactToastify.css";

export default function OverdueBooks({darkMode}) {
  const [overdueList, setOverdueList] = useState([]);
  const [fines, setFines] = useState([]);

  const fetchBorrowedBooks = () => {
    fetch("http://localhost:5000/api/admin/overdue-books")
      .then(res => res.json())
      .then(data => setOverdueList(data))
      .catch(err => console.error(err));
  };

  const markAsReturned = (id) => {
    fetch(`http://localhost:5000/api/borrowed-books/${id}/return`, {
      method: "PUT",
    })
      .then(res => res.json())
      .then(data => {
        toast.success(data.message);
        fetchBorrowedBooks(); // Refresh list after marking returned
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to mark as returned");
      });
  };

  useEffect(() => {
    fetchBorrowedBooks();

    fetch("http://localhost:5000/api/admin/fines")
      .then(res => res.json())
      .then(data => setFines(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
     {darkMode?(<><div className={`p-6 space-y-4 ${darkMode ? "bg-gray-800 text-gray-100" : ""}`}>
  <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>Overdue Books</h2>

  <div className="overflow-x-auto">
    <table className={`min-w-full text-sm shadow rounded-lg ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white"}`}>
      <thead>
        <tr className={`${darkMode ? "bg-gray-600 text-gray-200" : "bg-gray-100 text-left"}`}>
          <th className="p-3">Student Name</th>
          <th className="p-3">Student ID</th>
          <th className="p-3">Book Title</th>
          <th className="p-3">Due Date</th>
          <th className="p-3">Days Overdue</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {overdueList.length === 0 ? (
          <tr>
            <td colSpan="6" className={`p-4 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              No overdue books found.
            </td>
          </tr>
        ) : (
          overdueList.map((item) => (
            <tr key={item.id} className={`border-t ${darkMode ? "border-gray-600" : "border-gray-200"}`}>
              <td className="p-3">{item.student_name}</td>
              <td className="p-3">{item.student_id}</td>
              <td className="p-3">{item.book_title}</td>
              <td className="p-3">{new Date(item.due_date).toLocaleDateString()}</td>
              <td className="p-3 text-red-600 font-semibold">{item.days_overdue}</td>
              <td className="p-3">
                <button
                  onClick={() => markAsReturned(item.id)}
                  className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm"
                >
                  Mark Returned
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
<div className={`p-6 space-y-4 ${darkMode ? "bg-gray-800 text-gray-100" : ""}`}>
  <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>Fines Summary</h2>

  <div className="overflow-x-auto">
    <table className={`min-w-full text-sm shadow rounded-lg ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white"}`}>
      <thead>
        <tr className={`${darkMode ? "bg-gray-600 text-gray-200" : "bg-gray-100 text-left"}`}>
          <th className="p-3">Student Name</th>
          <th className="p-3">Student ID</th>
          <th className="p-3">Total Fine (₹)</th>
          <th className="p-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {fines.length === 0 ? (
          <tr>
            <td colSpan="4" className={`p-4 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              No fines found.
            </td>
          </tr>
        ) : (
          fines.map((fine) => (
            <tr key={fine.id} className={`border-t ${darkMode ? "border-gray-600" : "border-gray-200"}`}>
              <td className="p-3">{fine.student_name}</td>
              <td className="p-3">{fine.student_id}</td>
              <td className="p-3 font-bold">₹{fine.total_fine}</td>
              <td className="p-3">
                {fine.is_paid ? (
                  <span className="text-green-600 font-semibold">Paid</span>
                ) : (
                  <span className="text-red-600 font-semibold">Unpaid</span>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
</>):( <><div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Overdue Books</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Student Name</th>
                <th className="p-3">Student ID</th>
                <th className="p-3">Book Title</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Days Overdue</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {overdueList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No overdue books found.
                  </td>
                </tr>
              ) : (
                overdueList.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">{item.student_name}</td>
                    <td className="p-3">{item.student_id}</td>
                    <td className="p-3">{item.book_title}</td>
                    <td className="p-3">{new Date(item.due_date).toLocaleDateString()}</td>
                    <td className="p-3 text-red-600 font-semibold">{item.days_overdue}</td>
                    <td className="p-3">
                      <button
                        onClick={() => markAsReturned(item.id)}
                        className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm"
                      >
                        Mark Returned
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Fines Summary</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Student Name</th>
                <th className="p-3">Student ID</th>
                <th className="p-3">Total Fine (₹)</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {fines.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No fines found.
                  </td>
                </tr>
              ) : (
                fines.map((fine) => (
                  <tr key={fine.id} className="border-t">
                    <td className="p-3">{fine.student_name}</td>
                    <td className="p-3">{fine.student_id}</td>
                    <td className="p-3 font-bold">₹{fine.total_fine}</td>
                    <td className="p-3">
                      {fine.is_paid ? (
                        <span className="text-green-600 font-semibold">Paid</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Unpaid</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div></>)}
    </>
  );
}
