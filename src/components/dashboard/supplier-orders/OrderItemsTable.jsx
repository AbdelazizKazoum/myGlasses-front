import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductDetailSearchInput from "../../ui/ProductDetailSearchInput";
import { PencilIcon, Trash2Icon } from "lucide-react";

const itemSchema = z.object({
  productDetailId: z.string().min(1, "Select a product"),
  quantity: z
    .number({ invalid_type_error: "Quantity is required" })
    .positive("Quantity must be greater than 0"),
  unitPrice: z
    .number({ invalid_type_error: "Unit price is required" })
    .nonnegative("Price must be 0 or more"),
});

export default function OrderItemsTable({
  items,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

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

  useEffect(() => {
    if (editingIndex !== null) {
      const item = items[editingIndex];
      setSelectedProduct({
        id: item.productId,
        product: { name: item.name },
        size: item.size,
        color: item.color,
      });
      setValue("productDetailId", item.productId);
      setValue("quantity", item.quantity);
      setValue("unitPrice", item.unitPrice);
    }
  }, [editingIndex, items, setValue]);

  const onSubmit = (data) => {
    const newItem = {
      productId: data.productDetailId,
      name: selectedProduct?.product?.name || "",
      size: selectedProduct?.size || "",
      color: selectedProduct?.color || "",
      quantity: data.quantity,
      unitPrice: data.unitPrice,
    };

    if (editingIndex !== null) {
      onUpdateItem(editingIndex, newItem);
      setEditingIndex(null);
    } else {
      onAddItem(newItem);
    }

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
        <div className="flex text-sm flex-col">
          <ProductDetailSearchInput
            selectedProduct={selectedProduct}
            setSelectedProduct={(product) => {
              setSelectedProduct(product);
              setValue("productDetailId", product?.id || "");
            }}
            onChange={(value) => setValue("productDetailId", value)}
            error={errors.productDetailId}
          />
          <input type="hidden" {...register("productDetailId")} />
        </div>

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

        <div className="flex items-start mt-1 pt-6">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700"
          >
            {editingIndex !== null ? "Update Item" : "Add Item"}
          </button>
        </div>
      </form>

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
                  <td className="px-4 py-3">{item.color}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">{item.unitPrice.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    {(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => onRemoveItem(index)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border-primary rounded-md hover:bg-red-500  text-red-500 border  hover:text-white transition ml-2"
                    >
                      <Trash2Icon className="h-4 w-4" />
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
