import React, { useState } from "react";
import TableHeader from "./TableHeader";
import UserModal from "../../modals/CreateUserModal";

const UserTable = ({ users }) => {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState();
  const [editUser, setEditUser] = useState(null);

  // Methods
  const handleEdit = (user) => {
    setIsOpen(true);
    setEditUser(user);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <UserModal isOpen={isOpen} setIsOpen={setIsOpen} user={editUser} />

      <div>
        <TableHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          setEditUser={setEditUser}
        />
      </div>

      {users.length > 0 && (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                <input type="checkbox" className="w-4 h-4" />
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) =>
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    <input type="checkbox" className="w-4 h-4" />
                  </td>
                  <td className="px-6 py-4 text-gray-900">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "Active"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                      onClick={() => handleEdit(user)}
                    >
                      Edit User
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
