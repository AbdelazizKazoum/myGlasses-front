import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { Menu, User } from "lucide-react";

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-gray-100  fixed top-0 left-0 w-full">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex flex-col flex-1">
        <header className="bg-white p-2 shadow-sm flex items-center justify-between">
          <button
            className="md:hidden p-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu />
          </button>
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-200 rounded-full p-2 mr-3 ">
            <User className="w-6 h-6 text-gray-700" />
          </div>
        </header>
        <main className="p-6 h-full ">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
