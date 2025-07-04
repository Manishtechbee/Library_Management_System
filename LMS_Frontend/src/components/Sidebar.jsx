// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom'
import { FaBook, FaUsers, FaChartPie, FaCog, FaQrcode, FaFileExport, FaBell, FaHome } from 'react-icons/fa'

export default function Sidebar({ role }) {
  const location = useLocation()

  const links = [
    { to: '/dashboard', label: 'Home', icon: <FaHome /> },
    { to: '/dashboard/books', label: 'Books', icon: <FaBook /> },
    { to: '/dashboard/analytics', label: 'Analytics', icon: <FaChartPie /> },
    { to: '/dashboard/notifications', label: 'Notifications', icon: <FaBell /> },
    { to: '/dashboard/qrcode', label: 'QR/Barcode', icon: <FaQrcode /> },
    { to: '/dashboard/export', label: 'Export Data', icon: <FaFileExport /> },
    { to: '/dashboard/settings', label: 'Settings', icon: <FaCog /> }
  ]

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-8">{role} Dashboard</h2>
      <nav className="space-y-4">
        {links.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 transition ${location.pathname === to ? 'bg-blue-200' : ''}`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
