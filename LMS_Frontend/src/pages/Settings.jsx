import React, { useState } from 'react'

export default function Settings() {
  const [name, setName] = useState('Manish Kumar')
  const [email, setEmail] = useState('manish@example.com')
  const [password, setPassword] = useState('')
  const [notifications, setNotifications] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Integrate API call to save changes
    alert('Settings saved!')
  }

  return (
    <div className="p-6 md:p-10 bg-[#f1f6fb] min-h-screen">
      <h2 className="text-2xl font-bold text-[#1b365d] mb-6">Account Settings</h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Left - Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-lg outline-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-4 py-2 rounded-lg outline-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              className="w-full border px-4 py-2 rounded-lg outline-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {/* Notifications */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-700">Receive email notifications</label>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>

        {/* Right - Summary */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-lg font-semibold text-[#1b365d] mb-2">Account Summary</h3>

          <div className="text-gray-700 text-sm space-y-2">
            <p><span className="font-medium text-gray-800">Role:</span> Admin</p>
            <p><span className="font-medium text-gray-800">Member Since:</span> Jan 2024</p>
            <p><span className="font-medium text-gray-800">Last Login:</span> 21 June 2025</p>
          </div>

          <hr />

          <button className="text-red-600 hover:underline text-sm">Delete Account</button>
        </div>
      </div>
    </div>
  )
}
