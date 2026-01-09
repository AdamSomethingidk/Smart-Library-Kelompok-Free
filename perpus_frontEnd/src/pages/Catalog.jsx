import { useEffect, useState } from "react";
import axios from "axios";

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/buku/")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const filteredBooks = books.filter((buku) =>
    buku.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buku.penulis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buku.genre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    if (!userId || !token) return;

    axios
      .get(`http://127.0.0.1:8000/api/anggota/?user=${userId}`,{headers: { Authorization: `Bearer ${token}`},})
      .then((res) => {
        if (res.data.length > 0) {
          setAnggotaId(res.data[0].id);
        }
      })
      .catch((err) => console.error("Error fetching anggota:", err));
  }, []);

  const borrowBook = async (bookId) => {

    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 7);

    try {

      const token = localStorage.getItem("token");

      await axios.post(
      "http://127.0.0.1:8000/api/transaksi/",
      {
        buku: bookId,
        tanggal_jatuh_tempo: dueDate.toISOString().split("T")[0],
        status: "Dipinjam",
      },
      {
         headers: { Authorization: `Bearer ${token}`},
      }
   );

      alert("Book borrowed successfully!");

      setBooks((prev) =>
        prev.map((b) =>
          b.id === bookId
            ? { ...b, jumlah_tersedia: b.jumlah_tersedia - 1 }
            : b
        )
      );
    } catch (err) {
      console.error(err.response?.data); 
      alert("Failed to borrow book." + JSON.stringify(err.response?.data));
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Books</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 w-full border rounded-md"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredBooks.map((buku) => (
          <div
            key={buku.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h2 className="font-bold text-blue-600">{buku.judul}</h2>
            <p className="text-gray-600">{buku.penulis}</p>
            <p className="text-sm text-gray-400">
              {buku.genre || "Tidak ada genre"} • {buku.tahun_terbit || "?"}
            </p>
            <p className="text-xs text-gray-500 mb-2">
              Available: {buku.jumlah_tersedia}
            </p>

            <button
              disabled={buku.jumlah_tersedia <= 0}
              onClick={() => borrowBook(buku.id)}
              className={`px-3 py-1 rounded text-white ${
                buku.jumlah_tersedia > 0
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {buku.jumlah_tersedia > 0 ? "Pinjam" : "Not available"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}