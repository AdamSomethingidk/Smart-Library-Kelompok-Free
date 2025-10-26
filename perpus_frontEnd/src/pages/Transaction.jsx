import { useEffect, useState } from "react";

export default function Transaction() {
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/transaksi/")
      .then((res) => res.json())
      .then((data) => setTransaksi(data))
      .catch((err) => console.error("Error fetching transaksi:", err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Transactions</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Members</th>
              <th className="py-2 px-4 text-left">Book</th>
              <th className="py-2 px-4 text-left">Borrow date</th>
              <th className="py-2 px-4 text-left">Due date</th>
              <th className="py-2 px-4 text-left">Return date</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((t) => (
              <tr
                key={t.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="py-2 px-4">{t.anggota?.nama}</td>
                <td className="py-2 px-4">{t.buku?.judul}</td>
                <td className="py-2 px-4">
                  {new Date(t.tanggal_pinjam).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">
                  {new Date(t.tanggal_jatuh_tempo).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">
                  {t.tanggal_kembali
                    ? new Date(t.tanggal_kembali).toLocaleDateString()
                    : "-"}
                </td>
                <td
                  className={`py-2 px-4 font-medium ${
                    t.status === "Kembali"
                      ? "text-green-600"
                      : t.status === "Terlambat"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {t.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}