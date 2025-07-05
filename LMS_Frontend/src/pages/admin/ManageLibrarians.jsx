import { useState, useEffect } from "react";
import { FaSearch, FaTrash, FaUserEdit, FaToggleOn, FaToggleOff, FaEye } from "react-icons/fa";

export default function UserManagement({ darkMode }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/user/data/getlib");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
    setLoading(false);
  };

  const filteredUsers = users.filter((u) =>
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterRole ? u.role === filterRole : true)
  );

  const toggleStatus = async (userId, status) => {
    try {
      await fetch(`http://localhost:5000/api/user/data/${userId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const updateRole = async (userId, role) => {
    try {
      await fetch(`http://localhost:5000/api/user/data/${userId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (userId) => {
    console.log(userId);
    if (true) {
      try {
        await fetch(`http://localhost:5000/api/user/data/delete/${userId}`, {
          method: "delete",
          
        });
        console.log("delete");
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const bgColor = darkMode ? "bg-gray-800" : "bg-white";
  const textColor = darkMode ? "text-gray-100" : "text-gray-800";
  const secondaryTextColor = darkMode ? "text-gray-300" : "text-gray-600";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";
  const tableHeaderColor = darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700";

  return (
    <div className={`p-6 space-y-6 max-w-7xl mx-auto ${textColor}`}>
      <h2 className={`text-3xl font-bold ${darkMode ? "text-[#dceafb]" : "text-[#1b365d]"}`}>User Management</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className={`flex items-center gap-3 ${bgColor} shadow p-3 rounded-lg max-w-md flex-1 border ${borderColor}`}>
          <FaSearch className={secondaryTextColor} />
          <input
            type="text"
            placeholder="Search by name or email"
            className={`flex-1 outline-none bg-transparent ${textColor} ${darkMode ? "placeholder-gray-400" : ""}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className={`min-w-full text-sm ${bgColor} shadow rounded-lg`}>
          <thead>
            <tr className={tableHeaderColor}>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>{/*
              <th className="p-3">Status</th>*/}
              <th className="p-3">Actions</th>
              <th className="p-3">View</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className={`p-4 text-center ${secondaryTextColor}`}>Loading users...</td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className={`p-4 text-center ${secondaryTextColor}`}>No users found.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className={`border-t ${borderColor}`}>
                  <td className={`p-3 ${textColor}`}>{user.name}</td>
                  <td className={`p-3 ${textColor}`}>{user.email}</td>
                  <td className="p-3">
                    <select
                      value={user.role}
                      onChange={(e) => updateRole(user.id, e.target.value)}
                      className={`p-1 ${bgColor} ${textColor} border ${borderColor} rounded`}
                    >
                      <option value="student">Student</option>
                      <option value="faculty">Faculty</option>
                      <option value="admin">Admin</option>
                      
                    </select>
                  </td>
                  {/*<td className="p-3">
                    {user.status === "active" ? (
                      <button
                        onClick={() => toggleStatus(user.id, "inactive")}
                        className="flex items-center gap-1 text-green-600 hover:text-green-800"
                      >
                        <FaToggleOn /> Active
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleStatus(user.id, "active")}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800"
                      >
                        <FaToggleOff /> Inactive
                      </button>
                    )}
                  </td>*/}
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="px-2 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded text-sm flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded text-sm flex items-center gap-1"
                    >
                      <FaEye /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className={`p-6 rounded-lg shadow-lg w-full max-w-md ${bgColor} ${textColor}`}>
      
      <div className="flex items-center gap-4 mb-4">
        {selectedUser.profileImage ? (
          <img 
            src={`http://localhost:5000${selectedUser.profileImage}`} 
            alt="Profile" 
            className="w-16 h-16 rounded-full object-cover border" 
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center text-xl font-bold">
            {selectedUser.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
          <p className={`${secondaryTextColor}`}>{selectedUser.email}</p>
        </div>
      </div>

      <div className="space-y-2">
        <p><span className="font-medium">Phone:</span> {selectedUser.phone || "N/A"}</p>
        <p><span className="font-medium">Address:</span> {selectedUser.address || "N/A"}</p>
        <p><span className="font-medium">Librarian ID:</span> {selectedUser.student_id || "N/A"}</p>
        <p><span className="font-medium">Role:</span> {selectedUser.role}</p>
        
        {/* Show Designation only for faculty */}
        {selectedUser.role === "faculty" && (
          <p><span className="font-medium">Designation:</span> {selectedUser.designation || "N/A"}</p>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setSelectedUser(null)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
