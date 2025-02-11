import { BarChart, Home, Settings, Users, X } from "lucide-react";
import NavItem from "./NavItem";
import { FaProductHunt } from "react-icons/fa";
import { IoGlasses } from "react-icons/io5";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-64 bg-white p-4 shadow-lg transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-64"
      } transition-transform md:relative md:translate-x-0`}
    >
      <div className="flex items-center">
        <IoGlasses className="navbar-user-profile text-4xl" />
        <h2 className="navbar-logo text-2xl ml-2">MyGlass</h2>
        <button
          className="md:hidden p-2"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X />
        </button>
      </div>
      <nav className="mt-4 space-y-2">
        <NavItem to="/admin" icon={<Home />} label="Home" />
        <NavItem to="/admin/analytics" icon={<BarChart />} label="Analytics" />
        <NavItem
          to="/admin/products"
          icon={<FaProductHunt />}
          label="Products"
        />
        <NavItem to="/admin/users" icon={<Users />} label="Users" />
        <NavItem to="/admin/settings" icon={<Settings />} label="Settings" />
      </nav>
    </aside>
  );
}

export default Sidebar;
