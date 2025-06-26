import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilePdf, FaBookmark, FaGlobe, FaBookOpen } from "react-icons/fa";

export default function EResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [activeSection, setActiveSection] = useState("All");

  const [resources, setResources] = useState([
  {
    id: 1,
    title: "Introduction to AI",
    type: "PDF",
    section: "Notes",
    description: "Beginner-friendly guide to Artificial Intelligence.",
    bookmarked: true,
    link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: 2,
    title: "Latest Research on Neural Networks",
    type: "Research Paper",
    section: "PYQs",
    description: "A comprehensive research publication on deep learning models.",
    bookmarked: false,
    link: "https://arxiv.org/pdf/2106.14899.pdf"
  },
  {
    id: 3,
    title: "Web Development Fundamentals",
    type: "eBook",
    section: "eBooks",
    description: "Complete eBook covering modern web development.",
    bookmarked: false,
    link: "https://www.hq.nasa.gov/alsj/a17/A17_FlightPlan.pdf"
  },
  {
    id: 4,
    title: "Python Basics Notes",
    type: "PDF",
    section: "Notes",
    description: "Concise notes for Python beginners.",
    bookmarked: false,
    link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: 5,
    title: "Science Journal - AI Edition",
    type: "Research Paper",
    section: "Journals",
    description: "Latest peer-reviewed journal on AI advancements.",
    bookmarked: false,
    link: "https://arxiv.org/pdf/2106.14899.pdf"
  }
]);


  const toggleBookmark = (id) => {
    setResources((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, bookmarked: !res.bookmarked } : res
      )
    );
  };

  const filteredResources = resources.filter((res) => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || res.type === typeFilter;
    const matchesTab = activeTab === "all" || (activeTab === "bookmarked" && res.bookmarked);
    const matchesSection = activeSection === "All" || res.section === activeSection;
    return matchesSearch && matchesType && matchesTab && matchesSection;
  });

  return (
    <div className="w-full p-6 space-y-6 max-w-7xl mx-auto">
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
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
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
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
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
              className="bg-white shadow-md p-4 rounded-lg flex flex-col gap-2 hover:shadow-lg transition h-full"
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
              <p className="text-gray-600 text-sm">{res.description}</p>
              <span className="text-xs text-gray-500 italic">Section: {res.section}</span>
              <div className="flex gap-2 mt-auto">
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-3 py-1 text-center bg-[#3a7ce1] hover:bg-[#285dad] text-white rounded text-sm"
                >
                  View / Download
                </a>
                <button
                  onClick={() => toggleBookmark(res.id)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm flex items-center gap-1"
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
