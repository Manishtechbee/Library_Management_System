import Chatbot from "../../components/general/Chatbot";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({chatOpen, setChatOpen}) {
  return (
    <div className="flex min-h-screen bg-[#f4f8fb]">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 bg-[#ffffff] shadow-inner">
        
      
        <Outlet />
      </div>
       {/* Chatbot Fixed at Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <Chatbot open={chatOpen} setOpen={setChatOpen}/>
      </div>
    </div>

  );
}
