import React, { useEffect, useRef, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { io } from 'socket.io-client';

export default function NotificationBell({ userId ,darkMode}) {
  const [notifications, setNotifications] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const socketRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const markAllAsRead = () => {
  fetch(`http://localhost:5000/api/notifications/mark-all-read/${userId}`, {
    method: 'PUT'
  })
    .then(res => res.json())
    .then(() => {
      setNotifications(prev => prev.map((n) => ({ ...n, read: true })));
    })
    .catch(err => console.error(err));
};


  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, notifications.length));
  };

  // Fetch Existing Notifications from Backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/notifications/${userId}`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(n => ({
          id: n.id,
          text: n.message,
          read: n.is_read,
          time: new Date(n.created_at).toLocaleString()
        }));
        setNotifications(formatted);
      })
      .catch(err => console.error(err));
  }, [userId]);

  // Setup Socket.io for Real-Time Notifications
  useEffect(() => {
    socketRef.current = io('http://localhost:5000');

    socketRef.current.emit('join', userId);

    socketRef.current.on('new_notification', (data) => {
      setNotifications(prev => [
        {
          id: data.id,
          text: data.message,
          read: false,
          time: new Date(data.created_at).toLocaleString()
        },
        ...prev
      ]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId]);

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
    <div className="relative">
      <button onClick={toggleDropdown} className="relative focus:outline-none">
        <FaBell className={`text-2xl ${darkMode ? "text-gray-200" : "text-gray-700"}`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className={`absolute right-0 mt-2 w-72 shadow-2xl rounded-lg border z-30 ${
            darkMode ? "bg-[#182348] border-[#3D4A61] " : "bg-white border-gray-300"
          }`}
        >
          <div
            className={`flex justify-between items-center px-4 py-2 ${
              darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
            }`}
          >
            <span
              className={`font-semibold text-sm ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Notifications
            </span>
            <button
              onClick={markAllAsRead}
              className={`text-xs hover:underline ${
                darkMode ? "text-blue-400" : "text-blue-500"
              }`}
            >
              Mark all as read
            </button>
          </div>

          {notifications.length === 0 ? (
            <p
              className={`p-4 text-center text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No notifications
            </p>
          ) : (
            <ul className={`max-h-64 overflow-y-auto divide-y ${
              darkMode ? "divide-gray-700" : "divide-gray-100"
            }`}
            >
              {notifications.slice(0, visibleCount).map((n) => (
                <li
                  key={n.id}
                  className={`px-4 py-3 cursor-pointer transition ${
                    n.read
                      ? darkMode
                        ? "text-gray-400 hover:bg-gray-700"
                        : "text-gray-500 hover:bg-gray-100"
                      : darkMode
                      ? "text-white font-medium hover:bg-gray-700"
                      : "text-gray-900 font-medium hover:bg-gray-100"
                  }`}
                >
                  <p className="text-sm">{n.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      darkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    {n.time}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {visibleCount < notifications.length && (
            <button
              onClick={loadMore}
              className={`w-full text-center text-sm py-2 hover:underline border-t ${
                darkMode
                  ? "text-blue-400 border-gray-700"
                  : "text-blue-500 border-gray-200"
              }`}
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  </>



  );
}
