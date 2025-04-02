import React from "react";

export const TableSkeleton = () => {
  return (
    <div>
      {" "}
      <tr className="animate-pulse bg-gray-100 border-b">
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-1/6"></div>
        </td>
      </tr>
    </div>
  );
};
