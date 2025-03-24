export default function OrderSummary({ items }) {
  const totalCost = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="text-lg font-semibold">Summary</h2>
      <p>Total Items: {items.length}</p>
      <p className="text-lg font-bold">Total Cost: {totalCost.toFixed(2)} DH</p>
    </div>
  );
}
