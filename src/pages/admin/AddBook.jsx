import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddBook() {
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

  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);

    fetch("http://localhost:5000/api/admin/publishers")
      .then((res) => res.json())
      .then(setPublishers)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
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
      // reset form
      setTitle(""); setAuthor(""); setCategoryId(""); setPublisherId(""); setEdition(""); setYear(""); setLanguage(""); setDescription(""); setEbookLink(""); setTotalCopies(1); setCoverImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-[#1b365d]">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Title*" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 border rounded" />
          <input type="text" placeholder="Author*" value={author} onChange={(e) => setAuthor(e.target.value)} className="p-2 border rounded" />
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="p-2 border rounded">
            <option value="">Select Category*</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={publisherId} onChange={(e) => setPublisherId(e.target.value)} className="p-2 border rounded">
            <option value="">Select Publisher*</option>
            {publishers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <input type="text" placeholder="Edition" value={edition} onChange={(e) => setEdition(e.target.value)} className="p-2 border rounded" />
          <input type="number" placeholder="Year*" value={year} onChange={(e) => setYear(e.target.value)} className="p-2 border rounded" />
          <input type="text" placeholder="Language" value={language} onChange={(e) => setLanguage(e.target.value)} className="p-2 border rounded" />
          <input type="number" placeholder="Total Copies*" value={totalCopies} onChange={(e) => setTotalCopies(e.target.value)} className="p-2 border rounded" min="1" />
        </div>

        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" rows="3" />

        <input type="text" placeholder="E-Book Link (optional)" value={ebookLink} onChange={(e) => setEbookLink(e.target.value)} className="w-full p-2 border rounded" />

        <div>
          <label className="block mb-1">Cover Image (optional):</label>
          <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} />
        </div>

        <button type="submit" className="flex items-center gap-2 bg-[#3a7ce1] text-white px-4 py-2 rounded hover:bg-[#285dad]">
          <FaPlus /> Add Book
        </button>
      </form>
    </div>
  );
}