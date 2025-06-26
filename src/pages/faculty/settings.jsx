import { useState } from "react";
import { FaCamera, FaTrash, FaSignOutAlt } from "react-icons/fa";

export default function StudentSettings() {
  const [name, setName] = useState("Manish Kumar");
  const [email] = useState("manish@example.com");
  const [phone, setPhone] = useState("9876543210");
  const [address, setAddress] = useState("Punjab, India");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);
  const [theme, setTheme] = useState("system");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [avatar, setAvatar] = useState("https://ui-avatars.com/api/?name=Manish+Kumar&background=cccccc&color=000&size=128");

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl);
  }
};


  return (
    <div className="min-h-screen bg-white flex justify-center items-start p-5">
      <div className="w-full max-w-6xl space-y-12">

        <h1 className="text-2xl font-bold text-gray-800">Student Settings</h1>

        {/* Profile Section */}
        <div className="space-y-6 pb-8 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Profile Information</h2>
          <div className="grid grid-cols-3 gap-8 items-start">
            {/* Avatar */}
            <div className="flex flex-col items-center">
  <div className="relative">
    <img
      src={avatar}
      alt="Avatar"
      className="w-24 h-24 rounded-full object-cover"
    />
    <button
      className="absolute bottom-0 right-0 p-1 bg-gray-700 text-white rounded-full text-xs"
      onClick={() => document.getElementById("avatarInput").click()}
    >
      <FaCamera />
    </button>
    <input
      type="file"
      id="avatarInput"
      accept="image/*"
      className="hidden"
      onChange={handleImageChange}
    />
  </div>
</div>


            {/* Profile Details */}
            <div className="col-span-2 grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  className="w-full border-b p-1 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  className="w-full border-b p-1 bg-gray-100"
                  value={email}
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                <input
                  className="w-full border-b p-1 focus:outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Address</label>
                <input
                  className="w-full border-b p-1 focus:outline-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="space-y-4 pb-8 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Account Settings</h2>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setShowPasswordModal(true)} className="px-4 py-2 bg-gray-800 text-white rounded">Change Password</button>
            <button onClick={() => setShowEmailModal(true)} className="px-4 py-2 bg-gray-800 text-white rounded">Update Email</button>
            <button onClick={() => alert("Manage devices functionality here")} className="px-4 py-2 bg-gray-800 text-white rounded">Manage Login Devices</button>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-4 pb-8 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
              />
              <span className="text-gray-700">Email Notifications</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={appNotifications}
                onChange={() => setAppNotifications(!appNotifications)}
              />
              <span className="text-gray-700">App Notifications</span>
            </div>
          </div>
        </div>

        {/* App Preferences */}
        <div className="space-y-4 pb-8 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">App Preferences</h2>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Theme</label>
            <select
              className="border-b p-1 focus:outline-none"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="flex justify-between items-center p-4 bg-red-50 rounded">
          <span className="text-red-600 font-medium">Delete Account</span>
          <button onClick={() => setShowDeleteConfirm(true)} className="px-4 py-1 bg-red-600 text-white rounded flex items-center gap-2">
            <FaTrash />
            Delete
          </button>
        </div>

        {/* Logout */}
        <div>
          <button onClick={() => setShowLogoutConfirm(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-80 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Account Deletion</h2>
            <p className="text-gray-600">Are you sure you want to delete your account? This cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-1 bg-gray-300 rounded">Cancel</button>
              <button onClick={() => {
                setShowDeleteConfirm(false);
                alert("Account Deleted!");
              }} className="px-4 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-80 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-1 bg-gray-300 rounded">Cancel</button>
              <button onClick={() => {
                setShowLogoutConfirm(false);
                alert("Logged Out!");
              }} className="px-4 py-1 bg-gray-800 text-white rounded">Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Password Update Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-80 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Update Password</h2>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border-b p-2 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowPasswordModal(false)} className="px-4 py-1 bg-gray-300 rounded">Cancel</button>
              <button onClick={() => {
                setShowPasswordModal(false);
                alert("Password Updated!");
              }} className="px-4 py-1 bg-gray-800 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Email Update Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-80 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Update Email</h2>
            <input
              type="email"
              placeholder="Enter new email"
              className="w-full border-b p-2 focus:outline-none"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowEmailModal(false)} className="px-4 py-1 bg-gray-300 rounded">Cancel</button>
              <button onClick={() => {
                setShowEmailModal(false);
                alert("Email Updated!");
              }} className="px-4 py-1 bg-gray-800 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
