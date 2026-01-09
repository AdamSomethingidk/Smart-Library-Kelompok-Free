import { NavLink } from "react-router-dom";
import { BookOpen, Users, Home, Settings, ShoppingBasket } from "lucide-react";

export default function Sidebar() {
  const isAdmin = localStorage.getItem("is_admin") === "true";

  const adminMenu = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
    { name: "Manage Books", icon: <BookOpen size={18} />, path: "/admin_catalog" },
    { name: "Members", icon: <Users size={18} />, path: "/members" },
    { name: "Transactions", icon: <ShoppingBasket size={18} />, path: "/transaction" },
    { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  const memberMenu = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/member_dashboard" },
    { name: "Books", icon: <BookOpen size={18} />, path: "/catalog" },
    { name: "My Transactions", icon: <ShoppingBasket size={18} />, path: "/member_transaction" },
    { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  const menu = isAdmin ? adminMenu : memberMenu;

  return (
    <aside className="w-64 bg-white border-r shadow-sm p-4 flex flex-col">
      <h1 className="text-2xl font-bold text-blue-600 mb-3">Smart Library</h1>

      <span className="text-sm mb-6 px-3 py-1 rounded-full bg-gray-100 text-gray-600 w-fit">
        {isAdmin ? "Administrator" : "Member"}
      </span>

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