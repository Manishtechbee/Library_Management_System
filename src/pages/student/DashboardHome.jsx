import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";


import {
  FaBook,
  FaClock,
  FaMoneyBillWave,
  FaBookmark,
  FaSearch,
  FaPlus,
  FaFilePdf,
} from "react-icons/fa";
import NotificationBell from "../../components/general/NotificationBell";

export default function DashboardHome() {
  const [activityList, setActivityList] = useState([]);
  const [profileCompletion,setProfileCompletion] = useState(0);
  const getBarColor = () => {
  if (profileCompletion < 50) return "bg-red-500";
  if (profileCompletion < 80) return "bg-yellow-500";
  return "bg-green-500";
};


  const user = JSON.parse(localStorage.getItem("user"));
  const studentName = user?.name || "Student";
  const [announcements, setAnnouncements] = useState([]);
  console.log(announcements);

 useEffect(() => {
  if (!user?.id) return;

  fetch(`http://localhost:5000/api/student/${user.id}`)
    .then(res => res.json())
    .then(data => {
      calculateProfileCompletion(data);
    })
    .catch(err => console.error(err));
}, []);

const calculateProfileCompletion = (profileData) => {
  if (!profileData) return;

  const fields = [
    profileData.email,
    profileData.phone,
    profileData.address,
    profileData.department,
    profileData.profileImage,
  ];

  const filledFields = fields.filter(Boolean).length;
  const percentage = Math.round((filledFields / fields.length) * 100);

  setProfileCompletion(percentage);
};

  


const [systemNotifications, setSystemNotifications] = useState([]);

useEffect(() => {
  fetch(`http://localhost:5000/api/`)
    .then(res => res.json())
    .then(data => {
      setSystemNotifications(data);
      console.log(data);

      // Show persistent toast for each notification
      data.forEach(note => {
        const toastId = `system-${note.id}`; // unique toast ID per notification

        if (!toast.isActive(toastId)) {
          toast.warn(note.message, {
            toastId: toastId,
            
            autoClose: false,  // Stays until manually removed
            closeOnClick: false,
            draggable: false,
            theme: "light",
          });
        }
      });
    })
    .catch(err => console.error(err));
}, []);








  useEffect(() => {
  fetch(`http://localhost:5000/api/activity/${user.id}`)
    .then(res => res.json())
    .then(data => setActivityList(data))
    .catch(err => console.error(err));
}, []);


useEffect(() => {
  fetch(`http://localhost:5000/api/?role=${user.role}`)
    .then(res => res.json())
    .then(data => setAnnouncements(data))
    .catch(err => console.error(err));
}, []);


  const navigate = useNavigate();




  const [stats, setStats] = useState({
  totalIssued: 0,
  dueSoon: 0,
  unpaidFines: 0,
});

useEffect(() => {
  if (!user?.id) return;

  fetch(`http://localhost:5000/api/student/stats/${user.id}`)
    .then(res => res.json())
    .then(data => setStats(data))
    .catch(err => console.error(err));
}, []);


  return (
    <>
    <div className="space-y-8 p-6">
      
     {/* Welcome Message with Notification */}
<motion.div
  initial={{ opacity: 0, y: -15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="flex justify-between items-start mb-4"
>
  <div>
    <h2 className="text-3xl md:text-4xl font-bold text-[#1b365d] mb-2">
      Welcome, {studentName}!
    </h2>
    <p className="text-gray-600 text-lg">Here's your overview for today.</p>
  </div>

 <NotificationBell  userId={user.id}/>

</motion.div>


      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
  { icon: <FaBook className="text-blue-500 text-2xl" />, label: "Total Books Issued", value: stats.totalIssued },
  { icon: <FaClock className="text-yellow-500 text-2xl" />, label: "Books Due Soon", value: stats.dueSoon },
  { icon: <FaMoneyBillWave className="text-red-500 text-2xl" />, label: "Unpaid Fines", value: `₹${stats.unpaidFines}` },
  
].map((card, index) => (
          <motion.div
            key={index}
            className="bg-white shadow rounded-lg p-4 flex items-center gap-4"
            whileHover={{ y: -2 }}
          >
            {card.icon}
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-xl font-bold">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Profile Completion */}
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4, duration: 0.5 }}
  className="bg-white shadow rounded-lg p-4 relative"
>
  <p className="text-gray-700 font-medium mb-2">Profile Completion</p>
  <div className="w-full bg-gray-200 h-4 rounded-full relative group">
    <motion.div
      className={`h-4 rounded-full ${
        profileCompletion < 50 ? "bg-red-500" :
        profileCompletion < 80 ? "bg-yellow-500" :
        "bg-green-500"
      }`}
      style={{ width: `${profileCompletion}%` }}
      initial={{ width: 0 }}
      animate={{ width: `${profileCompletion}%` }}
      transition={{ duration: 0.8 }}
    />
    
    {/* Tooltip for incomplete profile */}
    {profileCompletion < 100 && (
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
        Complete your profile to access full features
      </div>
    )}
  </div>
  <p className="mt-1 text-sm text-gray-500">{profileCompletion}% completed</p>
</motion.div>



      {/* Recent Activity & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
  
  {/* Recent Activity */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.5 }}
    className="lg:col-span-2 flex flex-col h-full"
  >
    <div className="bg-white shadow rounded-lg p-4 flex flex-col h-full">
      <h2 className="font-semibold text-gray-700 mb-2">Recent Activity</h2>
      <ul className="space-y-2 text-sm text-gray-600 flex-grow">
  {activityList.length === 0 ? (
    <li>No recent activity found.</li>
  ) : (
    activityList.map((item, index) => (
      <li key={index}>
        {item.activity} 
        <span className="text-gray-400 text-xs"> ({new Date(item.timestamp).toLocaleString()})</span>
      </li>
    ))
  )}
</ul>

    </div>
    


    
  </motion.div>

  {/* Announcements */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6, duration: 0.5 }}
    className="flex flex-col h-full"
  >
    <div className="bg-white shadow rounded-lg p-4 flex flex-col h-full">
      <h2 className="font-semibold text-gray-700 mb-2">Announcements</h2>
      
      {announcements.length === 0 ? (
        <p className="text-gray-500 flex-grow">No announcements available.</p>
      ) : (
        <ul className="space-y-2 text-sm text-gray-600 flex-grow">
          {announcements.map((ann) => (
            <li key={ann.id}>{ann.title} - {ann.message}</li>
          ))}
        </ul>
      )}
    </div>
  </motion.div>

</div>


      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="bg-white shadow rounded-lg p-4"
      >
        <h2 className="font-semibold text-gray-700 mb-4">Quick Access</h2>
        <div className="flex flex-wrap gap-4">
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => navigate("/dashboard/student/catalog")}
          >
            <FaSearch /> Search Catalog
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => navigate("/dashboard/student/fines")}
          >
            <FaMoneyBillWave /> Pay Fines
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => navigate("/dashboard/student/e-resources")}
          >
            <FaFilePdf /> View E-Resources
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => navigate("/dashboard/student/MyBooks")}
          >
            <FaBook /> My Books
          </motion.button>
        </div>
      </motion.div>

      {/* Helpful Resources */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-white shadow rounded-lg p-4"
      >
        <h2 className="font-semibold text-gray-700 mb-4">Helpful Resources</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>
            <a href="/dashboard/student/support" className="text-blue-500 hover:underline">
              FAQs or Support
            </a>
          </li>
          <li>
            <a href="/dashboard/student/profile" className="text-blue-500 hover:underline">
              Profile or Settings
            </a>
          </li>
          <li>
            <span className="text-gray-700">Chatbot available in bottom corner</span>
          </li>
        </ul>
      </motion.div>
      

    </div>
   
    </>
  );
}
