import { useEffect, useState } from "react";

export default function Catalog() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/buku/")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((buku) => (
          <div
            key={buku.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h2 className="font-bold text-blue-600">{buku.judul}</h2>
            <p className="text-gray-600">{buku.penulis}</p>
            <p className="text-sm text-gray-400">
              {buku.genre || "Tidak ada genre"} • {buku.tahun_terbit || "?"}
            </p>
            <p className="text-xs text-gray-500">
              Available: {buku.jumlah_tersedia}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}