import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import DashboardLayout from './pages/DashboardLayout';
import Analytics from './pages/Analytics';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Chatbot from './components/general/Chatbot';
import NotFound from "./components/NotFound";

import AdminDashboard from './pages/admin/DashboardLayout';
import StudentDashboard from './pages/student/DashboardLayout';
import FacultyDashboard from './pages/faculty/DashboardLayout';
import LibrarianDashboard from './pages/librarian/DashboardLayout';

import DashH from './pages/admin/DashboardHome';
import BooksInv from './pages/admin/BooksCatalog';


import DashHome from './pages/faculty/DashboardHome';

import DashHomeLib from './pages/librarian/DashboardHome';
import BCatalog from './pages/faculty/BooksCatalog';

import CombinedRoute from './routes/CombinedRoute';
import BooksCatalog from './pages/student/BooksCatalog';
import MyBooks from './pages/student/MyBooks';
import MyB from './pages/faculty/MyBooks';

import Prof from './pages/faculty/profile';

import Fin from './pages/faculty/fines';
import DashboardHome from './pages/student/DashboardHome';
import Eres from './pages/faculty/Eresources';

import Supp from './pages/faculty/suppport';
import Sett from './pages/faculty/settings';

import BooksCat from './pages/librarian/BooksCatalog';

import Eresources from './pages/student/Eresources';
import Profile from './pages/student/profile';
import Support from './pages/student/suppport';
import Settings from './pages/student/settings';
import Fines from './pages/student/fines';
import ResetPassword from './components/resetpassword';





import AllBooks from "./pages/admin/AllBooks";
import AddBook from "./pages/admin/AddBook";
import DeleteBook from "./pages/admin/DeleteBook";
import AllUsers from "./pages/admin/AllUsers";
import ManageLibrarians from "./pages/admin/ManageLibrarians";
import IssueRequests from "./pages/admin/IssueRequests";
import OverdueFines from "./pages/admin/OverdueFines";
import ReportsLogs from "./pages/admin/ReportsLogs";
import ExportData from "./pages/admin/ExportData";
import BackupControl from "./pages/admin/BackupControl";
import NoDuesPanel from "./pages/admin/NoDuesPanel";
import Complaints from "./pages/admin/Complaints";
import AdminSettings from "./pages/admin/AdminSettings";



import AllBooksLib from "./pages/librarian/AllBooks";
import IssueRequestsLib from "./pages/librarian/IssueRequests";
import LibrarianSettings from "./pages/librarian/Settings";
import Reports from "./pages/librarian/Reports";



import Recomm from "./pages/faculty/Recommendations";

import StudentRef from "./pages/faculty/stuentRefer";


