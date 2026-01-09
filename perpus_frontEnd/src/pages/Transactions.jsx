import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTx, setSelectedTx] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/transaksi/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    const member = tx.anggota.nama.toLowerCase() || "";
    const book = tx.buku_detail.judul.toLowerCase() || "";
    return member.includes(search.toLowerCase()) || book.includes(search.toLowerCase());
  });

  const deleteTransaction = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://127.0.0.1:8000/api/transaksi/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Transaction deleted!");
      setTransactions(transactions.filter((tx) => tx.id !== id));
    } catch (err) {
      alert("Gagal menghapus transaksi.");
      console.error(err);
    }
  };

  const saveEdit = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/transaksi/${selectedTx.id}/`,
        {
          tanggal_jatuh_tempo: selectedTx.tanggal_jatuh_tempo,
          tanggal_kembali: selectedTx.tanggal_kembali,
          status: selectedTx.status,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Transaksi berhasil diperbarui!");
      setTransactions((prev) =>
        prev.map((tx) => (tx.id === selectedTx.id ? selectedTx : tx))
      );
      setSelectedTx(null);
    } catch (err) {
      alert("Error updating transaction.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Admin Transactions</h1>

      <input
        type="text"
        placeholder="Search by member or book..."
        className="mb-4 p-2 w-full border rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Member</th>
            <th className="p-2">Book</th>
            <th className="p-2">Pinjam</th>
            <th className="p-2">Jatuh Tempo</th>
            <th className="p-2">Kembali</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((tx) => (
            <tr key={tx.id} className="border-b">
              <td className="p-2">{tx.anggota.nama}</td>
              <td className="p-2">{tx.buku_detail.judul}</td>
              <td className="p-2">{tx.tanggal_pinjam}</td>
              <td className="p-2">{tx.tanggal_jatuh_tempo}</td>
              <td className="p-2">{tx.tanggal_kembali || "-"}</td>
              <td className="p-2 text-blue-600">{tx.status}</td>

              <td className="p-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => setSelectedTx(tx)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteTransaction(tx.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTx && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Transaction</h2>

            <label className="block mb-2 text-sm">Tanggal Kembali:</label>
            <input
              type="date"
              value={selectedTx.tanggal_kembali || ""}
              onChange={(e) =>
                setSelectedTx({ ...selectedTx, tanggal_kembali: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />

            <label className="block mb-2 text-sm">Tanggal Jatuh Tempo:</label>
            <input
              type="date"
              value={selectedTx.tanggal_jatuh_tempo}
              onChange={(e) =>
                setSelectedTx({ ...selectedTx, tanggal_jatuh_tempo: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />

            <label className="block mb-2 text-sm">Status:</label>
            <select
              className="w-full p-2 mb-3 border rounded"
              value={selectedTx.status}
              onChange={(e) =>
                setSelectedTx({ ...selectedTx, status: e.target.value })
              }
            >
              <option>Dipinjam</option>
              <option>Kembali</option>
              <option>Terlambat</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-3 py-1 rounded"
                onClick={() => setSelectedTx(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={saveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}