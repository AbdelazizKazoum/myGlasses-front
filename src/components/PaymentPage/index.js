import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Building, Truck, Loader2 } from "lucide-react";
import { z } from "zod";

const PaymentPage = ({
  updateDisplayPayment,
  updatePaymentSuccess,
  loading,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  const getValidationSchema = (method) => {
    switch (method) {
      case "credit":
      case "debit":
        return z.object({
          cardNumber: z.string().min(16, "Card number must be 16 digits"),
          expiry: z.string().min(5, "Invalid expiry date (MM/YY)"),
          cvv: z.string().min(3, "CVV must be 3 digits"),
          cardHolderName: z.string().min(2, "Enter a valid name"),
        });
      case "netBanking":
        return z.object({
          userId: z.string().min(4, "User ID is required"),
          password: z.string().min(6, "Password must be at least 6 characters"),
        });
      case "cod":
      default:
        return z.object({});
    }
  };

  const [schema, setSchema] = useState(getValidationSchema(paymentMethod));

  useEffect(() => {
    setSchema(getValidationSchema(paymentMethod));
    reset();
  }, [paymentMethod]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const cartProducts = useSelector((state) => state.cart);
  const total = cartProducts.reduce(
    (sum, item) => sum + item.newPrice * item.qty,
    0
  );

  const paymentMethods = [
    { id: "credit", name: "Credit Card", icon: <CreditCard size={24} /> },
    { id: "debit", name: "Debit Card", icon: <CreditCard size={24} /> },
    { id: "netBanking", name: "Net Banking", icon: <Building size={24} /> },
    { id: "cod", name: "Cash On Delivery", icon: <Truck size={24} /> },
  ];

  const onSubmit = async (data) => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      updatePaymentSuccess(true);
      updateDisplayPayment(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        <header className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">Payments</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => updateDisplayPayment(false)}
          >
            ✕
          </button>
        </header>

        <section className="mt-4 grid grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              className={`flex items-center justify-center space-x-2 p-4 rounded-lg border transition ${
                paymentMethod === method.id
                  ? "border-primary-500 bg-green-500 text-white"
                  : "border-gray-300 bg-gray-100 hover:border-gray-500"
              }`}
              onClick={() => setPaymentMethod(method.id)}
            >
              {method.icon}
              <span className="text-sm font-medium">{method.name}</span>
            </button>
          ))}
        </section>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          {["credit", "debit"].includes(paymentMethod) && (
            <>
              <h3 className="text-lg font-semibold">Card Details</h3>
              <input
                {...register("cardNumber")}
                type="text"
                placeholder="Card Number"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">
                  {errors.cardNumber.message}
                </p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <input
                  {...register("expiry")}
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
                {errors.expiry && (
                  <p className="text-red-500 text-sm">
                    {errors.expiry.message}
                  </p>
                )}

                <input
                  {...register("cvv")}
                  type="text"
                  placeholder="CVV"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm">{errors.cvv.message}</p>
                )}
              </div>

              <input
                {...register("cardHolderName")}
                type="text"
                placeholder="Card Holder's Name"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              />
              {errors.cardHolderName && (
                <p className="text-red-500 text-sm">
                  {errors.cardHolderName.message}
                </p>
              )}
            </>
          )}

          {paymentMethod === "netBanking" && (
            <>
              <h3 className="text-lg font-semibold">Net Banking Details</h3>
              <input
                {...register("userId")}
                type="text"
                placeholder="User ID"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              />
              {errors.userId && (
                <p className="text-red-500 text-sm">{errors.userId.message}</p>
              )}

              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </>
          )}

          {paymentMethod === "cod" && (
            <p className="text-sm text-gray-600">
              Pay with cash upon delivery.
            </p>
          )}

          <footer className="mt-6 flex justify-between items-center">
            <h3 className="text-lg font-bold">{total} MAD</h3>
            <button
              type="submit"
              className="flex items-center justify-center bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Pay Now"
              )}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
