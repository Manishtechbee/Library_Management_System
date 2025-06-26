import { useState, useEffect } from "react";

export default function Profile() {
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
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
      name: "Manish Kumar",
      email: "manish@example.com",
      phone: "9876543210",
      address: "Hoshiarpur, Punjab",
      studentId: "STU123456",
      department: "Computer Science",
      year: "2nd Year"
    };
    setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-2xl py-4 px-15">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3a7ce1&color=fff`}
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
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-100 rounded text-sm"
              type="text"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-100 rounded text-sm"
              type="text"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-600">Address</label>
            <input
              name="address"
              value={user.address}
              onChange={handleChange}
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
          onClick={handleSave}
          className="px-5 py-2 bg-[#3a7ce1] text-white rounded text-sm hover:bg-[#285dad] transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
