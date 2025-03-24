import React, { useState } from "react";
import axios from "axios";
import SupplierSelect from "../../../../components/dashboard/supplier-orders/SupplierSelect";
import OrderItemsTable from "../../../../components/dashboard/supplier-orders/OrderItemsTable";
import OrderSummary from "../../../../components/dashboard/supplier-orders/OrderSummary";

export default function AddOrder() {
  const [supplierId, setSupplierId] = useState("");
  const [note, setNote] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!supplierId || items.length === 0) return alert("Complete the form");
    setLoading(true);
    try {
      const supplierOrder = {
        supplierId,
        note,
        items,
      };
      console.log("🚀 ~ handleSubmit ~ supplierOrder:", supplierOrder);

      await axios.post("/api/supplier-orders", supplierOrder);
      alert("Order created successfully");
      setSupplierId("");
      setNote("");
      setItems([]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
        />
        <OrderSummary
          items={items}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
