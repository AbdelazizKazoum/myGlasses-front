/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import SupplierSelect from "../../../../components/dashboard/supplier-orders/SupplierSelect";
import OrderItemsTable from "../../../../components/dashboard/supplier-orders/OrderItemsTable";
import OrderSummary from "../../../../components/dashboard/supplier-orders/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import {
  createSupplierOrder,
  updateSupplierOrder,
} from "../../../../store/supplierOrderSlice";

export default function AddOrder() {
  // State
  const [supplierId, setSupplierId] = useState("");
  const [note, setNote] = useState("");
  const [items, setItems] = useState([]);
  console.log("🚀 ~ AddOrder ~ items:", items);
  const [loading, setLoading] = useState(false);

  // Hooks
  const dispatch = useDispatch();
  const { selectedSupplierOrder } = useSelector(
    (state) => state.supplierOrders
  );

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index, updatedItem) => {
    setItems(items.map((item, i) => (i === index ? updatedItem : item)));
  };

  const handleSubmit = async () => {
    if (!supplierId || items.length === 0) return alert("Complete the form");
    setLoading(true);

    const supplierOrder = {
      supplierId,
      note,
      items,
    };

    let res = null;
    if (!selectedSupplierOrder) {
      res = await dispatch(createSupplierOrder(supplierOrder));
    } else {
      res = await dispatch(
        updateSupplierOrder({
          id: selectedSupplierOrder.id,
          data: supplierOrder,
        })
      );
    }

    if (!res.error) {
      setNote("");
      setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedSupplierOrder) {
      console.log(
        "🚀 ~ useEffect ~ selectedSupplierOrder:",
        selectedSupplierOrder
      );
      setSupplierId(selectedSupplierOrder.supplier.id);
      setNote(selectedSupplierOrder.note);
      setItems(
        selectedSupplierOrder.items.map((item) => {
          return {
            id: item.id,
            color: item?.detail_product?.color,
            name: item?.detail_product?.product?.name,
            productId: item?.detail_product?.id,
            quantity: item?.quantity,
            size: item?.detail_product?.size,
            unitPrice: Number(item?.unitPrice),
          };
        })
      );
    }
  }, [selectedSupplierOrder]);

  return (
    <div className=" shadow-md mx-auto  rounded-lg  bg-white p-4 space-y-6">
      <div className="space-y-4">
        <SupplierSelect value={supplierId} onChange={setSupplierId} />

        <div className="text-gray-700">
          {" "}
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            className="w-full border text-sm p-2 rounded"
            placeholder="Order Notes"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <OrderItemsTable
          items={items}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          onUpdateItem={handleUpdateItem} // Ajout de la fonction de mise à jour
        />
        <OrderSummary
          items={items}
          handleSubmit={handleSubmit}
          loading={loading}
          selectedSupplierOrder={selectedSupplierOrder}
        />
      </div>
    </div>
  );
}
