// src/layouts/StudentLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar role="student" />
      <main className="ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
}