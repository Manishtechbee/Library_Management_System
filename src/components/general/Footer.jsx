import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer({darkMode}) {
  const navigate = useNavigate();
  

  return (
    <footer className={`${darkMode ? "bg-gray-800 text-gray-300" : "bg-[#d1e3f4] text-gray-800"} py-2 text-center text-sm`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-4">
        <div>
          <div className="flex gap-4 justify-center py-1">
            <a href="https://github.com/Manishtechbee/Library_Management_System" className={`hover:${darkMode ? "text-blue-400" : "text-blue-600"}`}>
              GitHub
            </a>

            <a 
              href="#"
              onClick={() => {
                if (!user) navigate("/login");
                else navigate(`/dashboard/${user.role}/support`);
              }}
              className={`hover:${darkMode ? "text-blue-400" : "text-blue-600"}`}
            >
              Contact
            </a>

            <a href="#features" className={`hover:${darkMode ? "text-blue-400" : "text-blue-600"}`}>
              Features
            </a>
          </div>

          <p>© {new Date().getFullYear()} Library Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
