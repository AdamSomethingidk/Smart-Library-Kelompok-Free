import { useEffect, useState } from "react";
import axios from "axios";

export default function MemberTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/transaksi/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });

        const memberTransaksi = res.data.filter(
          (t) => t.anggota.user === parseInt(userId)
        );

        setTransactions(memberTransaksi);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  if (!transactions.length)
    return <p className="text-gray-500">No transactions found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="py-2 px-4 text-left">Book</th>
              <th className="py-2 px-4 text-left">Borrow Date</th>
              <th className="py-2 px-4 text-left">Due Date</th>
              <th className="py-2 px-4 text-left">Return Date</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{t.buku_detail.judul}</td>
                <td className="py-2 px-4">{t.tanggal_pinjam}</td>
                <td className="py-2 px-4">{t.tanggal_jatuh_tempo}</td>
                <td className="py-2 px-4">
                  {t.tanggal_kembali || "-"}
                </td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    t.status === "Dipinjam"
                      ? "text-yellow-600"
                      : t.status === "Kembali"
                      ? "text-green-600"
                      : "text-red-600"
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