/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addStock, filterHistory } from "../../store/stockSlice";
import { searchDetailProductByName } from "../../store/productsSlice";
import { fetchSuppliers } from "../../store/supplierSlice";
import { getFilteredSupplierOrders } from "../../store/supplierOrderSlice";

// Enums
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
  productDetailId: z.string().min(1, "Invalid product ID"),
  supplierId: z.string().optional(),
  supplierOrderId: z.string().optional(),
  reason: z.string().optional(),
  note: z.string().optional(),
});

const AddStockModal = ({ isOpen, onClose, filters }) => {
  const [detailProducts, setDetailProducts] = useState([]);
  const [searchDetailProduct, setSearchDetailProduct] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);
  const [selectedSupplierId, setSelectedSupplierId] = useState("");
  const [selectedSupplierName, setSelectedSupplierName] = useState("empty");

  const dispatch = useDispatch();
  const { suppliers } = useSelector((state) => state.suppliers);
  const { supplierOrders, pagination } = useSelector(
    (state) => state.supplierOrders
  );
  console.log("🚀 ~ AddStockModal ~ supplierOrders:", supplierOrders);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(stockMovementSchema),
  });

  const onSubmit = async (data) => {
    const res = await dispatch(addStock(data));
    console.log("🚀 ~ onSubmit ~ res:", res);

    if (res.payload) {
      onClose();
      await dispatch(
        filterHistory({
          filters,
          pagination: { page: 1 },
        })
      );
    }
  };

  useEffect(() => {
    (async () => {
      if (selectedSupplierName) {
        await dispatch(
          getFilteredSupplierOrders({
            filters: {
              status: "",
              supplier: selectedSupplierName,
              startDate: "",
              endDate: "",
              totalMin: "",
              totalMax: "",
              sortBy: "createdAt",
              sortOrder: "DESC",
            },
            pagination: { page: 1, limit: 10 },
          })
        );
      }
    })();
  }, [selectedSupplierName, dispatch]);

  useEffect(() => {
    (async () => {
      setLoadingSuppliers(true);
      await dispatch(fetchSuppliers());
      setLoadingSuppliers(false);
    })();
  }, []);

  useEffect(() => {
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
    setSearchDetailProduct(e.target.value);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setSearchDetailProduct(
      `${product.product.name} - ${product.color} - ${product.size}`
    );
    setValue("productDetailId", product.id);
    setDetailProducts([]);
  };

  const handleClearSelection = () => {
    setSelectedProduct(null);
    setSearchDetailProduct("");
    setValue("productDetailId", "");
  };

  // Update handleChange for supplier selection
  const handleSupplierChange = (e) => {
    const supplierName = e.target.value;

    // setSelectedSupplierId(supplierId);
    setSelectedSupplierName(supplierName);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full sm:w-[500px] w-full bg-white shadow-xl p-6 overflow-y-auto animate-slide-in">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Add Stock Movement
          </h2>
          <RxCross2
            className="cursor-pointer text-gray-600"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Movement Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Movement Type *
            </label>
            <select
              {...register("type")}
              className="w-full  text-gray-700 p-2 border bg-white rounded-md"
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

          {/* Product Detail Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Detail *
            </label>
            <input
              type="text"
              value={searchDetailProduct}
              onChange={handleSearchChange}
              disabled={selectedProduct}
              className="w-full p-2 border rounded-md"
              placeholder="Search for product details"
            />
            {searchDetailProduct && !selectedProduct && (
              <div className="mt-2 max-h-40 overflow-auto border rounded bg-white shadow">
                {detailProducts.length > 0 ? (
                  detailProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleSelectProduct(product)}
                    >
                      <div
                        style={{
                          backgroundColor: product.color,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          marginRight: 8,
                        }}
                      />
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
              <div className="mt-2 p-3 border rounded bg-gray-100 flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    style={{
                      backgroundColor: selectedProduct.color,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      marginRight: 8,
                    }}
                  />
                  <span>
                    {selectedProduct.product.name} - {selectedProduct.color} -{" "}
                    {selectedProduct.size}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleClearSelection}
                  className="text-sm text-red-500 border border-red-500 px-2 py-1 rounded hover:bg-red-100"
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

          {/* Supplier */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supplier
            </label>
            {loadingSuppliers ? (
              <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse" />
            ) : (
              <select
                {...register("supplierId")}
                onChange={handleSupplierChange}
                className="w-full text-gray-700 p-2 border bg-white rounded-md"
              >
                <option value="">-- Select Supplier --</option>
                {suppliers?.map((supplier) => (
                  <option key={supplier.id} value={supplier.name}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            )}
            {errors.supplierId && (
              <p className="text-red-500 text-sm">
                {errors.supplierId.message}
              </p>
            )}
          </div>

          {/* Supplier Order Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supplier Order *
            </label>
            <select
              {...register("supplierOrderId")}
              className="w-full text-gray-700 p-2 border bg-white rounded-md"
            >
              <option value="">-- Select Supplier Order --</option>
              {supplierOrders.map((order) => (
                <option key={order.id} value={order.id}>
                  {new Date(order.createdAt).toLocaleDateString()} -{" "}
                  {order.total} MAD - {order.status}
                </option>
              ))}
            </select>
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
            <select
              {...register("reason")}
              className="w-full p-2 border  text-gray-700 bg-white rounded-md"
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
              rows={3}
              className="w-full p-2 border rounded-md"
              placeholder="Optional note"
            />
            {errors.note && (
              <p className="text-red-500 text-sm">{errors.note.message}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStockModal;
