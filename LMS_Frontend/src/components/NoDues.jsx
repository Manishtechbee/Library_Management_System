import { useState } from "react";
import { toast } from "react-toastify";

export default function NoDuesRequest({ userId }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    student_id: "",
    year: "",
    department: "",
    semester: "",
  });

  const handleRequest = () => {
    fetch(`http://localhost:5000/api/nodues/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        studentName: formData.studentName,
        student_id: formData.student_id,
        year: formData.year,
        department: formData.department,
        semester: formData.semester,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        setShowModal(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {/* No Dues Request Section */}
      <div className="space-y-4 mb-6 mt-10">
        <h3 className="text-base font-medium text-gray-700 mb-2">
          No Dues Certificate
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          You can request a No Dues Certificate from the library. Once approved,
          you'll receive confirmation via system notifications.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
        >
          Request No Dues Certificate
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 space-y-4 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Enter Required Details
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Student Name"
                value={formData.studentName}
                onChange={(e) =>
                  setFormData({ ...formData, studentName: e.target.value })
                }
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="text"
                placeholder="Student ID"
                value={formData.student_id}
                onChange={(e) =>
                  setFormData({ ...formData, student_id: e.target.value })
                }
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="text"
                placeholder="Year"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="text"
                placeholder="Semester"
                value={formData.semester}
                onChange={(e) =>
                  setFormData({ ...formData, semester: e.target.value })
                }
                className="w-full p-2 border rounded text-sm"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleRequest}
                className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
