const Navbar = () => {
  return (
    <nav className="w-full border-b-2 mb-2">
      <div className="flex justify-between items-center p-4">
        <div className="flex space-x-6 text-2xl font-mono items-center">
          <a href="#" className="font-bold">
            Inventory
          </a>
          <a href="#" className="text-gray-600">
            Collections
          </a>
          <a href="#" className="text-gray-600">
            Analytics
          </a>
        </div>
        <div className="flex space-x-6">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-full">
            + Add New Product
          </button>
          <button className="text-gray-600">Import Data</button>
          <button className="text-gray-600">Export CSV</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
