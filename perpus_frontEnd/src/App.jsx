import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import Members from "./pages/Members";
import Settings from "./pages/Settings";
import Transaction from "./pages/Transactions";
import AdminCatalog from "./pages/AdminCatalog";
import MemberTransaction from "./pages/MemberTransaction";
import MemberDashboard from "./pages/MemberDashboard";

function PrivateRoute({ children, adminOnly }) {
  const accessToken = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("is_admin") === "true";

  if (!accessToken) return <Navigate to="/" />;

  if (adminOnly && !isAdmin) return <Navigate to="/unauthorized" />;

  return children;
}

function Layout() {
  const location = useLocation();
  const noLayoutPaths = ["/", "/login", "/register"];
  const hideLayout = noLayoutPaths.includes(location.pathname);

  return (
    <div className="flex h-screen bg-gray-100">
      {!hideLayout && <Sidebar />}

      <div className="flex flex-col flex-1">
        {!hideLayout && <Topbar />}

        <main className="p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/member_dashboard" element={<MemberDashboard/>} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/admin_catalog" element={<PrivateRoute adminOnly><AdminCatalog/></PrivateRoute>} />
            <Route path="/members" element={<PrivateRoute adminOnly><Members /></PrivateRoute>} />
            <Route path="/transaction" element={<PrivateRoute adminOnly><Transaction /></PrivateRoute>} />
            <Route path="/member_transaction" element={<MemberTransaction/>} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}