export default function App() {
  const [darkMode, setDarkMode] = useState(false);
useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setDarkMode(user.dark_mode === 1);
    }
    
  }, []);

  const toggleDarkMode = async () => {
    setDarkMode(prev => !prev);
    
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.id}/dark-mode`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dark_mode: darkMode ? 0 : 1 })
      });
      const data = await res.json();
      if (data.success) {
        // Update stored user
        user.dark_mode = darkMode ? 0 : 1;
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (err) {
      console.error("Failed to update dark mode:", err);
    }
  };
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <>
    <div className={darkMode ? "dark" : ""}>
     
    <Routes>
      <Route path="/" element={<Home chatOpen={chatOpen} setChatOpen={setChatOpen} darkMode={darkMode} toggleDarkMode={toggleDarkMode}  />} />



      {/* Admin Dashboard */}
      <Route
        path="/dashboard/admin"
        element={
          <CombinedRoute allowedRoles={["admin"]}>
            <AdminDashboard chatOpen={chatOpen} setChatOpen={setChatOpen} />
          </CombinedRoute>
        }

      >
        <Route index element={<DashH />} />
        
      <Route path="catalog" element={<BooksInv />} />
       {/* Books */}
            <Route path="/dashboard/admin/books" element={<AllBooks />} />
            <Route path="/dashboard/admin/add-book" element={<AddBook />} />
            <Route path="/dashboard/admin/delete-book" element={<DeleteBook />} />

            {/* Users */}
            <Route path="/dashboard/admin/users" element={<AllUsers />} />
            <Route path="/dashboard/admin/librarians" element={<ManageLibrarians />} />

            {/* Issue & Return */}
            <Route path="/dashboard/admin/issue-requests" element={<IssueRequests />} />
            <Route path="/dashboard/admin/overdue" element={<OverdueFines />} />

            {/* Reports */}
            <Route path="/dashboard/admin/reports" element={<ReportsLogs />} />

            {/* System */}
            <Route path="/dashboard/admin/export" element={<ExportData />} />
            <Route path="/dashboard/admin/backup" element={<BackupControl />} />
            <Route path="/dashboard/admin/no-dues" element={<NoDuesPanel />} />
            <Route path="/dashboard/admin/complaints" element={<Complaints />} />
            <Route path="/dashboard/admin/settings" element={<AdminSettings />} />
      </Route>


      {/* Student Dashboard */}
      <Route
  path="/dashboard/student"
  element={
    <CombinedRoute allowedRoles={["student"]}>
      <StudentDashboard chatOpen={chatOpen} setChatOpen={setChatOpen} />
    </CombinedRoute>
  }
>
  <Route index element={<DashboardHome />} />
  <Route path="MyBooks" element={<MyBooks />} />
  
      <Route path="catalog" element={<BooksCatalog />} />
  <Route path="e-resources" element={<Eresources/>} />
  <Route path="fines" element={<Fines/>} />
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>} />
  <Route path="support" element={<Support />} />

</Route>


<Route path="/reset-password/:token" element={<ResetPassword />} />


      {/* Faculty Dashboard */}
      <Route
        path="/dashboard/faculty"
        element={
          <CombinedRoute allowedRoles={["faculty"]}>
            <FacultyDashboard chatOpen={chatOpen} setChatOpen={setChatOpen} />
          </CombinedRoute>
        }
      >
        <Route index element={<DashHome />} />
        
  <Route path="e-resources" element={<Eres/>} />
      <Route path="catalog" element={<BCatalog/>} />
  <Route path="settings" element={<Sett darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>} />
  <Route path="support" element={<Supp />} />
  <Route path='MyBooks' element={<MyB/>}/>
  <Route path='profile' element={<Prof/>}/>
  <Route path='fines' element={<Fin/>}/>
  <Route path='recommendations' element={<Recomm/>}/>
  
  <Route path='refer' element={<StudentRef/>}/>
  
      </Route>

      {/* Librarian Dashboard */}
      <Route
        path="/dashboard/librarian"
        element={
          <CombinedRoute allowedRoles={["librarian"]}>
            
            <LibrarianDashboard chatOpen={chatOpen} setChatOpen={setChatOpen} />
          </CombinedRoute>
        }
      >
        <Route index element={<DashHomeLib/>} />
        <Route path='catalog' element={<BooksCat/>}/>
        <Route path='books' element={<AllBooksLib/>}/>
        <Route path="issue-requests" element={<IssueRequestsLib />} />
        <Route path="settings" element={<LibrarianSettings />} />
        <Route path="reports" element={<Reports />} />
      </Route>



      {/*{/* Role-based protected Dashboard <Route 
        path="/dashboard" 
        element={
          <CombinedRoute allowedRoles={["admin", "librarian","student","faculty"]}>
            
          </CombinedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="books" element={<Books />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>*/}

      {/* Example: Settings page accessible by all logged-in users */}
      <Route 
        path="/settings" 
        element={
          <CombinedRoute allowedRoles={["admin", "librarian", "student", "faculty"]}>
            <Settings />
          </CombinedRoute>
        } 
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/chatbot" element={<Chatbot chatOpen={chatOpen} setChatOpen={setChatOpen} />} />



      {/*Error Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
    </>
  );
}








      

     
      
