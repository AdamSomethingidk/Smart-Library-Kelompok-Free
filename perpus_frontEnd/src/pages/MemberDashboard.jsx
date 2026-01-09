import { useEffect, useState } from "react";
import axios from "axios";

export default function MemberDashboard() {
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/analytics/book-popularity/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPopularBooks(res.data))
      .catch((err) => console.error("Error fetching book popularity:", err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Welcome!</h1>
      <h2 className="text-xl font-semibold mb-2">Popular Books</h2>

      {popularBooks.length === 0 ? (
        <p className="text-gray-500">No recommendation.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {popularBooks.map((book, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-bold text-blue-600">{book.judul}</h3>
              <p className="text-gray-600">{book.penulis}</p>
              <p className="text-sm text-gray-400">
                Borrowed: {book.borrow_count} times
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}