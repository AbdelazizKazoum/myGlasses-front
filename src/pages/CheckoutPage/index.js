import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import "./index.css";
import { createCommande } from "../../store/commandeSlice";
import { addAddress, setPrimaryAddress } from "../../store/userSlice";
import ErrorCard from "../../components/ErrorCard";
import PaymentPage from "../../components/PaymentPage";
import PaymentSuccessCard from "../../components/PaymentSuccessCard";
import AddressForm from "../../components/profile/AddressForm";
import { checkAuth } from "../../store/authSlice";
import { getImageUrl } from "../../utils/getImageUrl";

const CheckoutPage = () => {
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDisplayPayment, setShowDisplayPayment] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const [showAddressWarning, setShowAddressWarning] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { primaryAddress } = useSelector((state) => state.user);

  const { addressList } = user;
  const cartProducts = useSelector((state) => state.cart);
  let total = 0;
  let totalProduct = 0;
  let totalDiscount = 0;
  let subtotal = 0;
  cartProducts.forEach((product) => {
    total += product.qty * product.newPrice;
    totalProduct += product.qty;
    totalDiscount += product.qty * (product.price - product.newPrice);
    subtotal += product.qty * product.price;
  });

  const handleSubmitAddress = async (addressData) => {
    await dispatch(addAddress({ userId: user.id, addressData }));

    await dispatch(checkAuth());
    setAddNewAddress(false);
  };

  const handlePlaceOrder = () => {
    if (!primaryAddress) {
      setShowAddressWarning(true);
      return;
    }
    setShowConfirm(true);
  };

  const updateDisplayPayment = (value) => {
    setShowDisplayPayment(value);
  };

  const updatePaymentSuccess = async (value) => {
    if (value) {
      const res = await dispatch(
        createCommande({
          details: cartProducts,
          total,
          address: primaryAddress,
        })
      );

      if (!res.error) {
        setShowPaymentSuccess(value);
      }
    } else {
      setShowPaymentSuccess(value);
    }
  };

  const renderUserAddress = () => (
    <div className="bg-white rounded-lg  w-full max-w-lg">
      {/* Title & Add New Address */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Select an Address</h2>
        <button
          type="button"
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition"
          onClick={() => setAddNewAddress(true)}
        >
          + Add New
        </button>
      </div>

      {/* Address Form (if adding new) */}
      {addNewAddress && (
        <AddressForm
          onCancel={setAddNewAddress}
          onSubmit={handleSubmitAddress}
        />
      )}

      {/* Address List */}
      <ul className="space-y-4">
        {addressList?.map((address) => (
          <li
            key={address.id}
            className={`p-4 rounded-lg shadow-sm border ${
              address.id === primaryAddress?.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                id={address.id}
                name="address"
                checked={address.id === primaryAddress?.id}
                onChange={() => dispatch(setPrimaryAddress(address))}
                className="accent-blue-500"
              />
              <div>
                <h3 className="font-medium">{address.address}</h3>
                <p className="text-sm text-gray-600">
                  {address.city}, {address.pincode}
                </p>
                <p className="text-sm text-gray-600">
                  Mobile: <span className="font-medium">{address.mobile}</span>
                </p>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderOrderSummary = () => (
    <div className=" w-full max-w-lg">
      {/* Header */}
      <h2 className="text-lg font-semibold border-b pb-3">Order Summary</h2>

      {/* Product List */}
      <ul className="mt-4 space-y-4">
        {cartProducts.map((product) => (
          <li
            key={product.id}
            className="flex items-center gap-4 border-b pb-4"
          >
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <section className="flex-1">
              <p className="text-sm font-medium">{product.name}</p>
              {product?.color && (
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <span>Color:</span>
                  <span
                    style={{ backgroundColor: product.color }}
                    className="ml-2 w-5 h-5 rounded-full border"
                  ></span>
                  <span className="ml-4">Size: {product.size}</span>
                </div>
              )}
              <p className="text-sm font-medium mt-1">
                {product.newPrice} MAD{" "}
                <del className="text-gray-400 text-xs">{product.price} MAD</del>
              </p>
            </section>
            <p className="text-sm font-semibold">x{product.qty}</p>
          </li>
        ))}
      </ul>

      {/* Order Summary Details */}
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <p>Total Products</p>
          <span className="font-medium">{totalProduct}</span>
        </div>
        <div className="flex justify-between">
          <p>Subtotal</p>
          <span className="font-medium">{subtotal} MAD</span>
        </div>
        <div className="flex justify-between text-green-500">
          <p>Discount</p>
          <span>-{totalDiscount} MAD</span>
        </div>
        <div className="flex justify-between">
          <p>Delivery Charges</p>
          <span className="font-medium text-green-500">Free</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-lg">
          <p>Total</p>
          <span>{total} MAD</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        type="button"
        className="mt-4 w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-800 transition"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );

  const renderConfirmOrderCard = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        {/* Header */}
        <header className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <button
            className="text-gray-500 hover:text-red-500 transition"
            onClick={() => setShowConfirm(false)}
          >
            ✕
          </button>
        </header>

        {/* Address Section */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700">Address</h3>
          <div className="bg-gray-100 p-3 rounded-md mt-2">
            <h3 className="font-medium">{primaryAddress.address}</h3>
            <p className="text-sm text-gray-600">
              {primaryAddress.city}, {primaryAddress.pincode}
            </p>
            <p className="text-sm text-gray-600">
              Mobile:{" "}
              <span className="font-medium">{primaryAddress.mobile}</span>
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <p>Total Products</p>
            <span className="font-medium">{totalProduct}</span>
          </div>
          <div className="flex justify-between text-sm">
            <p>Subtotal</p>
            <span className="font-medium">{subtotal} MAD</span>
          </div>
          <div className="flex justify-between text-sm text-green-500">
            <p>Discount</p>
            <span>- {totalDiscount} MAD</span>
          </div>
          <div className="flex justify-between text-sm">
            <p>Delivery Charges</p>
            <span className="font-medium text-green-500">Free</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-lg">
            <p>Total</p>
            <span>{total} MAD</span>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          className="w-full mt-4 bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-800 transition"
          onClick={() => {
            setShowConfirm(false);
            setShowDisplayPayment(true);
          }}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );

  if (cartProducts.length === 0) {
    return <ErrorCard />;
  }

  return (
    <div className="checkout-container">
      <section>{renderUserAddress()}</section>
      <section>{renderOrderSummary()}</section>
      {showConfirm && renderConfirmOrderCard()}
      {showDisplayPayment && (
        <PaymentPage
          updateDisplayPayment={updateDisplayPayment}
          updatePaymentSuccess={updatePaymentSuccess}
        />
      )}
      {showPaymentSuccess && (
        <PaymentSuccessCard updatePaymentSuccess={updatePaymentSuccess} />
      )}

      {showAddressWarning && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6 text-center">
            {/* Header */}
            <h2 className="text-lg font-semibold text-red-500">
              Address Required
            </h2>
            <p className="text-gray-600 mt-2">
              You must choose an address before placing an order.
            </p>

            {/* OK Button */}
            <button
              className="mt-4 w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-800 transition"
              onClick={() => setShowAddressWarning(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
