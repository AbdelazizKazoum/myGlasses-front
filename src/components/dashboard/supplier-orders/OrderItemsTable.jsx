import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// Zod validation schema
const itemSchema = z.object({
  productId: z.string().min(1, "Select a product"),
  quantity: z
    .number({ invalid_type_error: "Quantity is required" })
    .positive("Quantity must be greater than 0"),
  unitPrice: z
    .number({ invalid_type_error: "Unit price is required" })
    .nonnegative("Price must be 0 or more"),
});

export default function OrderItemsTable({ items, onAddItem, onRemoveItem }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // axios.get("/api/products").then((res) => setProducts(res.data));
    setProducts([
      { id: "1", name: "Product A" },
      { id: "2", name: "Product B" },
    ]);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      productId: "",
      quantity: "",
      unitPrice: "",
    },
  });

  const onSubmit = (data) => {
    const product = products.find((p) => p.id === data.productId);
    onAddItem({
      productId: data.productId,
      name: product?.name || "",
      quantity: data.quantity,
      unitPrice: data.unitPrice,
    });
    reset();
  };

  return (
    <div className="">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Order Items</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <div>
          <label className="block mb-1  font-medium text-gray-600">
            Product
          </label>
          <select
            {...register("productId")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2  text-gray-700"
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.productId && (
            <p className="text-sm text-red-500 mt-1">
              {errors.productId.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1  font-medium text-gray-600">
            Quantity
          </label>
          <input
            type="number"
            step="1"
            {...register("quantity", { valueAsNumber: true })}
            placeholder="Quantity"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700"
          />
          {errors.quantity && (
            <p className="text-sm text-red-500 mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Unit Price
          </label>
          <input
            type="number"
            step="0.01"
            {...register("unitPrice", { valueAsNumber: true })}
            placeholder="Unit Price"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700"
          />
          {errors.unitPrice && (
            <p className="text-sm text-red-500 mt-1">
              {errors.unitPrice.message}
            </p>
          )}
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700"
          >
            Add Item
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left text-gray-600">
          <thead className="text-xs uppercase bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Unit Price (DH)</th>
              <th className="px-4 py-3">Subtotal (DH)</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-400 py-4 border-b"
                >
                  No items added.
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{index + 1}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">{item.unitPrice.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    {(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onRemoveItem(index)}
                      className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
