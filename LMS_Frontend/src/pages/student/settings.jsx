import { useState, useEffect } from "react";
import { FaCamera, FaTrash, FaSignOutAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";


export default function StudentSettings({darkMode, toggleDarkMode}) {
 const [name, setName] = useState(null);
const [email, setEmail] = useState(null);
const [phone, setPhone] = useState(null);
const [address, setAddress] = useState(null);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);
  const [theme, setTheme] = useState("system");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [password, setPassword] = useState({
  old: "",
  new: "",
  confirm: "",
});

  const [newEmail, setNewEmail] = useState("");
  const [avatar, setAvatar] = useState("https://ui-avatars.com/api/?name=Manish+Kumar&background=cccccc&color=000&size=128");

  const storedUser = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  if (storedUser?.id) {
    fetch(`http://localhost:5000/api/student/${storedUser.id}`)
      .then(res => res.json())
      .then(data => {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);
        const fallbackName = data.name || "Student";
        
        const ProfileImage = data.profileImage==null?
        `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=cccccc&color=000&size=128`:
        `http://localhost:5000${data.profileImage}`;
        console.log(ProfileImage);
        
        
          setAvatar(ProfileImage);
        
      })
      .catch(err => console.error(err));
  }
}, []);



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);

      const formData = new FormData();
      formData.append("profileImage", file);
      fetch(`http://localhost:5000/api/student/upload-profile/${storedUser.id}`, {
        method: "POST",
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          setAvatar(`http://localhost:5000${data.imagePath}`);
          toast.success("Profile Image Updated!");
        })
        .catch(err => console.error(err));
    }
  };

  const handleSave = () => {
  fetch(`http://localhost:5000/api/student/${storedUser.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, address })
  })
    .then(res => res.json())
    .then(data => {
      toast.success("Profile Updated Successfully!");

      // Update name in localStorage
      const updatedUser = { ...storedUser, name };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    })
    .catch(err => console.error(err));
};



  return (
    
        <div className={`min-h-screen flex items-start p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
    <div className="w-full max-w-6xl space-y-12">
      <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
        Student Settings
      </h1>
      {/*<div className="min-h-screen bg-white flex justify-center items-start p-5">
      <div className="w-full max-w-6xl space-y-12">

        <h1 className="text-2xl font-bold text-gray-800">Student Settings</h1>*/}

       {/* {/* Profile Section *
        <div className="space-y-6 pb-8 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Profile Information</h2>
          <div className="grid grid-cols-3 gap-8 items-start">
            {/* Avatar *
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-35 h-35 rounded-full object-cover"
                />
                <button
                  className="absolute bottom-0 right-0 p-2.5 bg-gray-700 text-white rounded-full text-s"
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

            {/* Profile Details *
            <div className="col-span-2 grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  className="w-full bg-gray-100 rounded p-1 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1 ">Email</label>
                <input
                  className="w-full  rounded p-1 bg-gray-100 cursor-not-allowed"
                  value={email}
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1 ">Phone Number</label>
                <input
                  className="w-full p-1 bg-gray-100 rounded focus:outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Address</label>
                <input
                  className="w-full bg-gray-100 rounded p-1 focus:outline-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>


              
    {/*<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="text-sm text-gray-600">Name</label>
        <input
          className="w-full p-2 mt-1 bg-gray-100 rounded text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </div>
      <div>
        <label className="text-sm text-gray-600">Phone Number</label>
        <input
          className="w-full p-2 mt-1 bg-gray-100 rounded text-sm"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="text-sm text-gray-600">Address</label>
        <input
          className="w-full p-2 mt-1 bg-gray-100 rounded text-sm"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
        />
      </div>*











            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded">
              Save Changes
            </button>
          </div>
        </div>
        

        {/* Account Settings *
        <div className="space-y-4 pb-8 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Account Settings</h2>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setShowPasswordModal(true)} className="px-4 py-2 bg-gray-800 text-white rounded">Change Password</button>
            <button onClick={() => setShowEmailModal(true)} className="px-4 py-2 bg-gray-800 text-white rounded">Update Email</button>
          </div>
        </div>*/}

        
{/* Profile Section */}
<motion.div 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  className={`space-y-6 pb-8 border-b ${darkMode ? "border-gray-600" : "border-gray-200"}`}
>
  <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Profile Information</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

    {/* Avatar */}
    <div className="flex flex-col items-center">
      <div className="relative">
        <img
          src={avatar}
          alt="Avatar"
          className="w-40 h-40 rounded-full object-cover border-2 border-gray-400"
        />
        <button
          className="absolute bottom-0 right-0 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-500 transition"
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
    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label className={`block text-sm mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Name</label>
        <input
          className={`w-full rounded p-2 focus:outline-none ${darkMode ? "bg-gray-700 text-white border border-gray-500" : "bg-gray-100 text-gray-800"}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className={`block text-sm mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Email</label>
        <input
          className={`w-full rounded p-2 cursor-not-allowed ${darkMode ? "bg-gray-700 text-white border border-gray-500" : "bg-gray-100 text-gray-800"}`}
          value={email}
          disabled
        />
      </div>
      <div>
        <label className={`block text-sm mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Phone Number</label>
        <input
          className={`w-full rounded p-2 focus:outline-none ${darkMode ? "bg-gray-700 text-white border border-gray-500" : "bg-gray-100 text-gray-800"}`}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label className={`block text-sm mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Address</label>
        <input
          className={`w-full rounded p-2 focus:outline-none ${darkMode ? "bg-gray-700 text-white border border-gray-500" : "bg-gray-100 text-gray-800"}`}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
    </div>
  </div>

  <div className="flex justify-end mt-4">
    <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
      Save Changes
    </button>
  </div>
</motion.div>

{/* Account Settings */}
<motion.div 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  className={`space-y-4 pb-8 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}
>
  <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Account Settings</h2>
  <div className="flex flex-wrap gap-4">
    <button 
      onClick={() => setShowPasswordModal(true)} 
      className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
    >
      Change Password
    </button>
    <button 
      onClick={() => setShowEmailModal(true)} 
      className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
    >
      Update Email
    </button>
  </div>
</motion.div>


       {/* {/* Notifications 
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

        {/* Existing App Preferences 
<h2 className="text-lg font-semibold text-gray-700">App Preferences</h2>
<div>
  <label className="block text-sm text-gray-600 mb-1">Theme</label>
  <div className="flex items-center gap-4">
    <span className="text-sm text-gray-600">Dark Mode</span>
    <input
      type="checkbox"
      checked={darkMode}
      onChange={() => toggleDarkMode(!darkMode)}
    />
  </div>
</div>*/}

        {/* Notifications */}
<motion.div 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  className={`space-y-4 pb-8 border-b ${darkMode ? "border-gray-600" : "border-gray-200"}`}
>
  <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
    Notifications
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={emailNotifications}
        onChange={() => setEmailNotifications(!emailNotifications)}
      />
      <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>Email Notifications</span>
    </div>

    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={appNotifications}
        onChange={() => setAppNotifications(!appNotifications)}
      />
      <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>App Notifications</span>
    </div>
  </div>
</motion.div>

{/* App Preferences */}
<motion.div 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  className={`space-y-4 pb-8 ${darkMode ? "border-gray-700" : "border-gray-200"}`}
>
  <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
    App Preferences
  </h2>

  <div>
    <label className={`block text-sm mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
      Theme
    </label>

    <div className="flex items-center gap-4">
      <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Dark Mode</span>
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() => toggleDarkMode(!darkMode)}
      />
    </div>
  </div>
</motion.div>


        {/*{/* Logout *
        <div>
          <button onClick={() => setShowLogoutConfirm(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded">
            <FaSignOutAlt />
            Logout
          </button>
        </div>*/}



        {/* Logout Button */}
<div>
  <button
    onClick={() => setShowLogoutConfirm(true)}
    className={`flex items-center gap-2 px-4 py-2 text-white rounded ${darkMode? "bg-gray-700 hover:bg-gray-600": "bg-gray-800 hover:bg-gray-700"} transition`}
  >
    <FaSignOutAlt />
    Logout
  </button>
</div>
      </div>

   

      {/*{/* Logout Confirmation Modal *
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-80 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-1 bg-gray-300 rounded">Cancel</button>
              <button onClick={() => {
                setShowLogoutConfirm(false);
                localStorage.removeItem("user");
window.location.href = "/login";
              }} className="px-4 py-1 bg-gray-800 text-white rounded">Logout</button>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow w-96 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Update Password</h2>

      {/* Old Password *
      <input
        type="password"
        placeholder="Enter current password"
        className="w-full border-b p-2 focus:outline-none"
        value={password.old}
        onChange={(e) =>
          setPassword((prev) => ({ ...prev, old: e.target.value }))
        }
      />

      {/* New Password *
      <input
        type="password"
        placeholder="Enter new password"
        className="w-full border-b p-2 focus:outline-none"
        value={password.new}
        onChange={(e) =>
          setPassword((prev) => ({ ...prev, new: e.target.value }))
        }
      />

      {/* Confirm New Password *
      <input
        type="password"
        placeholder="Confirm new password"
        className="w-full border-b p-2 focus:outline-none"
        value={password.confirm}
        onChange={(e) =>
          setPassword((prev) => ({ ...prev, confirm: e.target.value }))
        }
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            setShowPasswordModal(false);
            setPassword({ old: "", new: "", confirm: "" });
          }}
          className="px-4 py-1 bg-gray-300 rounded"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            const { old, new: newPass, confirm } = password;

            if (!old || !newPass || !confirm) {
              toast.info("Please fill all fields.");
              return;
            }
            if (newPass.length < 6) {
              toast.info("New password must be at least 6 characters.");
              return;
            }
            if (newPass !== confirm) {
              toast.error("New password and confirm password do not match.");
              return;
            }

            try {
              const user = JSON.parse(localStorage.getItem("user"));

              const res = await fetch(
                `http://localhost:5000/api/student/update-password/${user.id}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    oldPassword: old,
                    newPassword: newPass,
                  }),
                }
              );

              const data = await res.json();

              if (res.ok) {
                toast.success("Password Updated Successfully!");
                setShowPasswordModal(false);
                setPassword({ old: "", new: "", confirm: "" });
              } else {
                toast.error(data.message || "Incorrect current password.");
              }
            } catch (error) {
              console.error(error);
              toast.error("An error occurred while updating password.");
            }
          }}
          className="px-4 py-1 bg-gray-800 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}


       Email Update Modal *
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
                fetch(`http://localhost:5000/api/student/update-email/${storedUser.id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ newEmail })
})
  .then(res => res.json())
  .then(data => {
    toast.success(data.message);
    setEmail(newEmail);
    setShowEmailModal(false);
  })
  .catch(err => {
    console.error(err);
    toast.error("Failed to update email.");
  });

              }} className="px-4 py-1 bg-gray-800 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
*/}

{/* Logout Confirmation Modal */}
{showLogoutConfirm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className={`p-6 rounded shadow w-80 space-y-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <h2 className="text-lg font-semibold">Confirm Logout</h2>
      <p className="text-sm">
        Are you sure you want to logout?
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowLogoutConfirm(false)}
          className={`px-4 py-1 rounded ${darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-300 hover:bg-gray-400"} transition`}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setShowLogoutConfirm(false);
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}

