import { Link, useLocation } from "react-router-dom";

function NavItem({ to, icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${
        isActive ? "bg-gray-200" : "hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default NavItem;
