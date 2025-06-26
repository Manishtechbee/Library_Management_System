



  import React, { useEffect, useRef, useState } from 'react'
import { FaBell } from 'react-icons/fa';
  
  export default function NotificationBell() {
    const [notifications, setNotifications] = useState([
    { id: 1, text: "New book 'React Basics' added to catalog", read: false },
    { id: 2, text: "Your reservation for 'Clean Code' is confirmed", read: false },
    { id: 3, text: "Upcoming due date for 'Data Structures'", read: false },
    { id: 4, text: "Fine payment of ₹50 received", read: true },
    { id: 5, text: "Workshop on 'AI in Libraries' tomorrow", read: false },
    { id: 6, text: "Library will be closed on Sunday", read: true },
  ]);

  const [visibleCount, setVisibleCount] = useState(4);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, notifications.length));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


    return (
      <>
       {/* Notification Bell */}
  <div className="relative">
  <button onClick={toggleDropdown} className="relative focus:outline-none">
    <FaBell className="text-gray-700 text-2xl" />
    {unreadCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
        {unreadCount}
      </span>
    )}
  </button>

  {showDropdown && (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-lg border border-gray-200 z-30"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <span className="font-semibold text-gray-800 text-sm">Notifications</span>
        <button
          onClick={markAllAsRead}
          className="text-blue-500 text-xs hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <p className="p-4 text-center text-gray-500 text-sm">No notifications</p>
      ) : (
        <ul className="max-h-64 overflow-y-auto divide-y divide-gray-100">
          {notifications.slice(0, visibleCount).map((n) => (
            <li
              key={n.id}
              className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition ${
                n.read ? "text-gray-500" : "text-gray-800 font-medium"
              }`}
            >
              <p className="text-sm">{n.text}</p>
              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Load More */}
      {visibleCount < notifications.length && (
        <button
          onClick={loadMore}
          className="w-full text-center text-blue-500 text-sm py-2 hover:underline border-t border-gray-200"
        >
          Load More
        </button>
      )}
    </div>
  )}
</div>
      </>
    )
  }
  