import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import ProductDetailSearchInput from "../../ui/ProductDetailSearchInput";

// Zod validation schema
const itemSchema = z.object({
  productDetailId: z.string().min(1, "Select a product"),
  quantity: z
    .number({ invalid_type_error: "Quantity is required" })
    .positive("Quantity must be greater than 0"),
  unitPrice: z
    .number({ invalid_type_error: "Unit price is required" })
    .nonnegative("Price must be 0 or more"),
});

export default function OrderItemsTable({ items, onAddItem, onRemoveItem }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log("🚀 ~ OrderItemsTable ~ selectedProduct:", selectedProduct);

  useEffect(() => {
    // In real app: axios.get("/api/products").then((res) => setProducts(res.data));
    setProducts([
      { id: "1", name: "Product A" },
      { id: "2", name: "Product B" },
    ]);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      productDetailId: "",
      quantity: "",
      unitPrice: "",
    },
  });

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);

    onAddItem({
      productId: data.productDetailId,
      name: selectedProduct?.product?.name || "",
      size: selectedProduct?.size || "",
      color: selectedProduct?.color || "",
      quantity: data.quantity,
      unitPrice: data.unitPrice,
    });
    reset();
    setValue("productDetailId", "");

    setSelectedProduct(null);
  };

  return (
    <div className="">
      <h2 className="text-lg text-gray-700 mb-4">Order Items</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        {/* Product Select */}
        <div className="flex text-sm flex-col">
          <ProductDetailSearchInput
            selectedProduct={selectedProduct}
            setSelectedProduct={(product) => {
              setSelectedProduct(product);
              setValue("productDetailId", product?.id || "");
            }}
            onChange={(value) => setValue("productDetailId", value)} // ✅ this is the missing onChange
            error={errors.productDetailId}
          />
          <input type="hidden" {...register("productDetailId")} />
        </div>

        {/* Quantity */}
        <div className="flex text-sm flex-col justify-end">
          <label className="block mb-1 font-medium text-gray-600">
            Quantity
          </label>
          <input
            type="number"
            step="1"
            {...register("quantity", { valueAsNumber: true })}
            placeholder="Quantity"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700"
          />
          <p className="text-sm text-red-500 min-h-[1.25rem] mt-1">
            {errors.quantity?.message}
          </p>
        </div>

        {/* Unit Price */}
        <div className="flex flex-col justify-end">
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
          <p className="text-sm text-red-500 min-h-[1.25rem] mt-1">
            {errors.unitPrice?.message}
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex items-start mt-1 pt-6">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700"
          >
            Add Item
          </button>
        </div>
      </form>

      {/* Table of items */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left text-gray-600">
          <thead className="text-xs uppercase bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Color</th>
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
                  colSpan="8"
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
                  <td className="px-4 py-3">{item.size}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="capitalize">{item.color}</span>
                    </div>
                  </td>
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
