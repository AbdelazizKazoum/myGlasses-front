import { useState } from "react";
import ConfirmDeleteModal from "../../modals/ConfirmDeleteModal";

export default function OrderSummary({
  items,
  handleSubmit,
  loading,
  selectedSupplierOrder,
  deleteSupplierOrder,
}) {
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const totalCost = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const handleDelete = async () => {
    setDeleting(true);
    await deleteSupplierOrder();
    setDeleting(false);
    setShowConfirm(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Total Items</span>
          <span className="font-semibold text-gray-800">{items.length}</span>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Total Quantity</span>
          <span className="font-semibold text-gray-800">
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Average Price</span>
          <span className="font-semibold text-gray-800">
            {items.length > 0 ? (totalCost / items.length).toFixed(2) : "0.00"}{" "}
            DH
          </span>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className="text-lg font-semibold text-gray-800">
            Total Cost
          </span>
          <span className="text-lg font-semibold text-primary-500">
            {totalCost.toFixed(2)} DH
          </span>
        </div>
      </div>

      <div className="border-t w-full flex justify-end space-x-4 border-gray-200 pt-4">
        {selectedSupplierOrder && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
            onClick={() => setShowConfirm(true)}
            disabled={deleting}
          >
            {deleting ? "Processing..." : "Delete Order"}
          </button>
        )}

        <button
          className={`bg-primary-500 text-white sm:px-10 py-2 rounded-md hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50 ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading
            ? "Processing..."
            : selectedSupplierOrder
            ? "Update Order"
            : "Create Order"}
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        message={"Êtes-vous sûr de vouloir supprimer cette order ?"}
      />
    </div>
  );
}
