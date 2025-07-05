import Chatbot from "../../components/general/Chatbot";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({chatOpen, setChatOpen, darkMode}) {
  return (
    <>
    {darkMode?(<div className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-[#f4f8fb] text-gray-800"}`}>
  <Sidebar darkMode={darkMode} />

  {/* Main Content */}
  <div className={`flex-1 p-6 shadow-inner ${darkMode ? "bg-gray-800" : "bg-white"}`}>
    <Outlet />
  </div>

  {/* Chatbot Fixed at Bottom Right */}
  <div className="fixed bottom-6 right-6 z-50">
    <Chatbot open={chatOpen} setOpen={setChatOpen} darkMode={darkMode} />
  </div>
</div>
):(<div className="flex min-h-screen bg-[#f4f8fb]">
      <Sidebar darkMode={darkMode}/>
      {/* Main Content */}
      <div className="flex-1 p-6 bg-[#ffffff] shadow-inner">
        
      
        <Outlet />
      </div>
       {/* Chatbot Fixed at Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <Chatbot open={chatOpen} setOpen={setChatOpen} darkMode={darkMode}/>
      </div>
    </div>)}
    </>

  );
}
