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
  Package,
} from "lucide-react";
import NavItem from "./NavItem";
import { IoGlasses } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setProduct } from "../../store/productSlice";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false); // New state for orders

  const dispatch = useDispatch();

  const handleProductsToggle = () => {
    setIsProductsOpen((prev) => !prev);
    setIsStockOpen(false);
    setIsOrdersOpen(false); // Close orders if products are toggled
  };

  const handleStockToggle = () => {
    setIsStockOpen((prev) => !prev);
    setIsProductsOpen(false);
    setIsOrdersOpen(false); // Close orders if stock is toggled
  };

  const handleOrdersToggle = () => {
    setIsOrdersOpen((prev) => !prev);
    setIsProductsOpen(false);
    setIsStockOpen(false); // Close products and stock if orders are toggled
  };

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
            onClick={handleProductsToggle}
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
          <div
            className={`ml-6 space-y-1 w-full transform transition-all duration-300 ease-in-out origin-top ${
              isProductsOpen
                ? "opacity-100 translate-y-0 max-h-[500px] visible"
                : "opacity-0 -translate-y-2 max-h-0 invisible"
            }`}
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
        </div>

        <NavItem
          to="/admin/commands"
          icon={<ShoppingCart />}
          label="Commands"
        />

        {/* Manage Stock Dropdown */}
        <div className="w-full flex flex-col justify-start">
          <button
            onClick={handleStockToggle}
            className="flex items-center justify-between w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center">
              <Package className="mr-2" />
              <span>Manage Stock</span>
            </div>
            {isStockOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <div
            className={`ml-6 space-y-1 w-full transform transition-all duration-300 ease-in-out origin-top ${
              isStockOpen
                ? "opacity-100 translate-y-0 max-h-[500px] visible"
                : "opacity-0 -translate-y-2 max-h-0 invisible"
            }`}
            onClick={() => dispatch(setProduct(null))}
          >
            <NavItem
              to="/admin/stock/history"
              label="Stock History"
              icon={<Circle size={6} />}
            />
            <NavItem
              to="/admin/stock"
              label="Stock"
              icon={<Circle size={6} />}
            />
          </div>
        </div>

        {/* Manage Orders Dropdown */}
        <div className="w-full flex flex-col justify-start">
          <button
            onClick={handleOrdersToggle} // Toggle for orders
            className="flex items-center justify-between w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center">
              <ShoppingCart className="mr-2" />{" "}
              {/* Keep ShoppingCart icon for orders */}
              <span>Manage Orders</span>
            </div>
            {isOrdersOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <div
            className={`ml-6 space-y-1 w-full transform transition-all duration-300 ease-in-out origin-top ${
              isOrdersOpen
                ? "opacity-100 translate-y-0 max-h-[500px] visible"
                : "opacity-0 -translate-y-2 max-h-0 invisible"
            }`}
            onClick={() => dispatch(setProduct(null))}
          >
            <NavItem
              to="/admin/orders/add"
              label="Add"
              icon={<Circle size={6} />}
            />
            <NavItem
              to="/admin/orders"
              label="Orders"
              icon={<Circle size={6} />}
            />
          </div>
        </div>

        <NavItem to="/admin/users" icon={<Users />} label="Users" />
        <NavItem to="/admin/settings" icon={<Settings />} label="Settings" />
      </nav>
    </aside>
  );
}

export default Sidebar;
