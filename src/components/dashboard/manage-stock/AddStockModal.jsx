import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxCross2 } from "react-icons/rx";

const stockMovementSchema = z.object({
  type: z.enum(["add", "remove", "correction"], {
    required_error: "Movement type is required",
  }),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  productDetailId: z.string().uuid("Invalid product ID"),
  supplierId: z.string().uuid().optional(),
  supplierOrderId: z.string().uuid().optional(),
  reason: z.string().optional(),
  note: z.string().optional(),
});

const AddStockModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
      onClose(); // Close the modal after successful submission
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full sm:w-[500px] w-full bg-white shadow-xl p-6 overflow-y-auto animate-slide-in">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Add Stock Movement
          </h2>
          <RxCross2
            className="cursor-pointer text-gray-600"
            onClick={onClose}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Movement Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Movement Type *
            </label>
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

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity *
            </label>
            <input
              type="number"
              {...register("quantity")}
              className="w-full p-2 border rounded-md"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          {/* Product Detail */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Detail *
            </label>
            <input
              type="text"
              {...register("productDetailId")}
              className="w-full p-2 border rounded-md"
            />
            {errors.productDetailId && (
              <p className="text-red-500 text-sm">
                {errors.productDetailId.message}
              </p>
            )}
          </div>

          {/* Supplier */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supplier
            </label>
            <input
              type="text"
              {...register("supplierId")}
              className="w-full p-2 border rounded-md"
            />
            {errors.supplierId && (
              <p className="text-red-500 text-sm">
                {errors.supplierId.message}
              </p>
            )}
          </div>

          {/* Supplier Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supplier Order
            </label>
            <input
              type="text"
              {...register("supplierOrderId")}
              className="w-full p-2 border rounded-md"
            />
            {errors.supplierOrderId && (
              <p className="text-red-500 text-sm">
                {errors.supplierOrderId.message}
              </p>
            )}
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason
            </label>
            <input
              type="text"
              {...register("reason")}
              className="w-full p-2 border rounded-md"
            />
            {errors.reason && (
              <p className="text-red-500 text-sm">{errors.reason.message}</p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Note
            </label>
            <textarea
              {...register("note")}
              className="w-full p-2 border rounded-md"
            />
            {errors.note && (
              <p className="text-red-500 text-sm">{errors.note.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-6 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStockModal;
