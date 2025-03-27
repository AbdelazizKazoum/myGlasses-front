export const getCommandStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-200 text-yellow-800";
    case "shipped":
      return "bg-blue-200 text-blue-800";
    case "delivered":
      return "bg-green-200 text-green-800";
    case "canceled":
      return "bg-red-200 text-red-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

// utils/getStatusColor.js
export const getPaymentStatusColor = (paymentStatus) => {
  switch (paymentStatus) {
    case "paid":
      return "bg-green-400 text-white"; // Green for paid
    case "unpaid":
      return "bg-red-400 text-white"; // Red for unpaid
    default:
      return "bg-gray-300 text-gray-800"; // Default color
  }
};
