import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    nama: "",
    kategori: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post("http://localhost:8000/api/register/", {
        username: form.username,
        password: form.password,
        email: form.email,
        nama: form.nama,
        kategori: form.kategori,
      });

      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert("Registration failed!" + JSON.stringify(err.response?.data));
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register as Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          placeholder="Username"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />
        <input
          name="nama"
          placeholder="Name"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />
        <input
          name="kategori"
          placeholder="Category (optional)"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}