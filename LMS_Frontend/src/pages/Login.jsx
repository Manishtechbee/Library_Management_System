import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/auth'  // Your real API function

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await login(email, password);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    // Redirect based on role
    const role = res.data.user.role;
    if (role === "admin") navigate('/dashboard/admin');
    else if (role === "student") navigate('/dashboard/student');
    else if (role === "faculty") navigate('/dashboard/faculty');
    else if (role === "librarian") navigate('/dashboard/librarian');
    else navigate('/'); // Fallback
  } catch (err) {
    setError(err.response?.data?.message || 'Invalid email or password');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f6fb]">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
        <h2 className="text-3xl font-bold text-[#1b365d] text-center mb-6">Library Login</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border rounded-lg outline-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@library.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border rounded-lg outline-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3a7ce1] text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Log In
          </button>
          <div className="text-right ">
            <Link to="/forgot-password" className="text-sm text-blue-700 hover:underline">
              Forgot password?
            </Link>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{' '}
          <Link to="/register" className="text-[#3a7ce1] font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
