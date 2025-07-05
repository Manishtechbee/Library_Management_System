import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaSearch, FaBook, FaPlusCircle } from "react-icons/fa";

export default function RecommendBookPage({darkMode}) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    publisher: "",
    category: "",
    description: "",
    copies: 1,
  });
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);




  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const fetchRecommendations = () => {
  if (!user?.id) return;

  setLoadingRecommendations(true);
  fetch(`http://localhost:5000/api/faculty/recommended-books/${user.id}`)
    .then((res) => res.json())
    .then((data) => setRecommendations(data))
    .catch((err) => console.error(err))
    .finally(() => setLoadingRecommendations(false));
};
  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("Please log in to submit a recommendation.");
      return;
    }

    if (form.copies < 1) {
      toast.error("At least 1 copy is required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/faculty/recommend-book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, facultyId: user.id }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Book recommended successfully!");
        setForm({
          title: "",
          author: "",
          publisher: "",
          category: "",
          description: "",
          copies: 1,
        });
        fetchRecommendations();
        setActiveTab("my");
      } else {
        toast.error(data.message || "Failed to recommend book.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredRecommendations = recommendations.filter((rec) =>
    activeTab === "all"
      ? rec
      : activeTab === "pending"
      ? rec.status === "Pending"
      : activeTab === "approved"
      ? rec.status === "Approved"
      : activeTab === "rejected"
      ? rec.status === "Rejected"
      : rec
  ).filter((rec) =>
    rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <>
    {darkMode?(<div className="w-full space-y-6 max-w-6xl p-6 pl-10">
  {/* Heading */}
  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    <h2 className="text-3xl font-bold text-[#1b365d] dark:text-white mb-2">Book Recommendations</h2>
    <p className="text-gray-600 dark:text-gray-300">Recommend new books or track the status of your recommended books.</p>
  </motion.div>

  {/* Tabs */}
  <div className="flex flex-wrap gap-3 mt-4">
    {[
      { key: "all", label: "All Recommendations" },
      { key: "pending", label: "Pending" },
      { key: "approved", label: "Approved" },
      { key: "rejected", label: "Rejected" },
      { key: "recommend", label: "Recommend Book" },
    ].map((tab) => (
      <button
        key={tab.key}
        onClick={() => setActiveTab(tab.key)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
          activeTab === tab.key
            ? "bg-[#3a7ce1] text-white"
            : "bg-white dark:bg-gray-800 shadow text-gray-700 dark:text-gray-200 hover:bg-[#dceafb] dark:hover:bg-gray-700"
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>

  {/* Search Bar for list tabs */}
  {activeTab !== "recommend" && (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 shadow p-3 rounded-lg w-full max-w-md mt-4">
      <FaSearch className="text-gray-400" />
      <input
        type="text"
        placeholder="Search by title or author"
        className="flex-1 outline-none bg-transparent text-gray-800 dark:text-gray-200"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )}

  {/* Recommend Form */}
  {activeTab === "recommend" && (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-gray-800 shadow-md rounded-2xl  md:p-8 space-y-6 mt-4">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
        Recommend a New Book
      </h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {[
          { name: "title", label: "Book Title", placeholder: "Enter book title" },
          { name: "author", label: "Author", placeholder: "Enter author name" },
          { name: "publisher", label: "Publisher", placeholder: "Enter publisher name" },
          { name: "category", label: "Category", placeholder: "e.g. Science, Literature" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {field.label} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required
              placeholder={field.placeholder}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            placeholder="Optional description"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Copies <span className="text-red-500">*</span></label>
          <input
            type="number"
            name="copies"
            min="1"
            value={form.copies}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Recommendation"}
        </button>
      </form>
    </motion.div>
  )}

  {/* Recommendations List */}
  {activeTab !== "recommend" && (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      {loadingRecommendations ? (
        <p className="text-gray-500 dark:text-gray-300 mt-4">Loading recommendations...</p>
      ) : filteredRecommendations.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300 mt-4">No recommendations found.</p>
      ) : (
        filteredRecommendations.map((rec) => (
          <div key={rec.id} className="border dark:border-gray-600 p-4 rounded-md shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-3 bg-white dark:bg-gray-800">
            <div>
              <p className="font-medium text-lg text-gray-800 dark:text-gray-200">{rec.title} <span className="text-sm text-gray-500 dark:text-gray-400">by {rec.author}</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Publisher: {rec.publisher} | Category: {rec.category} | Copies: {rec.copies}</p>
              {rec.description && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{rec.description}</p>}
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Recommended on: {new Date(rec.createdAt).toLocaleDateString()}</p>
            </div>

            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              rec.status === "Approved" ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" :
              rec.status === "Rejected" ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300" :
              "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
            }`}>
              {rec.status}
            </span>
          </div>
        ))
      )}
    </motion.div>
  )}
</div>
):(<div className="w-full space-y-6 max-w-6xl p-6 pl-10 ">
      {/* Heading */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-3xl font-bold text-[#1b365d] mb-2">Book Recommendations</h2>
        <p className="text-gray-600">Recommend new books or track the status of your recommended books.</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mt-4">
        {[
          { key: "all", label: "All Recommendations" },
          { key: "pending", label: "Pending" },
          { key: "approved", label: "Approved" },
          { key: "rejected", label: "Rejected" },
          { key: "recommend", label: "Recommend Book" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab.key
                ? "bg-[#3a7ce1] text-white"
                : "bg-white shadow text-gray-700 hover:bg-[#dceafb]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar for list tabs */}
      {activeTab !== "recommend" && (
        <div className="flex items-center gap-3 bg-white shadow p-3 rounded-lg w-full max-w-md mt-4">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or author"
            className="flex-1 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Recommend Form */}
      {activeTab === "recommend" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white shadow-md rounded-2xl  md:p-8 space-y-6 mt-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
           Recommend a New Book
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {[
              { name: "title", label: "Book Title", placeholder: "Enter book title" },
              { name: "author", label: "Author", placeholder: "Enter author name" },
              { name: "publisher", label: "Publisher", placeholder: "Enter publisher name" },
              { name: "category", label: "Category", placeholder: "e.g. Science, Literature" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label} <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Optional description"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Copies <span className="text-red-500">*</span></label>
              <input
                type="number"
                name="copies"
                min="1"
                value={form.copies}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Recommendation"}
            </button>
          </form>
        </motion.div>
      )}

      {/* Recommendations List */}
      {activeTab !== "recommend" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          


            {loadingRecommendations ? (
  <p className="text-gray-500 mt-4">Loading recommendations...</p>
) : filteredRecommendations.length === 0 ? (
            <p className="text-gray-500 mt-4">No recommendations found.</p>
        
) : (

            filteredRecommendations.map((rec) => (
              <div key={rec.id} className="border p-4 rounded-md shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-3">
  <div>
    <p className="font-medium text-lg">{rec.title} <span className="text-sm text-gray-500">by {rec.author}</span></p>
    <p className="text-sm text-gray-500">Publisher: {rec.publisher} | Category: {rec.category} | Copies: {rec.copies}</p>
    {rec.description && <p className="mt-1 text-sm text-gray-600">{rec.description}</p>}
    <p className="text-xs text-gray-400 mt-1">Recommended on: {new Date(rec.createdAt).toLocaleDateString()}</p>
  </div>

  <span
    className={`text-xs px-3 py-1 rounded-full font-medium ${
      rec.status === "Approved" ? "bg-green-100 text-green-700" :
      rec.status === "Rejected" ? "bg-red-100 text-red-700" :
      "bg-yellow-100 text-yellow-700"
    }`}
  >
    {rec.status}
  </span>
</div>

            ))
          )}
        </motion.div>
      )}
    </div>)}</>
  );
}
