import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilePdf, FaBookmark, FaGlobe, FaBookOpen, FaPlus, FaClipboardList } from "react-icons/fa";

export default function EResourcesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const resources = [
    { id: 1, title: "AI for Beginners", type: "PDF", description: "Introductory guide", bookmarked: true, link: "#" },
    { id: 2, title: "Neural Network Research", type: "Research Paper", description: "Latest publication", bookmarked: false, link: "#" },
    { id: 3, title: "Web Dev Essentials", type: "eBook", description: "Comprehensive guide", bookmarked: false, link: "#" }
  ];

  const downloadHistory = [
    { id: 1, title: "Data Structures PDF", date: "25 June 2024" },
    { id: 2, title: "ML Research Paper", date: "20 June 2024" }
  ];

  const filteredResources = resources.filter(res =>
    res.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeTab === "all" || (activeTab === "bookmarked" && res.bookmarked))
  );

  return (
    <div className="w-full p-6 space-y-6 max-w-7xl mx-auto">

      {/* Heading */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-3xl font-bold text-[#1b365d] mb-2">E-Resources Library</h2>
        <p className="text-gray-600">Explore, bookmark, and recommend resources.</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mt-4">
        {[
          { key: "all", label: "All Resources" },
          { key: "bookmarked", label: "Bookmarked" },
          { key: "history", label: "Download History" },
          { key: "recommend", label: "Recommend Resource" },
          { key: "admin", label: "Manage Resources" } // Show conditionally based on role
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab.key ? "bg-[#3a7ce1] text-white" : "bg-white shadow text-gray-700 hover:bg-[#dceafb]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === "all" || activeTab === "bookmarked" ? (
        <>
          {/* Search */}
          <div className="flex items-center gap-3 bg-white shadow p-3 rounded-lg w-full max-w-md mt-4">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search resources"
              className="flex-1 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredResources.length === 0 ? (
              <p className="text-gray-500 col-span-full">No resources found.</p>
            ) : (
              filteredResources.map(res => (
                <motion.div
                  key={res.id}
                  className="bg-white shadow-md p-4 rounded-lg flex flex-col gap-2 hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-[#1b365d]">{res.title}</h4>
                    {res.type === "PDF" ? <FaFilePdf className="text-red-500" /> : res.type === "Research Paper" ? <FaGlobe className="text-blue-500" /> : <FaBookOpen className="text-green-500" />}
                  </div>
                  <p className="text-gray-600 text-sm">{res.description}</p>
                  <div className="flex gap-2 mt-2">
                    <a href={res.link} target="_blank" rel="noopener noreferrer" className="flex-1 px-3 py-1 text-center bg-[#3a7ce1] hover:bg-[#285dad] text-white rounded text-sm">
                      View / Download
                    </a>
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm flex items-center gap-1">
                      <FaBookmark className={`${res.bookmarked ? "text-yellow-500" : "text-gray-400"}`} />
                      {res.bookmarked ? "Bookmarked" : "Bookmark"}
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </>
      ) : null}

      {/* Download History Tab */}
      {activeTab === "history" && (
        <div className="bg-white shadow p-4 rounded-lg mt-4 space-y-4">
          <h3 className="text-lg font-semibold text-[#1b365d] flex items-center gap-2"><FaClipboardList /> Download History</h3>
          {downloadHistory.length === 0 ? (
            <p className="text-gray-500">No downloads yet.</p>
          ) : (
            <ul className="space-y-2 text-gray-700 text-sm">
              {downloadHistory.map(d => (
                <li key={d.id}>⬇️ {d.title} — {d.date}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Recommend Resource Tab */}
      {activeTab === "recommend" && (
        <div className="bg-white shadow p-4 rounded-lg mt-4 space-y-4">
          <h3 className="text-lg font-semibold text-[#1b365d] flex items-center gap-2"><FaPlus /> Recommend a Resource</h3>
          <form className="space-y-3">
            <input type="text" placeholder="Resource Title" className="w-full p-2 border rounded" />
            <input type="text" placeholder="Type (PDF, Journal, etc.)" className="w-full p-2 border rounded" />
            <textarea placeholder="Brief Description" className="w-full p-2 border rounded" rows={3} />
            <button type="submit" className="px-4 py-2 bg-[#3a7ce1] text-white rounded hover:bg-[#285dad]">Submit Recommendation</button>
          </form>
        </div>
      )}

      {/* Admin Manage Resources (Only show if admin) */}
      {activeTab === "admin" && (
        <div className="bg-white shadow p-4 rounded-lg mt-4 space-y-4">
          <h3 className="text-lg font-semibold text-[#1b365d]">Manage Resources (Admin)</h3>
          <p className="text-gray-500 text-sm">Admin can add, edit, or remove resources here.</p>
          {/* Add your resource management UI here */}
        </div>
      )}
    </div>
  );
}
