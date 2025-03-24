import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SupplierSelect({ value, onChange }) {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // axios.get("/api/suppliers").then((res) => setSuppliers(res.data));
  }, []);

  return (
    <div>
      <label className="block text-gray-700 mb-1 font-medium">Supplier</label>
      <select
        className="w-full text-gray-700 border px-2 py-2.5 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Supplier</option>
        {suppliers.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
}
