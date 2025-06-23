import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implement password reset logic
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f6fb]">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-[#1b365d] text-center mb-6">Forgot Password</h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border rounded-lg outline-blue-500"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#3a7ce1] text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <p className="text-green-600 text-center text-sm">
            ✅ A password reset link has been sent to <strong>{email}</strong>
          </p>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          <Link to="/login" className="text-[#3a7ce1] hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  )
}
