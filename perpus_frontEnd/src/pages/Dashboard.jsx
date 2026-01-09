import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [totalBooks, setTotalBooks] = useState(0);
  const [borrowedBooks, setBorrowedBooks] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/buku/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTotalBooks(res.data.length))
      .catch((err) => console.error(err));

    axios
      .get("http://127.0.0.1:8000/api/transaksi/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const borrowed = res.data.filter((t) => t.status === "Dipinjam");
        setBorrowedBooks(borrowed.length);
      })
      .catch((err) => console.error(err));

    axios
      .get("http://127.0.0.1:8000/api/anggota/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTotalMembers(res.data.length))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">Total Books</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-1">
            {totalBooks}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">Borrowed</p>
          <h2 className="text-3xl font-bold text-yellow-500 mt-1">
            {borrowedBooks}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">Members</p>
          <h2 className="text-3xl font-bold text-green-500 mt-1">
            {totalMembers}
          </h2>
        </div>
      </div>
    </div>
  );
}