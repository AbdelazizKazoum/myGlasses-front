import { useState } from "react";
import {
  BarChart,
  Home,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
  X,
  ChevronDown,
  ChevronUp,
  Circle,
} from "lucide-react";
import NavItem from "./NavItem";
import { IoGlasses } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setProduct } from "../../store/productSlice";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  // Hooks
  const dispatch = useDispatch();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-64 bg-white p-4 shadow-md transform ${
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
      <nav className="mt-4 space-y-2 w-full">
        <NavItem to="/admin" icon={<Home />} label="Home" />
        <NavItem to="/admin/analytics" icon={<BarChart />} label="Analytics" />

        {/* Products Dropdown */}
        <div className="w-full flex flex-col justify-start">
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className="flex items-center justify-between w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center">
              <ShoppingBag className="mr-2" />
              <span>Products</span>
            </div>
            {isProductsOpen ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
          {isProductsOpen && (
            <div
              className="ml-6 mt-1 space-y-1 w-full"
              onClick={() => dispatch(setProduct(null))}
            >
              <NavItem
                to="/admin/products"
                label="List"
                icon={<Circle size={6} />}
              />
              <NavItem
                to="/admin/products/add"
                label="Add"
                icon={<Circle size={6} />}
              />
            </div>
          )}
        </div>

        <NavItem
          to="/admin/commands"
          icon={<ShoppingCart />}
          label="Commands"
        />
        <NavItem to="/admin/users" icon={<Users />} label="Users" />
        <NavItem to="/admin/settings" icon={<Settings />} label="Settings" />
      </nav>
    </aside>
  );
}

export default Sidebar;
