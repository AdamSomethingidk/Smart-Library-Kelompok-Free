import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminCatalog() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [editBook, setEditBook] = useState(null);
  const [newBook, setNewBook] = useState({
    judul: "",
    penulis: "",
    genre: "",
    tahun_terbit: "",
    jumlah_tersedia: 1,
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios
      .get("http://127.0.0.1:8000/api/buku/")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  };

  const handleAddBook = () => {
    axios
      .post("http://127.0.0.1:8000/api/buku/", newBook)
      .then(() => {
        alert("Book added!");
        fetchBooks();
        setNewBook({ judul: "", penulis: "", genre: "", tahun_terbit: "", jumlah_tersedia: 1 });
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateBook = () => {
    axios
      .put(`http://127.0.0.1:8000/api/buku/${editBook.id}/`, editBook)
      .then(() => {
        alert("Book updated!");
        fetchBooks();
        setEditBook(null);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;
    axios
      .delete(`http://127.0.0.1:8000/api/buku/${id}/`)
      .then(() => {
        alert("Book deleted!");
        fetchBooks();
      })
      .catch((err) => console.error(err));
  };

  const filteredBooks = books.filter((buku) =>
    buku.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buku.penulis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buku.genre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Books</h1>

      <input
        type="text"
        placeholder="Search book..."
        className="border p-2 w-full mb-4 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="p-4 bg-gray-100 rounded-lg mb-6">
        <h2 className="font-bold mb-2">Add New Book</h2>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(newBook).map((key) => (
            <input
              key={key}
              placeholder={key}
              className="border p-2 rounded"
              value={newBook[key]}
              onChange={(e) => setNewBook({ ...newBook, [key]: e.target.value })}
            />
          ))}
        </div>
        <button
          onClick={handleAddBook}
          className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Book
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredBooks.map((buku) => (
          <div key={buku.id} className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-bold text-blue-600">{buku.judul}</h2>
            <p className="text-gray-600">{buku.penulis}</p>
            <p className="text-sm text-gray-400">
              {buku.genre} • {buku.tahun_terbit}
            </p>
            <p className="text-xs text-gray-500">Available: {buku.jumlah_tersedia}</p>

            <div className="mt-2 flex gap-2">
              <button
                className="bg-yellow-500 px-3 py-1 rounded text-white"
                onClick={() => setEditBook(buku)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 px-3 py-1 rounded text-white"
                onClick={() => handleDelete(buku.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editBook && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="font-bold mb-4">Edit Book</h2>
            {Object.keys(editBook).map((key) =>
              key !== "id" ? (
                <input
                  key={key}
                  className="border p-2 rounded w-full mb-2"
                  value={editBook[key]}
                  onChange={(e) => setEditBook({ ...editBook, [key]: e.target.value })}
                />
              ) : null
            )}
            <div className="flex gap-2">
              <button
                onClick={handleUpdateBook}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditBook(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}