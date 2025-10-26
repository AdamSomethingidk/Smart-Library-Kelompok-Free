import { Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-700">Library Dashboard</h2>
      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-72">
        <Search size={16} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search books..."
          className="bg-transparent outline-none ml-2 text-sm w-full"
        />
      </div>
    </header>
  );
}