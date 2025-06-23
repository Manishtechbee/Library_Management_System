// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import DashboardLayout from './pages/DashboardLayout'
import DashboardHome from './pages/admin/DashboardHome'
import Books from './pages/Books'
import Users from './pages/Users'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Chatbot from './components/Chatbot'
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="books" element={<Books />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/login" element={<Login/>} />
      <Route path="/chatbot" element={<Chatbot/>} />
<Route path="/register" element={<Register/>} />
<Route path="/forgot-password" element={<ForgotPassword/>} />
<Route path="settings" element={<Settings />} />
<Route path="*" element={<NotFound />} />

    </Routes>
  )
}
