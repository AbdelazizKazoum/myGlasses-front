import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { Menu } from "lucide-react";

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-gray-100  fixed top-0 left-0 w-full">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex flex-col flex-1">
        <header className="bg-white p-4 shadow flex items-center justify-between">
          <button
            className="md:hidden p-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu />
          </button>
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