{/* Password Update Modal */}
{showPasswordModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className={`p-6 rounded shadow w-96 space-y-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <h2 className="text-lg font-semibold">Update Password</h2>

      <input
        type="password"
        placeholder="Current password"
        className={`w-full p-2 rounded focus:outline-none ${darkMode ? "bg-gray-700 text-white border border-gray-600" : "bg-gray-100"}`}
        value={password.old}
        onChange={(e) => setPassword((prev) => ({ ...prev, old: e.target.value }))}
      />

      <input
        type="password"
        placeholder="New password"
        className={`w-full p-2 rounded focus:outline-none ${darkMode ? "bg-gray-700 text-white border border-gray-600" : "bg-gray-100"}`}
        value={password.new}
        onChange={(e) => setPassword((prev) => ({ ...prev, new: e.target.value }))}
      />

      <input
        type="password"
        placeholder="Confirm new password"
        className={`w-full p-2 rounded focus:outline-none ${darkMode ? "bg-gray-700 text-white border border-gray-600" : "bg-gray-100"}`}
        value={password.confirm}
        onChange={(e) => setPassword((prev) => ({ ...prev, confirm: e.target.value }))}
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            setShowPasswordModal(false);
            setPassword({ old: "", new: "", confirm: "" });
          }}
          className={`px-4 py-1 rounded ${darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-300 hover:bg-gray-400"} transition`}
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            const { old, new: newPass, confirm } = password;

            if (!old || !newPass || !confirm) {
              toast.info("Please fill all fields.");
              return;
            }
            if (newPass.length < 6) {
              toast.info("New password must be at least 6 characters.");
              return;
            }
            if (newPass !== confirm) {
              toast.error("New password and confirm password do not match.");
              return;
            }

            try {
              const user = JSON.parse(localStorage.getItem("user"));
              const res = await fetch(`http://localhost:5000/api/student/update-password/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oldPassword: old, newPassword: newPass }),
              });
              const data = await res.json();

              if (res.ok) {
                toast.success("Password Updated Successfully!");
                setShowPasswordModal(false);
                setPassword({ old: "", new: "", confirm: "" });
              } else {
                toast.error(data.message || "Incorrect current password.");
              }
            } catch (error) {
              console.error(error);
              toast.error("An error occurred while updating password.");
            }
          }}
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

{/* Email Update Modal */}
{showEmailModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className={`p-6 rounded shadow w-80 space-y-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <h2 className="text-lg font-semibold">Update Email</h2>

      <input
        type="email"
        placeholder="Enter new email"
        className={`w-full p-2 rounded focus:outline-none ${darkMode ? "bg-gray-700 text-white border border-gray-600" : "bg-gray-100"}`}
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowEmailModal(false)}
          className={`px-4 py-1 rounded ${darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-300 hover:bg-gray-400"} transition`}
        >
          Cancel
        </button>

        <button
          onClick={() => {
            fetch(`http://localhost:5000/api/student/update-email/${storedUser.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ newEmail }),
            })
              .then((res) => res.json())
              .then((data) => {
                toast.success(data.message);
                setEmail(newEmail);
                setShowEmailModal(false);
              })
              .catch((err) => {
                console.error(err);
                toast.error("Failed to update email.");
              });
          }}
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
