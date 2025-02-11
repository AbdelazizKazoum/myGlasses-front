import React, { useState } from "react";
import TableHeader from "./TableHeader";

const ProductTable = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const users = [
    {
      name: "Neil Sims",
      position: "React Developer",
      email: "neil.sims@flowbite.com",
      status: "Online",
      image: "/docs/images/people/profile-picture-1.jpg",
    },
    {
      name: "Bonnie Green",
      position: "Designer",
      email: "bonnie@flowbite.com",
      status: "Online",
      image: "/docs/images/people/profile-picture-3.jpg",
    },
    {
      name: "Jese Leos",
      position: "Vue JS Developer",
      email: "jese@flowbite.com",
      status: "Online",
      image: "/docs/images/people/profile-picture-2.jpg",
    },
    {
      name: "Thomas Lean",
      position: "UI/UX Engineer",
      email: "thomes@flowbite.com",
      status: "Online",
      image: "/docs/images/people/profile-picture-5.jpg",
    },
  ];

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="">
        <TableHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Position
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
              user.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((user, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${index}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`checkbox-table-search-${index}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.image}
                    alt="User image"
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold">{user.name}</div>
                    <div className="font-normal text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{user.position}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                    {user.status}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit user
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
