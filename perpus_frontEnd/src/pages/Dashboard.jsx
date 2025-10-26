export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">Total Books</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-1">1,240</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">Borrowed</p>
          <h2 className="text-3xl font-bold text-yellow-500 mt-1">312</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">Members</p>
          <h2 className="text-3xl font-bold text-green-500 mt-1">498</h2>
        </div>
      </div>
    </div>
  );
}