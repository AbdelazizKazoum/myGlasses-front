import React, { useState } from "react";
import TableHeader from "./TableHeader";
import { getImageUrl } from "../../../utils/getImageUrl";
import UpdateProductModal from "../../modals/UpdateProductModal";

const ProductTable = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenEdit, setIsOpenEdit] = useState();

  const [product, setProduct] = useState(null);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div>
        <TableHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <UpdateProductModal
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        updateProduct={product}
      />

      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
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
              Brand
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Rating
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {data
            .filter((product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product, index) => (
              <tr
                key={index}
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${index}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                    />
                    <label
                      htmlFor={`checkbox-table-search-${index}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4 flex items-center gap-2 text-gray-900 whitespace-nowrap">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={getImageUrl(product.image)}
                    alt="Product image"
                  />
                  {product.name}
                </td>
                <td className="px-6 py-4">{product.brand}</td>
                <td className="px-6 py-4">{`$${(product.newPrice / 100).toFixed(
                  2
                )}`}</td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          product.rating >= 4.5 ? "green" : "yellow",
                      }}
                    ></div>
                    <span className="ml-2">{product.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    href="#"
                    className="font-medium text hover:underline"
                    onClick={() => {
                      setProduct(product);
                      setIsOpenEdit(true);
                    }}
                  >
                    Edit product
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
