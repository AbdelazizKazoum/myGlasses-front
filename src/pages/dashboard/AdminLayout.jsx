import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { Menu } from "lucide-react"; // User icon is already imported in the UserDropdown component
import AdminOnly from "../../components/ProtectedRoute/AdminOnly";
import UserDropdownProfile from "../../components/dashboard/UserDropdownProfile";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Hooks
  const dispatch = useDispatch();
  const { user: credentials } = useSelector((state) => state.auth);

  const user = {
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D", // Example user photo
    username: credentials?.username, // Example username
    email: credentials?.email, // Example email
  };

  const handleLogout = async () => {
    // Handle logout logic here
    await dispatch(logout());
  };

  return (
    <AdminOnly>
      <div className="flex h-screen bg-gray-100 fixed top-0 left-0 w-full">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex flex-col flex-1">
          <header className="bg-white p-2 shadow-sm flex items-center justify-between">
            <button
              className="p-2"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
              <Menu />
            </button>
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            <UserDropdownProfile user={user} onLogout={handleLogout} />
          </header>
          <main className="p-6 h-full overflow-auto">{children}</main>
        </div>
      </div>
    </AdminOnly>
  );
}

export default AdminLayout;
