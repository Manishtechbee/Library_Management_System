import Chatbot from "../../components/general/Chatbot";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({chatOpen, setChatOpen, darkMode}) {
  return (
    <>
    {darkMode?(<div className="flex min-h-screen bg-[#f4f8fb] dark:bg-gray-900">
  <Sidebar darkMode={darkMode}/>

  {/* Main Content */}
  <div className="flex-1 bg-[#ffffff] dark:bg-gray-800 shadow-inner">
    <Outlet />
  </div>

  {/* Chatbot Fixed at Bottom Right */}
  <div className="fixed bottom-6 right-6 z-50">
    <Chatbot open={chatOpen} setOpen={setChatOpen} darkMode={darkMode} />
  </div>
</div>
):(<div className="flex min-h-screen bg-[#f4f8fb]">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 bg-[#ffffff] shadow-inner">
        
      
        <Outlet />
      </div>
       {/* Chatbot Fixed at Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <Chatbot open={chatOpen} setOpen={setChatOpen}/>
      </div>
    </div>)}
    </>

  );
}
