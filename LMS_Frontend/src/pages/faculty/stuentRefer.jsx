import { useState, useEffect } from "react";
import { FaSearch, FaUserGraduate, FaBook, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function StudentSupervisionPage() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchStudents = () => {
    if (!user?.id) return;
    setLoading(true);

    fetch(`http://localhost:5000/api/faculty/students/${user.id}`)
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleViewBooks = (student) => {
    setSelectedStudent(student);
    setLoadingBooks(true);

    fetch(`http://localhost:5000/api/faculty/student-books/${student.id}`)
      .then(res => res.json())
      .then(data => setBorrowedBooks(data))
      .catch(err => console.error(err))
      .finally(() => setLoadingBooks(false));
  };

  const handleSendReminder = (student) => {
    fetch(`http://localhost:5000/api/faculty/send-reminder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: student.id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) toast.success("Reminder sent successfully!");
        else toast.error(data.message || "Failed to send reminder.");
      })
      .catch(() => toast.error("Failed to send reminder."));
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-6 space-y-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-3xl font-bold text-[#1b365d] mb-2">Student Supervision</h2>
        <p className="text-gray-600">Manage and track students under your supervision.</p>
      </motion.div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-white shadow p-3 rounded-lg w-full max-w-md mt-4">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email"
          className="flex-1 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Students List */}
      {loading ? (
        <p className="text-gray-500 mt-4">Loading students...</p>
      ) : filteredStudents.length === 0 ? (
        <p className="text-gray-500 mt-4">No students found.</p>
      ) : (
        filteredStudents.map(student => (
          <div key={student.id} className="border p-4 rounded-md shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div>
              <p className="font-medium text-lg flex items-center gap-2">
                <FaUserGraduate className="text-[#3a7ce1]" /> {student.name}
              </p>
              <p className="text-sm text-gray-500">Email: {student.email}</p>
              <p className="text-sm text-gray-500">Department: {student.department}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleViewBooks(student)}
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                View Borrowed Books
              </button>
              <button
                onClick={() => handleSendReminder(student)}
                className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm flex items-center gap-1"
              >
                <FaEnvelope /> Send Reminder
              </button>
            </div>
          </div>
        ))
      )}

      {/* Borrowed Books Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg space-y-4 relative">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-2">Borrowed Books - {selectedStudent.name}</h3>

            {loadingBooks ? (
              <p className="text-gray-500">Loading books...</p>
            ) : borrowedBooks.length === 0 ? (
              <p className="text-gray-500">No borrowed books found.</p>
            ) : (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {borrowedBooks.map(book => (
                  <li key={book.id} className="border p-3 rounded shadow-sm flex justify-between items-center">
                    <div>
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-gray-500">Author: {book.author}</p>
                      <p className="text-sm text-gray-500">Due Date: {new Date(book.dueDate).toLocaleDateString()}</p>
                    </div>
                    {book.isOverdue && (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">Overdue</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
