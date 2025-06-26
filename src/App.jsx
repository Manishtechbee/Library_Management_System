import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import DashboardLayout from './pages/DashboardLayout';
import Books from './pages/Books';
import Users from './pages/Users';
import Analytics from './pages/Analytics';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Chatbot from './components/general/Chatbot';
import NotFound from "./components/NotFound";

import AdminDashboard from './pages/admin/DashboardHome';
import StudentDashboard from './pages/student/DashboardLayout';
import FacultyDashboard from './pages/faculty/DashboardLayout';
import LibrarianDashboard from './pages/librarian/DashboardHome';

import DashHome from './pages/faculty/DashboardHome';
import BCatalog from './pages/faculty/BooksCatalog';

import CombinedRoute from './routes/CombinedRoute';
import BooksCatalog from './pages/student/BooksCatalog';
import MyBooks from './pages/student/MyBooks';
import DashboardHome from './pages/student/DashboardHome';
import Eres from './pages/faculty/Eresources';

import Supp from './pages/faculty/suppport';
import Sett from './pages/faculty/settings';

import Eresources from './pages/student/Eresources';
import Reservations from './pages/student/reservations';
import Profile from './pages/student/profile';
import Support from './pages/student/suppport';
import Settings from './pages/student/settings';
import Fines from './pages/student/fines';


export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <Routes>
      <Route path="/" element={<Home chatOpen={chatOpen} setChatOpen={setChatOpen} />} />



      {/* Admin Dashboard */}
      <Route
        path="/dashboard/admin"
        element={
          <CombinedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </CombinedRoute>
        }
      />


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
  <Route path="reservations" element={<Reservations />} />
  <Route path="fines" element={<Fines/>} />
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
  <Route path="support" element={<Support />} />

</Route>


      {/* Faculty Dashboard */}
      <Route
        path="/dashboard/faculty"
        element={
          <CombinedRoute allowedRoles={["faculty"]}>
            <FacultyDashboard />
          </CombinedRoute>
        }
      >
        <Route index element={<DashHome />} />
        
  <Route path="e-resources" element={<Eres/>} />
      <Route path="catalog" element={<BCatalog/>} />
  <Route path="settings" element={<Sett />} />
  <Route path="support" element={<Supp />} />
  
      </Route>

      {/* Librarian Dashboard */}
      <Route
        path="/dashboard/librarian"
        element={
          <CombinedRoute allowedRoles={["librarian"]}>
            <DashboardLayout />
            <LibrarianDashboard />
          </CombinedRoute>
        }
      />



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
  );
}








      

     
      
