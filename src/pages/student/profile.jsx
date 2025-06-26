import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate=useNavigate();
  
  const u = JSON.parse(localStorage.getItem("user"));
  const role = u?.role;
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    studentId: "",
    department: "",
    year: ""
  });

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log(storedUser);
  if (storedUser?.id) {
    fetch(`http://localhost:5000/api/student/${storedUser.id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }
}, []);

 

  return (
    <div className="max-w-2xl py-4 px-15">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.profileImage?`http://localhost:5000${user.profileImage}`:`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3a7ce1&color=fff`}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="space-y-4 mb-6">
        <h3 className="text-base font-medium text-gray-700 mb-2">Personal Information</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              name="name"
              value={user.name}
              disabled
              className="w-full p-2 mt-1 bg-gray-100 rounded text-sm"
              type="text"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              name="phone"
              value={user.phone}
              disabled
              className="w-full p-2 mt-1 bg-gray-100 rounded text-sm"
              type="text"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-600">Address</label>
            <input
              name="address"
              value={user.address}
              disabled
              className="w-full p-2 mt-1 bg-gray-100 rounded text-sm"
              type="text"
            />
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="space-y-4 mb-6">
        <h3 className="text-base font-medium text-gray-700 mb-2">Academic Information</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Student ID</label>
            <input
              value={user.studentId}
              disabled
              className="w-full p-2 mt-1 bg-gray-50 text-gray-500 rounded text-sm"
              type="text"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Department</label>
            <input
              value={user.department}
              disabled
              className="w-full p-2 mt-1 bg-gray-50 text-gray-500 rounded text-sm"
              type="text"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Year</label>
            <input
              value={user.year}
              disabled
              className="w-full p-2 mt-1 bg-gray-50 text-gray-500 rounded text-sm"
              type="text"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
        onClick={() => navigate(`/dashboard/${role}/settings`)}
          className="px-5 py-2 bg-[#3a7ce1] text-white rounded text-sm hover:bg-[#285dad] transition"
        >
          Edit Details
        </button>
      </div>
    </div>
  );
}
