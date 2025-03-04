import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Building, Truck } from "lucide-react";
import { z } from "zod";

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  expiry: z.string().min(5, "Invalid expiry date (MM/YY)"),
  cvv: z.string().min(3, "CVV must be 3 digits"),
  cardHolderName: z.string().min(2, "Enter a valid name"),
  userId: z.string().optional(),
  password: z.string().optional(),
});

const PaymentPage = ({ updateDisplayPayment, updatePaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
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

  const onSubmit = (data) => {
    console.log("Payment Data:", data);
    updateDisplayPayment(false);
    updatePaymentSuccess(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <header className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">Payments</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => updateDisplayPayment(false)}
          >
            ✕
          </button>
        </header>

        {/* Payment Method Selection */}
        <section className="mt-4 grid grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              className={`flex items-center justify-center space-x-2 p-4 rounded-lg border transition ${
                paymentMethod === method.id
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300 bg-gray-100 hover:border-gray-500"
              }`}
              onClick={() => setPaymentMethod(method.id)}
            >
              {method.icon}
              <span className="text-sm font-medium">{method.name}</span>
            </button>
          ))}
        </section>

        {/* Payment Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          {["credit", "debit"].includes(paymentMethod) && (
            <>
              <h3 className="text-lg font-semibold">Card Details</h3>
              <input
                {...register("cardNumber")}
                type="text"
                placeholder="Card Number"
                className="input-field"
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
                  className="input-field"
                />
                <input
                  {...register("cvv")}
                  type="text"
                  placeholder="CVV"
                  className="input-field"
                />
              </div>
              {errors.expiry && (
                <p className="text-red-500 text-sm">{errors.expiry.message}</p>
              )}
              {errors.cvv && (
                <p className="text-red-500 text-sm">{errors.cvv.message}</p>
              )}

              <input
                {...register("cardHolderName")}
                type="text"
                placeholder="Card Holder's Name"
                className="input-field"
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
                className="input-field"
              />

              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="input-field"
              />
            </>
          )}

          {paymentMethod === "cod" && (
            <p className="text-sm text-gray-600">
              Pay with cash upon delivery.
            </p>
          )}

          {/* Footer */}
          <footer className="mt-6 flex justify-between items-center">
            <h3 className="text-lg font-bold">{total} MAD</h3>
            <button
              type="submit"
              className="bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-800 transition"
            >
              Pay Now
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;

// Tailwind classes used
// .input-field => "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
