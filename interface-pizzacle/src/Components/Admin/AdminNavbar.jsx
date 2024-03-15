const AdminNavbar = () => {
  return (
    <>
      <nav className="w-full fixed top-0 shadow-md lg:px-10 lg:py-2 flex justify-between items-center bg-white mb-10 text-black border-t-2 border-green-600">
          <div className="p-3 rounded-full bg-yellow-700"></div>
        <div>
          <div className="border rounded-md lg:px-5 lg:py-1 bg-gray-100 border-none">
            <input
              type="text"
              placeholder="Search anything"
              className="border-none outline-none bg-transparent p-1 text-gray-500"
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="p-3 rounded-full bg-yellow-700"></div>
          <div className="p-3 rounded-full bg-black"></div>
          <div className="p-3 rounded-full bg-yellow-700"></div>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
