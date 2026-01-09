import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Members() {
  const [anggota, setAnggota] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({ nama: "", email: "", kategori: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/anggota/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAnggota(res.data))
      .catch((err) => alert("Unauthorized: Please log in as admin."));
  };

  const filtered = anggota.filter((a) =>
    a.nama?.toLowerCase().includes(search.toLowerCase())
  );

  const deleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://127.0.0.1:8000/api/anggota/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Member deleted!");
      fetchMembers();
    } catch (err) {
      alert("Failed to delete member.");
      console.error(err);
    }
  };

  const openEdit = (member) => {
    setSelectedMember(member);
    setFormData({
      nama: member.nama,
      email: member.email,
      kategori: member.kategori || "",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/anggota/${selectedMember.id}/`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Updated!");
      setSelectedMember(null);
      fetchMembers();
    } catch (err) {
      alert("Failed to update member.");
      console.error(err);
    }
  };

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

      <button
        onClick={() => (navigate("/register"))}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
      >
        Register New Member
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-blue-600 font-semibold">{item.nama}</h2>
            <p className="text-sm text-gray-500">{item.email}</p>
            <p className="text-xs text-gray-400">Category: {item.kategori || "No category"}</p>
            <p className="text-xs text-gray-400">
              Joined: {new Date(item.tanggal_bergabung).toLocaleDateString()}
            </p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => openEdit(item)}
                className="px-2 py-1 text-xs bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMember(item.id)}
                className="px-2 py-1 text-xs bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Edit Member</h2>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nama"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Kategori"
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                className="border p-2 rounded"
              />

              <div className="flex gap-2 mt-3">
                <button className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}