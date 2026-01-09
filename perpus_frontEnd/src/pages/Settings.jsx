import { useNavigate } from "react-router-dom";
export default function Settings() {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/");
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Settings</h1>
      <button
        onClick={Logout} 
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
      >
        Log Out 
      </button>
    </div>
  );
}