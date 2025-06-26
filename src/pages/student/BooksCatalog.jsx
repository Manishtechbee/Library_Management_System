import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaBook } from "react-icons/fa";
import axios from "axios";

export default function BooksCatalog() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
  setLoading(true);

  // Fetch dummy books first (existing logic)
  axios.get("https://dummyjson.com/products?limit=30")
    .then(res => {
      const dummyBooks = res.data.products.map(p => ({
        id: p.id,
        title: p.title,
        author: "Author Name",
        category: "Programming",
        available: Math.random() > 0.3,
        image: p.thumbnail,  // Use dummy image
        edition: "1st",
        publisher: "Dummy Publisher",
        year: "2023",
        branch: "CSE",
        department: "Engineering",
        copies: Math.floor(Math.random() * 10) + 1
      }));
      setBooks(dummyBooks);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));

  // Fetch real books from Google Books API
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=20`)
    .then(res => {
      const apiBooks = res.data.items.map((item, index) => ({
        id: "google-" + index,
        title: item.volumeInfo.title || "Unknown Title",
        author: (item.volumeInfo.authors && item.volumeInfo.authors.join(", ")) || "Unknown",
        category: item.volumeInfo.categories ? item.volumeInfo.categories[0] : "General",
        available: Math.random() > 0.3,
        image: item.volumeInfo.imageLinks?.thumbnail || "",
        edition: item.volumeInfo.contentVersion || "N/A",
        publisher: item.volumeInfo.publisher || "Unknown",
        year: item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate.substring(0, 4) : "Unknown",
        branch: "All",
        department: "General",
        copies: Math.floor(Math.random() * 5) + 1
      }));
      setBooks(prev => [...apiBooks, ...prev]);  // Combine real + dummy data
    })
    .catch(err => console.error(err));

}, []);


  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability = availabilityFilter === "all" ||
      (availabilityFilter === "available" && book.available) ||
      (availabilityFilter === "not_available" && !book.available);
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter;
    return matchesSearch && matchesAvailability && matchesCategory;
  });

  const handleIssue = (book) => {
    alert(`Issue request for: ${book.title}`);
    // Here, you'd make a POST request to your backend to request issuing the book
  };

  return (
    <div className="w-full p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-3xl font-bold text-[#1b365d] mb-2">Book Catalog</h2>
      </motion.div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 bg-white shadow p-3 rounded-lg w-full max-w-md">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by title"
            className="flex-1 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)} className="p-2 bg-white shadow rounded-lg border">
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="not_available">Not Available</option>
        </select>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="p-2 bg-white shadow rounded-lg border">
          <option value="all">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="AI">AI</option>
          <option value="Psychology">Psychology</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white shadow-md p-4 rounded-lg animate-pulse h-32" />
          ))
        ) : (
          filteredBooks.slice(0, visibleCount).map(book => (
            <motion.div key={book.id} className="bg-white shadow-md p-4 rounded-lg flex flex-col gap-2 hover:shadow-lg transition" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
  
  {book.image && <img src={book.image} alt={book.title} className="w-full h-40 object-contain mb-2" />}
  
  <div className="flex items-center justify-between">
    <h4 className="text-lg font-semibold text-[#1b365d]">{book.title}</h4>
    <FaBook className="text-[#5F97CD]" />
  </div>
  
  <p className="text-gray-600 text-sm">Author: {book.author}</p>
  <p className="text-gray-600 text-sm">Category: {book.category}</p>
  <p className="text-gray-600 text-sm">Edition: {book.edition}</p>
  <p className="text-gray-600 text-sm">Publisher: {book.publisher}</p>
  <p className="text-gray-600 text-sm">Year: {book.year}</p>
  <p className="text-gray-600 text-sm">Branch: {book.branch}</p>
  <p className="text-gray-600 text-sm">Department: {book.department}</p>
  <p className="text-gray-600 text-sm">Copies: {book.copies}</p>

  <p className={`text-sm font-medium ${book.available ? "text-green-600" : "text-red-500"}`}>
    {book.available ? "Available" : "Not Available"}
  </p>

  {book.available && (
    <button onClick={() => handleIssue(book)} className="mt-2 bg-[#5F97CD] hover:bg-[#3a7ce1] text-white px-3 py-1 rounded text-sm">
      Request Issue
    </button>
  )}
</motion.div>

          ))
        )}
      </div>

      {visibleCount < filteredBooks.length && (
        <div className="text-center">
          <button onClick={() => setVisibleCount(visibleCount + 6)} className="px-4 py-2 bg-[#5F97CD] hover:bg-[#3a7ce1] text-white rounded-lg">Load More</button>
        </div>
      )}
    </div>
  );
}
