import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/login/", form);

      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      const userRes = await axios.get("http://localhost:8000/api/user/", {
        headers: { Authorization: `Bearer ${res.data.access}` }
      });

      localStorage.setItem("user_id", userRes.data.id);
      localStorage.setItem("is_admin", userRes.data.is_superuser);

      if (userRes.data.is_superuser) {
        navigate("/dashboard");
      } else {
        navigate("/member_dashboard");
      }

      alert("Login successful!");
    } catch (err) {
      console.error(err.response?.data);
      alert("Invalid credentials" + JSON.stringify(err.response?.data));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input name="username" placeholder="Username" onChange={handleChange}
          className="border p-2 w-full" required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange}
          className="border p-2 w-full" required />
        <button className="bg-green-500 text-white px-4 py-2 rounded">Login</button>
      </form>
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>

    </div>
  );
}