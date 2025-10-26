import { NavLink } from "react-router-dom";
import { BookOpen, Users, Home, Settings, ShoppingBasket } from "lucide-react";

const menu = [
  { name: "Dashboard", icon: <Home size={18} />, path: "/" },
  { name: "Books", icon: <BookOpen size={18} />, path: "/catalog" },
  { name: "Members", icon: <Users size={18} />, path: "/members" },
  { name: "Transaction", icon: <ShoppingBasket size ={18} />, path: "/transaction" },
  { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow-sm p-4 flex flex-col">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">SmartLibrary</h1>
      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}