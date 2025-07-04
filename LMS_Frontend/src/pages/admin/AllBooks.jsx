import { useState, useEffect } from "react";
import { FaBook, FaPlus, FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "axios";
import BooksCatalog from "./BooksCatalog";

export default function BooksManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filterType, setFilterType] = useState(""); 
const [filterValue, setFilterValue] = useState(""); 



  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Add Book form states
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [edition, setEdition] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [ebookLink, setEbookLink] = useState("");
  const [totalCopies, setTotalCopies] = useState(1);
  const [coverImage, setCoverImage] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editBookData, setEditBookData] = useState(null);

useEffect(() => {
  fetchBooks();
  fetch("http://localhost:5000/api/admin/categories")
    .then((res) => res.json())
    .then(setCategories)
    .catch(console.error);

  fetch("http://localhost:5000/api/admin/publishers")
    .then((res) => res.json())
    .then(setPublishers)
    .catch(console.error);
}, []);
const fetchBooks = () => {
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
          const description = googleBook.description || book.description || "No description available.";

          return {
            ...book,
            image,
            ebook_link: ebookLink,
            description,
          };
        } catch (err) {
          console.error("Error fetching Google details for:", book.title, err);
          return {
            ...book,
            image: `https://picsum.photos/200/300?random=${book.id}`,
            ebook_link: book.ebook_link || "",
            description: book.description || "No description available.",
          };
        }
      }));

      setBooks(booksWithImages);
    })
    .catch((err) => {
      console.error(err);
      toast.error("Failed to fetch books");
    });
};




  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!title || !author || !categoryId || !publisherId || !year || !totalCopies) {
      toast.error("Please fill all required fields");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("categoryId", categoryId);
    formData.append("publisherId", publisherId);
    formData.append("edition", edition);
    formData.append("year", year);
    formData.append("language", language);
    formData.append("description", description);
    formData.append("ebookLink", ebookLink);
    formData.append("totalCopies", totalCopies);
    if (coverImage) formData.append("coverImage", coverImage);

    try {
      await axios.post("http://localhost:5000/api/admin/books", formData);
      toast.success("Book added successfully");
      fetchBooks();
      resetForm();
      setActiveTab("all");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add book");
    }
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setCategoryId("");
    setPublisherId("");
    setEdition("");
    setYear("");
    setLanguage("");
    setDescription("");
    setEbookLink("");
    setTotalCopies(1);
    setCoverImage(null);
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this book?")) return;
  try {
    await axios.delete(`http://localhost:5000/api/admin/books/${id}`);
    toast.success("Book deleted successfully");
    fetchBooks();
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to delete book");
  }
};


  const openEditModal = (book) => {
    setEditBookData(book);
    setShowEditModal(true);
  };

 const filteredBooks = books.filter((book) => {
  const matchesSearch =
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase());

  let matchesFilter = true;

  if (filterType === "category" && filterValue) {
    matchesFilter = book.category === filterValue;
  } else if (filterType === "publisher" && filterValue) {
    matchesFilter = book.publisher === filterValue;
  } else if (filterType === "year" && filterValue) {
    matchesFilter = String(book.year) === filterValue;
  }

  return matchesSearch && matchesFilter;
});
 const handleUpdateBook = async () => {
  const formData = new FormData();
  formData.append("title", editBookData.title);
  formData.append("author", editBookData.author);
  formData.append("edition", editBookData.edition);
  formData.append("year", editBookData.year);
  formData.append("language", editBookData.language);
  formData.append("description", editBookData.description);
  formData.append("ebookLink", editBookData.ebook_link);
  formData.append("totalCopies", editBookData.total_copies);
  
  if (coverImage) formData.append("coverImage", coverImage);

  try {
    await axios.put(`http://localhost:5000/api/admin/books/${editBookData.id}`, formData);
    toast.success("Book updated successfully");
    setShowEditModal(false);
    fetchBooks();
  } catch (err) {
    toast.error("Failed to update book");
    console.error(err);
  }
};



  return (
    <div className="w-full p-6 space-y-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-3xl font-bold text-[#1b365d] mb-2">Books Management</h2>
        <p className="text-gray-600">Add, manage, and track your library books efficiently.</p>
      </motion.div>

      <div className="flex gap-3 flex-wrap">
        <button onClick={() => setActiveTab("book")} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "book" ? "bg-[#3a7ce1] text-white" : "bg-white shadow text-gray-700 hover:bg-[#dceafb]"}`}>Books Catalog</button>
        <button onClick={() => setActiveTab("all")} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "all" ? "bg-[#3a7ce1] text-white" : "bg-white shadow text-gray-700 hover:bg-[#dceafb]"}`}>All Books</button>
        <button onClick={() => setActiveTab("add")} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "add" ? "bg-[#3a7ce1] text-white" : "bg-white shadow text-gray-700 hover:bg-[#dceafb]"}`}>Add Book</button>
      </div>


      {activeTab==="book" && <BooksCatalog />}
      {activeTab === "all" && (
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-3 bg-white shadow p-3 rounded-lg w-full max-w-md">
              <FaSearch className="text-gray-400" />
              <input type="text" placeholder="Search books" className="flex-1 outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            
  <select
    value={filterType}
    onChange={(e) => {
      setFilterType(e.target.value);
      setFilterValue(""); 
    }}
    className="p-2 bg-white shadow rounded-lg border"
  >
    <option value="">Filter By...</option>
    <option value="category">Category</option>
    <option value="publisher">Publisher</option>
    <option value="year">Year</option>
  </select>

  {filterType === "category" && (
    <select
      value={filterValue}
      onChange={(e) => setFilterValue(e.target.value)}
      className="p-2 bg-white shadow rounded-lg border"
    >
      <option value="">All Categories</option>
      {categories.map((c) => (
        <option key={c.id} value={c.name}>{c.name}</option>
      ))}
    </select>
  )}

  {filterType === "publisher" && (
    <select
      value={filterValue}
      onChange={(e) => setFilterValue(e.target.value)}
      className="p-2 bg-white shadow rounded-lg border"
    >
      <option value="">All Publishers</option>
      {publishers.map((p) => (
        <option key={p.id} value={p.name}>{p.name}</option>
      ))}
    </select>
  )}

  {filterType === "year" && (
    <input
      type="number"
      placeholder="Enter Year"
      value={filterValue}
      onChange={(e) => setFilterValue(e.target.value)}
      className="p-2 bg-white shadow rounded-lg border w-32"
    />
  )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg text-sm">
              <thead>
  <tr className="bg-[#f0f4fa] text-gray-700">
    <th className="p-3">Cover</th>
    <th className="p-3">Title</th>
    <th className="p-3">Author</th>
    <th className="p-3">Category</th>
    <th className="p-3">Publisher</th>
    <th className="p-3">Edition</th>
    <th className="p-3">Year</th>
    <th className="p-3">Total Copies</th>
    <th className="p-3">Borrowed</th>
    <th className="p-3">Available</th>
    <th className="p-3">Status</th>
    <th className="p-3">eBook</th>
    <th className="p-3">Actions</th>
  </tr>
</thead>
<tbody>
  {filteredBooks.map((book, index) => (
    <tr key={book.id}
  className={`${index % 2 === 0 ? "bg-white" : "bg-[#f9fbfd]"} hover:bg-[#eef3fa] transition cursor-pointer`}
   >
      <td className="p-3">
        <img src={book.image} alt="cover" className="w-12 h-12 object-cover rounded shadow" onClick={() => setSelectedBook(book)} />

      </td>
      <td className="p-3 font-medium text-[#1b365d]">{book.title}</td>
      <td className="p-3">{book.author}</td>
      <td className="p-3">{book.category}</td>
      <td className="p-3">{book.publisher}</td>
      <td className="p-3">{book.edition}</td>
      <td className="p-3">{book.year}</td>
      <td className="p-3">{book.total_copies}</td>
      <td className="p-3">{book.borrowed_copies}</td>
      <td className="p-3">{book.available_copies}</td>
      <td className="p-3">
        <span className={`px-2 py-1 rounded text-sm ${book.book_status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {book.book_status}
        </span>
      </td>
      <td className="p-3">
        {book.ebook_link ? (
          <a href={book.ebook_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
        ) : (
          "-"
        )}
      </td>
      <td className="p-3 flex gap-2">
        <button onClick={(e) => {e.stopPropagation();
          openEditModal(book);}} className="px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm flex items-center gap-1"><FaEdit /> Edit</button>
        <button onClick={() => {e.stopPropagation();
          handleDelete(book.id);}} className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm flex items-center gap-1"><FaTrash /> Delete</button>
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>
        </motion.div>
      )}

      {activeTab === "add" && (
  <>
    <div className="fixed inset-0 bg-gray-900 opacity-40 z-30" onClick={() => setActiveTab("all")}></div>

    <div className="fixed inset-0 flex justify-center items-center z-50">
      <motion.form
        onSubmit={handleAddBook}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="space-y-4 max-w-xl w-11/12 bg-white p-6 rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={() => setActiveTab("all")}
          type="button"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <h3 className="text-2xl font-bold text-[#1b365d] mb-4">Add New Book</h3>

        <input
          type="text"
          placeholder="Title*"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />

        <input
          type="text"
          placeholder="Author*"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="p-2 border rounded w-full"
          required
        >
          <option value="">Select Category*</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={publisherId}
          onChange={(e) => setPublisherId(e.target.value)}
          className="p-2 border rounded w-full"
          required
        >
          <option value="">Select Publisher*</option>
          {publishers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Edition"
          value={edition}
          onChange={(e) => setEdition(e.target.value)}
          className="p-2 border rounded w-full"
        />

        <input
          type="number"
          placeholder="Year*"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />

        <input
          type="text"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded w-full"
        />

        <input
          type="number"
          placeholder="Total Copies*"
          value={totalCopies}
          onChange={(e) => setTotalCopies(e.target.value)}
          className="p-2 border rounded w-full"
          min="1"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded w-full"
          rows="3"
        />

        <input
          type="text"
          placeholder="E-Book Link (optional)"
          value={ebookLink}
          onChange={(e) => setEbookLink(e.target.value)}
          className="p-2 border rounded w-full"
        />

        <div>
  <label className="block text-gray-700 font-medium mb-1">Cover Image</label>
  <div className="flex items-center gap-3">
    <label className="cursor-pointer bg-[#3a7ce1] text-white px-4 py-2 rounded hover:bg-[#285dad]">
      Choose File
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCoverImage(e.target.files[0])}
        className="hidden"
      />
    </label>
    <span className="text-sm text-gray-600">
      {coverImage ? coverImage.name : "No file chosen"}
    </span>
  </div>
</div>


        <button
          type="submit"
          className="flex items-center gap-2 bg-[#3a7ce1] text-white px-4 py-2 rounded hover:bg-[#285dad] w-full justify-center"
        >
          <FaPlus /> Add Book
        </button>
      </motion.form>
    </div>
  </>
)}


      {selectedBook && (
  <>
    <div
      className="fixed inset-0 bg-gray-900 opacity-40 z-30"
      onClick={() => setSelectedBook(null)}
    ></div>

    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-11/12 max-w-lg relative border border-gray-200 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSelectedBook(null)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>

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
            <p className="text-gray-600 text-sm"><span className="font-medium">Available Copies:</span> {selectedBook.available_copies}</p>
            <p className="text-gray-600 text-sm"><span className="font-medium">Availability:</span> {selectedBook.book_status}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-gray-700 mb-1">Description</h3>
          <p className="text-gray-600 text-sm">
            {selectedBook.description || "No description available for this book."}
          </p>
        </div>

        {selectedBook.ebook_link && (
          <a
            href={selectedBook.ebook_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-4 py-2 bg-[#5F97CD] text-white rounded hover:bg-[#3a7ce1]"
          >
            View E-Book
          </a>
        )}
      </div>
    </div>
  </>
)}


{showEditModal && editBookData && (
  <>
    <div className="fixed inset-0 bg-gray-900 opacity-40 z-30" onClick={() => setShowEditModal(false)}></div>

    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={() => setShowEditModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl">
          &times;
        </button>

        <h2 className="text-2xl font-bold text-[#1b365d] mb-4">Edit Book Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Title</label>
            <input
              type="text"
              value={editBookData.title}
              onChange={(e) => setEditBookData({ ...editBookData, title: e.target.value })}
              className="p-2 border rounded w-full focus:ring-2 focus:ring-[#3a7ce1]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Author</label>
            <input
              type="text"
              value={editBookData.author}
              onChange={(e) => setEditBookData({ ...editBookData, author: e.target.value })}
              className="p-2 border rounded w-full focus:ring-2 focus:ring-[#3a7ce1]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Edition</label>
            <input
              type="text"
              value={editBookData.edition}
              onChange={(e) => setEditBookData({ ...editBookData, edition: e.target.value })}
              className="p-2 border rounded w-full focus:ring-2 focus:ring-[#3a7ce1]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Publication Year</label>
            <input
              type="number"
              value={editBookData.year}
              onChange={(e) => setEditBookData({ ...editBookData, year: e.target.value })}
              className="p-2 border rounded w-full focus:ring-2 focus:ring-[#3a7ce1]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Language</label>
            <input
              type="text"
              value={editBookData.language}
              onChange={(e) => setEditBookData({ ...editBookData, language: e.target.value })}
              className="p-2 border rounded w-full focus:ring-2 focus:ring-[#3a7ce1]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Total Copies</label>
            <input
              type="number"
              value={editBookData.total_copies}
              onChange={(e) => setEditBookData({ ...editBookData, total_copies: e.target.value })}
              className="p-2 border rounded w-full focus:ring-2 focus:ring-[#3a7ce1]"
              min="1"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">Description</label>
          <textarea
            rows="3"
            value={editBookData.description}
            onChange={(e) => setEditBookData({ ...editBookData, description: e.target.value })}
            className="p-2 border rounded w-full focus:ring-2 focus:ring-[#3a7ce1]"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">E-Book Link</label>
          <input
            type="text"
            value={editBookData.ebook_link}
            onChange={(e) => setEditBookData({ ...editBookData, ebook_link: e.target.value })}
            className="p-2 border rounded w-full focus:ring-2 focus:ring-[#3a7ce1]"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">Cover Image</label>
          {editBookData.image && (
            <img src={editBookData.image} alt="Cover Preview" className="w-24 h-32 object-cover mb-2 rounded shadow" />
          )}
         <div>
  <label className="block text-gray-700 font-medium mb-1">Cover Image</label>
  <div className="flex items-center gap-3">
    <label className="cursor-pointer bg-[#3a7ce1] text-white px-4 py-2 rounded hover:bg-[#285dad]">
      Choose File
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
  setEditBookData({ ...editBookData, newCoverImage: e.target.files[0] })
}
        className="hidden"
      />
    </label>
    <span className="text-sm text-gray-600">
      {coverImage ? coverImage.name : "No file chosen"}
    </span>
  </div>
</div>

         
        </div>
        


        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowEditModal(false)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => handleUpdateBook()}
            className="px-4 py-2 bg-[#3a7ce1] text-white rounded hover:bg-[#285dad]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </>
)}


    </div>
  );
}

