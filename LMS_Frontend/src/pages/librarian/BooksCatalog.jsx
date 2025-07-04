import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaBook } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-toastify';


export default function BooksCatalog() {
  
  const user = JSON.parse(localStorage.getItem("user"));
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
  setLoading(true);



  

axios.get("http://localhost:5000/api/books")
  .then(async (res) => {
    const booksWithImages = await Promise.all(res.data.map(async (book) => {
      try {
        const googleRes = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(book.title)}+inauthor:${encodeURIComponent(book.author)}&maxResults=1`
        );

        const googleBook = googleRes.data.items?.[0]?.volumeInfo || {};
        const accessInfo = googleRes.data.items?.[0]?.accessInfo || {};

        const image = googleBook.imageLinks?.thumbnail || `https://picsum.photos/200/300?random=${book.id}`;
        const ebookLink = accessInfo.webReaderLink || book.ebook_link || "";
        const description = googleBook.description || book.description || "";


        return {
          id: book.id,
          title: book.title,
          author: book.author,
          category: book.category || "General",
          available: book.available_copies > 0,
          image: image,
          description:description? description: "No description available for this book.",
          ebook_link: ebookLink,
          edition: book.edition || "N/A",
          publisher: book.publisher || "Unknown",
          year: book.publication_year || "Unknown",
          branch: "All",
          department: "General",
          copies: book.total_copies || 0
        };
      } catch (err) {
        console.error("Error fetching image or ebook for", book.title, err);
        toast.error(`Error fetching details for "${book.title}"`);
        return {
          ...book,
          image: `https://picsum.photos/200/300?random=${book.id}`,
          ebook_link: book.ebook_link || "",
          description: book.description || ""
        };
      }
    }));

    setBooks(booksWithImages);
  })
  .catch(err => {
    console.error(err);
    toast.error("Failed to fetch books from backend");
  })
  .finally(() => setLoading(false));


}, []);


 {/* // Fetch real books from Google Books API
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
    .catch(err => console.error(err));*/}




  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability = availabilityFilter === "all" ||
      (availabilityFilter === "available" && book.available) ||
      (availabilityFilter === "not_available" && !book.available);
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter;
    return matchesSearch && matchesAvailability && matchesCategory;
  });

  const handleIssue = (book) => {
  axios.post("http://localhost:5000/api/request-issue", {
    book_id: book.id,
    user_id: user.id
  })
  .then(res => {
    toast.success(res.data.message || "Issue request submitted successfully!");
  })
  .catch(err => {
    console.error(err);
    toast.error("Failed to request issue. Please try again.");
  });
};


const [selectedBook, setSelectedBook] = useState(null);
useEffect(() => {
  if (selectedBook) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [selectedBook]);




  return (
    <div className="w-full space-y-6">

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
    <div
      key={i}
      className="bg-white shadow-md p-4 rounded-lg flex flex-col gap-3 animate-pulse"
    >
      <div className="w-80 mt-3 mx-auto justify-center h-50 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-1/4" />
      <div className="flex gap-2 mt-4">
        <div className="h-8 bg-gray-200 rounded w-1/2" />
        <div className="h-8 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  ))
) :  (
          filteredBooks.slice(0, visibleCount).map(book => (
            <motion.div
  key={book.id}
  className="bg-white shadow-md p-4 rounded-lg flex flex-col gap-2 hover:shadow-lg transition cursor-pointer"
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  onClick={() => setSelectedBook(book)}
>

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

  <div className="mt-auto flex gap-2">

  <button
  
      
    onClick={(e) => {
      e.stopPropagation(); handleIssue(book);
      if (book.available) {
        handleIssue(book);
      } else {
        toast.error(`"${book.title}" is currently not available`);
      }
    }}
    className={`flex-1 px-3 py-1 rounded-md text-sm transition shadow-sm ${
      book.available
        ? 'bg-[#5F97CD] hover:bg-[#3a7ce1] text-white'
        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
    }`}
  >
    Request Issue
  </button>

  <button
    onClick={(e) => {
      e.stopPropagation(); handleIssue(book);
      if (book.ebook_link) {
        window.open(book.ebook_link, '_blank', 'noopener noreferrer');
      } else {
        toast.error(`No E-Book available for "${book.title}"`);
      }
    }}
    className={`flex-1 px-3 py-1 rounded-md text-sm transition shadow-sm ${
      book.ebook_link
        ? 'bg-[#A8C7F0] hover:bg-[#8BB6E8] text-[#1b365d]'
        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
    }`}
  >
    View E-Book
  </button>

</div>



</motion.div>

          ))
        )}
      </div>

      {visibleCount < filteredBooks.length && (
        <div className="text-center">
          <button onClick={() => setVisibleCount(visibleCount + 6)} className="px-4 py-2 bg-[#5F97CD] hover:bg-[#3a7ce1] text-white rounded-lg">Load More</button>
        </div>
      )}





      {selectedBook && (
  <>
    {/* Dark Transparent Inaccessible Background */}
    <div
      className="fixed inset-0 p-0 m-0 bg-gray-900 opacity-40 z-30"
      onClick={() => setSelectedBook(null)}
    ></div>
    {/* Centered Professional Description Card */}
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-11/12 max-w-lg relative border border-gray-200 max-h-[80vh] overflow-y-auto" 
      onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedBook(null)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        

        {/* Book Info */}
        <h2 className="text-2xl font-bold text-[#1b365d] mb-1">{selectedBook.title}</h2>
        <p className="text-sm text-gray-500 mb-4">by {selectedBook.author}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-600 text-sm"><span className="font-medium">Category:</span> {selectedBook.category}</p>
            <p className="text-gray-600 text-sm"><span className="font-medium">Edition:</span> {selectedBook.edition}</p>
            <p className="text-gray-600 text-sm"><span className="font-medium">Publisher:</span> {selectedBook.publisher}</p>
            <p className="text-gray-600 text-sm"><span className="font-medium">Year:</span> {selectedBook.year}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm"><span className="font-medium">Available Copies:</span> {selectedBook.copies}</p>
            <p className="text-gray-600 text-sm"><span className="font-medium">Availability:</span> {selectedBook.available ? "Available" : "Not Available"}</p>
          </div>
        </div>

        {/* Description from Backend */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-700 mb-1">Description</h3>
          <p className="text-gray-600 text-sm">
            {selectedBook.description || "No description available for this book."}
          </p>
        </div>


      </div>
      
    </div>
    
  </>
)}

    </div>
  );
}
