/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuppliers } from "../../../store/supplierSlice";

export default function SupplierSelect({ value, onChange }) {
  // Redux state
  const { suppliers } = useSelector((state) => state.suppliers);

  // Local loading state
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // Fetch suppliers on mount
  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(fetchSuppliers());
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <label className="block text-gray-700 mb-1 font-medium">Supplier</label>
      <select
        className="w-full text-sm bg-white text-gray-700 border px-2 py-2.5 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
      >
        {loading ? (
          <option>Loading suppliers...</option>
        ) : suppliers.length === 0 ? (
          <option disabled>No suppliers found</option>
        ) : (
          <>
            <option value="">Select Supplier</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
}
