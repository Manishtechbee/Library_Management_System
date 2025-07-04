{
  /*import { useState, useEffect } from "react";
import { FaBook, FaCalendarAlt, FaClock, FaSearch } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function IssuedBooks() {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const today = new Date();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/my-issued-books")
      .then((res) => setIssuedBooks(res.data))
      .catch(() => toast.error("Failed to load issued books"))
      .finally(() => setLoading(false));
  }, []);

  const filteredBooks = issuedBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const isOverdue = new Date(book.dueDate) < today;
    const dueIn3Days =
      new Date(book.dueDate) - today <= 3 * 24 * 60 * 60 * 1000 &&
      new Date(book.dueDate) >= today;

    if (filter === "overdue" && !isOverdue) return false;
    if (filter === "dueSoon" && !dueIn3Days) return false;

    return matchesSearch;
  });

  const handleRenewRequest = (id) => {
    axios
      .post(`http://localhost:5000/api/request-renewal/${id}`)
      .then(() => {
        toast.success("Renewal requested successfully");
        setIssuedBooks((prev) =>
          prev.map((book) =>
            book.id === id ? { ...book, renewalRequested: true } : book
          )
        );
      })
      .catch(() => toast.error("Failed to request renewal"));
  };

  const handleReturn = (id) => {
    if (confirm("Are you sure you want to mark this book as returned?")) {
      axios
        .post(`http://localhost:5000/api/mark-returned/${id}`)
        .then(() => {
          toast.success("Book marked as returned");
          setIssuedBooks((prev) =>
            prev.map((book) =>
              book.id === id ? { ...book, returned: true } : book
            )
          );
        })
        .catch(() => toast.error("Failed to mark as returned"));
    }
  };

  const overdueCount = issuedBooks.filter(
    (book) => new Date(book.dueDate) < today && !book.returned
  ).length;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">My Issued Books</h2>

      <div className="flex flex-wrap items-center gap-4">
        <div className="text-gray-700">
          Total Issued: {issuedBooks.length} | Overdue: {overdueCount}
        </div>

        <div className="flex items-center gap-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by title or author"
            className="border px-2 py-1 rounded text-sm focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1 rounded text-sm focus:outline-none"
        >
          <option value="all">All Books</option>
          <option value="overdue">Overdue Only</option>
          <option value="dueSoon">Due in 3 Days</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500 mt-4">Loading issued books...</p>
      ) : filteredBooks.length === 0 ? (
        <p className="text-gray-600 mt-4">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredBooks.map((book) => {
            const dueDate = new Date(book.dueDate);
            const isOverdue = dueDate < today;
            const dueIn3Days =
              dueDate - today <= 3 * 24 * 60 * 60 * 1000 && dueDate >= today;

            return (
              <div
                key={book.id}
                className="p-4 rounded border border-gray-300 bg-white shadow-sm flex flex-col gap-2"
              >
                <div className="flex items-center gap-3 mb-1">
                  <FaBook className="text-gray-600" />
                  <h3 className="text-lg font-medium text-gray-800">
                    {book.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-700">Author: {book.author}</p>
                <div className="flex items-center text-sm text-gray-600 gap-2">
                  <FaCalendarAlt />
                  <span>
                    Issued On: {new Date(book.issueDate).toLocaleDateString()}
                  </span>
                </div>
                <div
                  className={`flex items-center text-sm gap-2 ${
                    isOverdue
                      ? "text-red-600"
                      : dueIn3Days
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }`}
                >
                  <FaClock />
                  <span>Due Date: {dueDate.toLocaleDateString()}</span>
                </div>

                {book.returned ? (
                  <span className="text-sm text-gray-500 italic">Returned</span>
                ) : (
                  <div className="flex gap-2 mt-2">
                    {!book.renewalRequested && !isOverdue && (
                      <button
                        onClick={() => handleRenewRequest(book.id)}
                        className="px-3 py-1 border text-sm rounded hover:bg-gray-100"
                      >
                        Request Renewal
                      </button>
                    )}

                    {book.renewalRequested && (
                      <span className="text-sm text-gray-500 italic">
                        Renewal Requested
                      </span>
                    )}

                    <button
                      onClick={() => handleReturn(book.id)}
                      className="px-3 py-1 border text-sm rounded hover:bg-gray-100"
                    >
                      Mark as Returned
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
*/
}
import { useState, useEffect } from "react";
import { FaBook, FaCalendarAlt, FaClock, FaSearch } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import ConfirmModal from "../../components/general/ConfirmModal";

