import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, UserPlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const UserDropdownProfile = ({ user, onLogout }) => {
  // State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userIconRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userIconRef.current &&
        !userIconRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center" ref={userIconRef}>
      <div
        className="flex items-center cursor-pointer hover:bg-gray-200 rounded-full p-2"
        onClick={toggleDropdown}
      >
        <User className="w-6 h-6 text-gray-700" />
      </div>

      {isDropdownOpen && (
        <div
          className="absolute z-10 top-10 right-3 w-48 bg-white border shadow-md rounded-md"
          ref={dropdownRef}
        >
          {/* User info section */}
          <div className="p-2 border-b flex gap-2 items-center">
            <img
              src={user?.photo || "/path/to/default/photo.jpg"}
              alt="User Avatar"
              className="w-9 h-9 rounded-full mx-auto  img-fluid "
            />

            <div>
              <h3 className="mt-2 text-sm font-semibold text-gray-700">
                {user?.username}
              </h3>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Menu items */}
          <div className="my-2">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                console.log("Go to Profile");
                // Add profile navigation logic
              }}
            >
              <UserPlus className="w-4 h-4 text-gray-700" />
              Profile
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                console.log("Go to Settings");
                // Add settings navigation logic
              }}
            >
              <Settings className="w-4 h-4 text-gray-700" />
              Settings
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 text-gray-700" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdownProfile;
