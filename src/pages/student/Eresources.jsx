import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilePdf, FaBookmark, FaGlobe, FaBookOpen } from "react-icons/fa";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";

export default function EResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [activeSection, setActiveSection] = useState("All");

  const [resources, setResources] = useState([]);


  const user = JSON.parse(localStorage.getItem("user"));


  
 const toggleBookmark = (id) => {
  const userId = user.id;

  // If in "All" tab → Only allow adding bookmark
  if (activeTab === "all") {
    // Optimistically add bookmark
    setResources((prevResources) =>
      prevResources.map((res) =>
        res.id === id ? { ...res, bookmarked: 1 } : res
      )
    );

    axios
      .put(`http://localhost:5000/api/bookmarks/${id}/bookmark`, { user_id: userId })
      .then(() => {
        toast.success("Bookmarked!");
      })
      .catch(() => {
        toast.error("Failed to bookmark");
        fetchResources(); // Reset UI if failed
      });
  }

  // If in "Bookmarked" tab → Allow only removing bookmark
  if (activeTab === "bookmarked") {
    axios
      .put(`http://localhost:5000/api/bookmarks/${id}/bookmark`, { user_id: userId })
      .then(() => {
        toast.success("Bookmark removed!");

        // Immediately remove from UI
        setResources((prevResources) => prevResources.filter((res) => res.id !== id));
      })
      .catch(() => {
        toast.error("Failed to remove bookmark");
        fetchResources(); // Reset UI if failed
      });
  }
};




  

  const filteredResources = resources.filter((res) => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || res.type === typeFilter;
    const matchesTab = activeTab === "all" || (activeTab === "bookmarked" && res.bookmarked);
    const matchesSection = activeSection === "All" || res.section === activeSection;
    return matchesSearch && matchesType && matchesTab && matchesSection;
  });



  useEffect(() => {
  fetchResources();
}, [activeTab]);

  const fetchResources = () => {
    const url =
    activeTab === "bookmarked"
      ? `http://localhost:5000/api/bookmarks/bookmarked?user_id=${user.id}`
      : `http://localhost:5000/api`

  axios.get(url)
    .then((res) => {
      console.log(res);
      setResources(res.data);
    })
    .catch(() => toast.error("Failed to load resources"));
};



  return (
    <div className="w-full p-6 space-y-6 max-w-7xl ">
      {/* Heading */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-3xl font-bold text-[#1b365d] mb-2">E-Resources Library</h2>
        <p className="text-gray-600">Access Notes, eBooks, PYQs, Journals, PDFs, and more.</p>
      </motion.div>

      {/* Section Filters */}
      <div className="flex gap-3 flex-wrap">
        {["All", "Notes", "eBooks", "PYQs", "Journals"].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-lg text-md font-medium transition ${
              activeSection === section ? "bg-[#3a7ce1] text-white" : "bg-white shadow text-gray-700 hover:bg-[#dceafb]"
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mt-4">
        {["all", "bookmarked"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 rounded-lg text-md font-medium transition ${
              activeTab === tab ? "bg-[#3a7ce1] text-white" : "bg-white shadow text-gray-700 hover:bg-[#dceafb]"
            }`}
          >
            {tab === "all" ? "All Resources" : "Bookmarked"}
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 bg-white shadow p-3 rounded-lg w-full max-w-md">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search resources"
            className="flex-1 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 bg-white shadow rounded-lg border"
        >
          <option value="all">All Types</option>
          <option value="PDF">PDF</option>
          <option value="Research Paper">Research Paper</option>
          <option value="eBook">eBook</option>
        </select>
      </div>

      {/* Resource List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length === 0 ? (
          <p className="text-gray-500 col-span-full">No resources found.</p>
        ) : (
          filteredResources.map((res) => (
            <motion.div
              key={res.id}
              className="bg-white shadow-md p-5 rounded-lg flex flex-col gap-2 hover:shadow-lg transition h-full"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-[#1b365d]">{res.title}</h4>
                {res.type === "PDF" ? (
                  <FaFilePdf className="text-red-500" />
                ) : res.type === "Research Paper" ? (
                  <FaGlobe className="text-blue-500" />
                ) : (
                  <FaBookOpen className="text-green-500" />
                )}
              </div>
              <p className="text-gray-600 text-md">{res.description}</p>
              <span className="text-sm text-gray-500 italic">Section: {res.section}</span>
              <div className="flex gap-2 mt-auto">
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-3 py-1 text-center bg-[#3a7ce1] hover:bg-[#285dad] text-white rounded text-md"
                >
                  View / Download
                </a>
               <button
  onClick={() => {
    if (activeTab === "all" && res.bookmarked) return; // Disable unbookmark in 'all' tab
    toggleBookmark(res.id);
  }}
  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-md flex items-center gap-1"
>
  <FaBookmark className={`${res.bookmarked ? "text-yellow-500" : "text-gray-400"}`} />
  {res.bookmarked ? "Bookmarked" : "Bookmark"}
</button>

              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
