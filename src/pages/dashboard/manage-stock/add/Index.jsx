import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const stockMovementSchema = z.object({
  type: z.enum(["add", "remove", "correction"], {
    required_error: "Movement type is required",
  }),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  productDetailId: z.string().uuid("Invalid product detail ID"),
  supplierId: z.string().uuid().optional(),
  supplierOrderId: z.string().uuid().optional(),
  reason: z.string().optional(),
  note: z.string().optional(),
});

export const AddStock = () => {
  const [suppliers, setSuppliers] = useState([
    { id: "1", name: "Supplier A" },
    { id: "2", name: "Supplier B" },
    { id: "3", name: "Supplier C" },
  ]);
  const [productDetails, setProductDetails] = useState([
    { id: "1", name: "Product A" },
    { id: "2", name: "Product B" },
    { id: "3", name: "Product C" },
  ]);
  const [supplierOrders, setSupplierOrders] = useState([
    { id: "1", order: "Order A" },
    { id: "2", order: "Order B" },
    { id: "3", order: "Order C" },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stockMovementSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/stock-movements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error adding stock movement");

      alert("Stock movement added successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="m-6 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Stock Movement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium">Movement Type *</label>
            <select
              {...register("type")}
              className="w-full p-2 border rounded-md"
            >
              <option value="">-- Select --</option>
              <option value="add">Add</option>
              <option value="remove">Remove</option>
              <option value="correction">Correction</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Quantity *</label>
            <input
              type="number"
              {...register("quantity")}
              className="w-full p-2 border rounded-md"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Product Detail *
            </label>
            <select
              {...register("productDetailId")}
              className="w-full p-2 border rounded-md"
            >
              <option value="">-- Select --</option>
              {productDetails.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            {errors.productDetailId && (
              <p className="text-red-500 text-sm">
                {errors.productDetailId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Supplier</label>
            <select
              {...register("supplierId")}
              className="w-full p-2 border rounded-md"
            >
              <option value="">-- Select Supplier --</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
            {errors.supplierId && (
              <p className="text-red-500 text-sm">
                {errors.supplierId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Supplier Order</label>
            <select
              {...register("supplierOrderId")}
              className="w-full p-2 border rounded-md"
            >
              <option value="">-- Select Order --</option>
              {supplierOrders.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.order}
                </option>
              ))}
            </select>
            {errors.supplierOrderId && (
              <p className="text-red-500 text-sm">
                {errors.supplierOrderId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Reason</label>
            <input
              type="text"
              {...register("reason")}
              className="w-full p-2 border rounded-md"
            />
            {errors.reason && (
              <p className="text-red-500 text-sm">{errors.reason.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Note</label>
          <textarea
            {...register("note")}
            className="w-full p-2 border rounded-md"
          ></textarea>
          {errors.note && (
            <p className="text-red-500 text-sm">{errors.note.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-800"
        >
          Save
        </button>
      </form>
    </div>
  );
};