export default function IssuedBooks({ darkMode }) {
  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    message: "",
    onConfirm: () => {},
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const today = new Date();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/api/my-issued-books/${user.id}`)
      .then(async (res) => {
        const booksWithImages = await Promise.all(
          res.data.map(async (book) => {
            try {
              const googleRes = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
                  book.title
                )}+inauthor:${encodeURIComponent(book.author)}&maxResults=1`
              );

              const googleBook = googleRes.data.items?.[0]?.volumeInfo || {};
              const image =
                googleBook.imageLinks?.thumbnail ||
                `https://picsum.photos/200/300?random=${book.id}`;

              return { ...book, image };
            } catch (err) {
              console.error("Error fetching image for", book.title, err);
              return {
                ...book,
                image: `https://picsum.photos/200/300?random=${book.id}`,
              };
            }
          })
        );

        setIssuedBooks(booksWithImages);
      })
      .catch(() => toast.error("Failed to load issued books"))
      .finally(() => setLoading(false));
  }, [user.id]);

  const fetchIssuedBooks = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/my-issued-books/${user.id}`)
      .then(async (res) => {
        const booksWithImages = await Promise.all(
          res.data.map(async (book) => {
            try {
              const googleRes = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
                  book.title
                )}+inauthor:${encodeURIComponent(book.author)}&maxResults=1`
              );
              const googleBook = googleRes.data.items?.[0]?.volumeInfo || {};
              const image =
                googleBook.imageLinks?.thumbnail ||
                `https://picsum.photos/200/300?random=${book.id}`;
              return { ...book, image };
            } catch {
              return {
                ...book,
                image: `https://picsum.photos/200/300?random=${book.id}`,
              };
            }
          })
        );
        setIssuedBooks(booksWithImages);
      })
      .catch(() => toast.error("Failed to load issued books"))
      .finally(() => setLoading(false));
  };

  const filteredBooks = issuedBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const dueDate = new Date(book.due_date);
    const isOverdue = dueDate < today;
    const dueIn3Days =
      dueDate - today <= 3 * 24 * 60 * 60 * 1000 && dueDate >= today;

    if (filter === "overdue" && !isOverdue) return false;
    if (filter === "dueSoon" && !dueIn3Days) return false;

    return matchesSearch;
  });

  const handleRenewRequest = (borrowId, user_id) => {
    setConfirmModal({
      visible: true,
      message: "Are you sure you want to request renewal for this book?",
      onConfirm: () => {
        axios
          .post(`http://localhost:5000/api/request-renewal/${borrowId}`, {
            user_id: user_id,
          })
          .then(() => {
            toast.success("Renewal requested successfully");
            setIssuedBooks((prev) =>
              prev.map((book) =>
                book.borrow_id === borrowId
                  ? { ...book, renewal_requested: 1 }
                  : book
              )
            );
          })
          .catch(() => toast.error("Failed to request renewal"));
        setConfirmModal({ visible: false, message: "", onConfirm: () => {} });
      },
    });
  };

  const handleReturn = (borrowId) => {
    setConfirmModal({
      visible: true,
      message: "Are you sure you want to mark this book as returned?",
      onConfirm: () => {
        axios
          .put(`http://localhost:5000/api/return/${borrowId}`)
          .then(() => {
            toast.success("Book marked as returned");
            setIssuedBooks((prev) =>
              prev.map((book) =>
                book.id === borrowId
                  ? { ...book, returned_date: new Date().toISOString() }
                  : book
              )
            );
          })
          .catch(() => toast.error("Failed to mark as returned"));
        setConfirmModal({ visible: false, message: "", onConfirm: () => {} });
      },
    });
  };

  const overdueCount = issuedBooks.filter(
    (book) => new Date(book.due_date) < today && !book.returned_date
  ).length;

  return (
    <>
      {darkMode?(<><div className="max-w-6xl p-6 space-y-6">
  <h2 className="text-3xl font-bold text-[#1b365d] dark:text-white">My Issued Books</h2>

  <div className="w-full p-4 flex flex-wrap items-center gap-4 justify-between bg-white dark:bg-gray-800 rounded-lg shadow">
    <div className="text-gray-800 dark:text-gray-200 font-medium text-base">
      Total Issued: {issuedBooks.length} | Overdue:{" "}
      <span className={overdueCount > 0 ? "text-red-500" : "text-green-500"}>
        {overdueCount}
      </span>
    </div>

    <div className="flex flex-wrap gap-3 items-center">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by title or author"
          className="pl-9 pr-4 py-2 rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 w-48 md:w-60"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="px-3 py-2 rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
      >
        <option value="all">All Books</option>
        <option value="overdue">Overdue Only</option>
        <option value="dueSoon">Due in 3 Days</option>
      </select>
    </div>
  </div>

  {loading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="p-4 w-72 mx-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md animate-pulse flex flex-col gap-3"
        >
          <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          <div className="flex justify-center gap-2 mt-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  ) : filteredBooks.length === 0 ? (
    <p className="text-gray-600 dark:text-gray-400 mt-4">No books found.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4">
      {filteredBooks.map((book) => {
        const dueDate = new Date(book.due_date);
        const isOverdue = dueDate < today;
        const dueIn3Days =
          dueDate - today <= 3 * 24 * 60 * 60 * 1000 && dueDate >= today;

        return (
          <motion.div
            key={book.borrow_id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 w-80 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2F3B53] shadow-md flex flex-col gap-3 hover:shadow-lg transition"
          >
            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-40 object-contain rounded"
              />
            ) : (
              <div className="w-full h-40 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-sm">
                No Image Available
              </div>
            )}

            <h3 className="text-lg font-medium text-[#1b365d] dark:text-white flex items-center gap-2">
              <FaBook /> {book.title}
            </h3>

            <p className="text-sm text-gray-700 dark:text-gray-300">
              Author: {book.author}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Issued On: {new Date(book.borrowed_date).toLocaleDateString()}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <FaClock />
              <span>Due Date: {dueDate.toLocaleDateString()}</span>
            </div>

            {isOverdue && (
              <span className="text-red-600 text-sm font-medium">Overdue</span>
            )}
            {!isOverdue && dueIn3Days && (
              <span className="text-yellow-600 text-sm font-medium">
                Due Soon
              </span>
            )}

            {book.returned_date ? (
              <span className="text-sm text-gray-500 italic">Returned</span>
            ) : (
              <div className="flex justify-center gap-2 mt-2 flex-wrap">
                <button
                  onClick={() => handleRenewRequest(book.borrow_id, user.id)}
                  className={`px-3 mt-auto py-1 text-sm rounded transition shadow-sm flex-1 ${
                    book.renewal_requested || isOverdue
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-[#5F97CD] hover:bg-[#3a7ce1] text-white"
                  }`}
                  disabled={book.renewal_requested || isOverdue}
                >
                  {book.renewal_requested
                    ? "Renewal Requested"
                    : "Request Renewal"}
                </button>

                <button
                  onClick={() => handleReturn(book.borrow_id)}
                  className="px-3 mt-auto py-1 text-sm rounded transition shadow-sm flex-1 bg-[#A8C7F0] hover:bg-[#8BB6E8] text-[#1b365d] dark:text-[#1b365d]"
                >
                  Return Book
                </button>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  )}

  {confirmModal.visible && (
    <ConfirmModal
      message={confirmModal.message}
      onConfirm={confirmModal.onConfirm}
      onCancel={() =>
        setConfirmModal({
          visible: false,
          message: "",
          onConfirm: () => {},
        })
      }
    />
  )}
</div>
</>):(<><div className="max-w-6xl p-6 space-y-6">
        <h2 className="text-3xl font-bold text-[#1b365d]">My Issued Books</h2>

        <div className="w-full p-4 flex flex-wrap items-center gap-4 justify-between">
          <div className="text-gray-800 font-medium text-base">
            Total Issued: {issuedBooks.length} | Overdue:{" "}
            <span
              className={overdueCount > 0 ? "text-red-500" : "text-black-500"}
            >
              {overdueCount}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or author"
                className="pl-9 pr-4 py-2 rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white placeholder-gray-400 w-48 md:w-60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white text-gray-700"
            >
              <option value="all">All Books</option>
              <option value="overdue">Overdue Only</option>
              <option value="dueSoon">Due in 3 Days</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="p-4 w-72 mx-auto rounded-lg border border-gray-200 bg-white shadow-md animate-pulse flex flex-col gap-3"
              >
                <div className="w-full h-40 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
                <div className="flex justify-center gap-2 mt-4">
                  <div className="h-8 bg-gray-200 rounded w-24" />
                  <div className="h-8 bg-gray-200 rounded w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredBooks.length === 0 ? (
          <p className="text-gray-600 mt-4">No books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4">
            {filteredBooks.map((book) => {
              const dueDate = new Date(book.due_date);
              const isOverdue = dueDate < today;
              const dueIn3Days =
                dueDate - today <= 3 * 24 * 60 * 60 * 1000 && dueDate >= today;

              return (
                <motion.div
                  key={book.borrow_id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 w-80 rounded-lg border border-gray-200 bg-white shadow-md flex flex-col gap-3 hover:shadow-lg transition"
                >
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-40 object-contain rounded"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      No Image Available
                    </div>
                  )}

                  <h3 className="text-lg font-medium text-[#1b365d] flex items-center gap-2">
                    <FaBook /> {book.title}
                  </h3>

                  <p className="text-sm text-gray-700">Author: {book.author}</p>
                  <p className="text-sm text-gray-700">
                    Issued On:{" "}
                    {new Date(book.borrowed_date).toLocaleDateString()}
                  </p>

                  <div className="flex items-center gap-2 text-sm">
                    <FaClock />
                    <span>Due Date: {dueDate.toLocaleDateString()}</span>
                  </div>

                  {isOverdue && (
                    <span className="text-red-600 text-sm font-medium">
                      Overdue
                    </span>
                  )}
                  {!isOverdue && dueIn3Days && (
                    <span className="text-yellow-600 text-sm font-medium">
                      Due Soon
                    </span>
                  )}

                  {book.returned_date ? (
                    <span className="text-sm text-gray-500 italic">
                      Returned
                    </span>
                  ) : (
                    <div className="flex justify-center gap-2 mt-2 flex-wrap">
                      <button
                        onClick={() =>
                          handleRenewRequest(book.borrow_id, user.id)
                        }
                        className={`px-3 mt-auto py-1 text-sm rounded transition shadow-sm flex-1 ${
                          book.renewal_requested || isOverdue
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-[#5F97CD] hover:bg-[#3a7ce1] text-white"
                        }`}
                        disabled={book.renewal_requested || isOverdue}
                      >
                        {book.renewal_requested
                          ? "Renewal Requested"
                          : "Request Renewal"}
                      </button>

                      <button
                        onClick={() => handleReturn(book.borrow_id)}
                        className="px-3 mt-auto py-1 text-sm rounded transition shadow-sm flex-1 bg-[#A8C7F0] hover:bg-[#8BB6E8] text-[#1b365d]"
                      >
                        Return Book
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {confirmModal.visible && (
          <ConfirmModal
            message={confirmModal.message}
            onConfirm={confirmModal.onConfirm}
            onCancel={() =>
              setConfirmModal({
                visible: false,
                message: "",
                onConfirm: () => {},
              })
            }
          />
        )}
      </div></>)}
    </>
  );
}
