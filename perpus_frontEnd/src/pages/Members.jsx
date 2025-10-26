import { useEffect, useState } from "react";

export default function Members() {
  const [anggota, setAnggota] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/anggota/")
      .then((res) => res.json())
      .then((data) => setAnggota(data))
      .catch((err) => console.error("Error fetching anggota:", err));
  }, []);

  const filtered = anggota.filter((a) =>
    a.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Members</h1>

      <input
        type="text"
        placeholder="Find members..."
        className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-blue-600 font-semibold">{item.nama}</h2>
            <p className="text-sm text-gray-500">{item.email}</p>
            <p className="text-xs text-gray-400">
              Category: {item.kategori || "Umum"}
            </p>
            <p className="text-xs text-gray-400">
              Joined: {new Date(item.tanggal_bergabung).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}