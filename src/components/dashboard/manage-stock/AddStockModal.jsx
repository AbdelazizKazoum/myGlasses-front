import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { addStock, filterHistory } from "../../../store/stockSlice";
import { searchDetailProductByName } from "../../../store/productsSlice";

// Enum for reasons
const StockMovementReason = {
  SUPPLIER_DELIVERY: "supplier_delivery",
  INVENTORY_CORRECTION: "inventory_correction",
  CUSTOMER_RETURN: "customer_return",
  MANUAL_ADJUSTMENT: "manual_adjustment",
};

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
  // State
  const [detailProducts, setDetailProducts] = useState([]);
  const [searchDetailProduct, setSearchDetailProduct] = useState(""); // search term
  const [selectedProduct, setSelectedProduct] = useState(null); // store selected product details

  // Hooks
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Use setValue to set the selected value of the form
  } = useForm({
    resolver: zodResolver(stockMovementSchema),
  });

  const onSubmit = async (data) => {
    const res = await dispatch(addStock(data));

    if (res.payload.data) {
      onClose(); // Close the modal after successful submission
      await dispatch(filterHistory());
    }
  };

  useEffect(() => {
    // Fetching the details based on the search string
    const fetchDetailProducts = async () => {
      if (searchDetailProduct && !selectedProduct) {
        const res = await dispatch(
          searchDetailProductByName(searchDetailProduct)
        );
        setDetailProducts(res.payload || []);
      }
    };

    fetchDetailProducts();
  }, [dispatch, searchDetailProduct, selectedProduct]);

  const handleSearchChange = (e) => {
    setSearchDetailProduct(e.target.value); // Update the search term when the input changes
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product); // Store the selected product
    setSearchDetailProduct(
      `${product.product.name} - ${product.color} - ${product.size}`
    );
    setValue("productDetailId", product.id); // Update the productDetailId in the form state
    setDetailProducts([]); // Clear the search results after selection
  };

  const handleClearSelection = () => {
    setSelectedProduct(null); // Clear the selected product
    setSearchDetailProduct(""); // Clear the search input
    setValue("productDetailId", ""); // Clear the form value for productDetailId
  };

  if (!isOpen) return null;

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
              className="w-full p-2 bg-white border rounded-md focus:border-primary-500"
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
              className="w-full p-2 border rounded-md focus:border-primary-500"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          {/* Product Detail with search */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Detail *
            </label>
            <input
              type="text"
              value={searchDetailProduct}
              onChange={handleSearchChange}
              className="w-full p-2 border rounded-md focus:border-primary-500"
              placeholder="Search for product details"
              disabled={selectedProduct} // Disable the search input when a product is selected
            />
            {searchDetailProduct && !selectedProduct && (
              <div className="mt-2 max-h-40 overflow-auto bg-white border rounded-md shadow-md">
                {detailProducts.length > 0 ? (
                  detailProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-2 cursor-pointer hover:bg-gray-200 flex items-center"
                      onClick={() => handleSelectProduct(product)}
                    >
                      {/* Color Circle */}
                      <div
                        style={{
                          backgroundColor: product.color,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          marginRight: 8,
                        }}
                      ></div>
                      <span>
                        {product.product.name} - {product.color} -{" "}
                        {product.size}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">No products found</div>
                )}
              </div>
            )}
            {selectedProduct && (
              <div className="mt-2 p-3 border rounded-md bg-gray-100 flex justify-between items-center">
                <div className="flex items-center">
                  {/* Color Circle for selected product */}
                  <div
                    style={{
                      backgroundColor: selectedProduct.color,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      marginRight: 8,
                    }}
                  ></div>
                  <p className="text-sm m-0 text-gray-500">
                    {selectedProduct.product.name} - {selectedProduct.color} -{" "}
                    {selectedProduct.size}
                  </p>
                </div>
                <button
                  type="button"
                  className="ml-2 px-2 py-1 text-sm text-red-500 border border-red-500 rounded-md hover:bg-red-100"
                  onClick={handleClearSelection}
                >
                  Clear
                </button>
              </div>
            )}
            {errors.productDetailId && (
              <p className="text-red-500 text-sm">
                {errors.productDetailId.message}
              </p>
            )}
          </div>

          {/* Reason (Select from Enum) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason *
            </label>
            <select
              {...register("reason")}
              className="w-full p-2 bg-white border rounded-md focus:border-primary-500"
            >
              <option value="">-- Select Reason --</option>
              <option value={StockMovementReason.SUPPLIER_DELIVERY}>
                Supplier Delivery
              </option>
              <option value={StockMovementReason.INVENTORY_CORRECTION}>
                Inventory Correction
              </option>
              <option value={StockMovementReason.CUSTOMER_RETURN}>
                Customer Return
              </option>
              <option value={StockMovementReason.MANUAL_ADJUSTMENT}>
                Manual Adjustment
              </option>
            </select>
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
              className="w-full p-2 border rounded-md focus:border-primary-500"
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
