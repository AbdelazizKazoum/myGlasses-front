import { Link } from "react-router-dom";

function NavItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-md"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default NavItem;
