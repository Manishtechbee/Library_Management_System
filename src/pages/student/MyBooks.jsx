import { useState } from "react";
import { FaBook, FaCalendarAlt, FaClock, FaSearch } from "react-icons/fa";

export default function IssuedBooks() {
  const [issuedBooks, setIssuedBooks] = useState([
    {
      id: 1,
      title: "Introduction to AI",
      author: "John Doe",
      issueDate: "2024-06-01",
      dueDate: "2024-06-15",
      renewalRequested: false,
      returned: false,
    },
    {
      id: 2,
      title: "Web Development Basics",
      author: "Jane Smith",
      issueDate: "2024-06-10",
      dueDate: "2024-06-29",
      renewalRequested: false,
      returned: false,
    },
    {
      id: 3,
      title: "Python Programming",
      author: "David Miller",
      issueDate: "2024-06-12",
      dueDate: "2024-06-25",
      renewalRequested: true,
      returned: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const today = new Date();

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
    setIssuedBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, renewalRequested: true } : book
      )
    );
  };

  const handleReturn = (id) => {
    if (confirm("Are you sure you want to mark this book as returned?")) {
      setIssuedBooks((prev) =>
        prev.map((book) =>
          book.id === id ? { ...book, returned: true } : book
        )
      );
    }
  };

  const overdueCount = issuedBooks.filter(
    (book) => new Date(book.dueDate) < today && !book.returned
  ).length;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">My Issued Books</h2>

      {/* Stats & Filters */}
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

      {/* Book List */}
      {filteredBooks.length === 0 ? (
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
                  <h3 className="text-lg font-medium text-gray-800">{book.title}</h3>
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
