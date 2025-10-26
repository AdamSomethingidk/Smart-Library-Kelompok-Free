import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import Members from "./pages/Members";
import Settings from "./pages/Settings";
import Transaction from "./pages/Transaction";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Topbar />
          <main className="p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/members" element={<Members />} />
              <Route path="/settings" element={<Settings />} />
	      <Route path="/transaction" element={<Transaction />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}