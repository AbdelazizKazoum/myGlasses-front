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
    console.log("🚀 ~ updatePaymentSuccess ~ totale:", total);

    if (value) {
      const res = await dispatch(
        createCommande({ details: cartProducts, total })
      );

      if (!res.error) {
        setShowPaymentSuccess(value);
      }
    } else {
      setShowPaymentSuccess(value);
    }
  };

  const renderUserAddress = () => (
    <>
      <h1 className="checkout-container-address">Address</h1>
      <button
        type="button"
        className="profile-add-address-button mt-0"
        onClick={() => {
          setAddNewAddress(true);
        }}
      >
        + Add New Address
      </button>
      {addNewAddress && (
        <AddressForm
          onCancel={setAddNewAddress}
          onSubmit={handleSubmitAddress}
        />
      )}
      {addressList &&
        addressList.map((address) => (
          <li key={address.id} className="address-card mb-3 !bg-[#F9FAFB]">
            <input
              type="radio"
              id={address.id}
              name="address"
              checked={address?.id === primaryAddress?.id}
              onChange={() => {
                dispatch(setPrimaryAddress(address));
              }}
            />
            <div className="d-flex flex-column">
              <label htmlFor={address.id} className="address-label">
                <h3>{address.address}</h3>

                <p>
                  {address.city}, {address.pincode}
                </p>
                <p>
                  Mobile: <span>{address.mobile}</span>
                </p>
              </label>
            </div>
          </li>
        ))}
    </>
  );

  const renderOrderSummary = () => (
    <div className="order-summary-container">
      <h2>Order Summary</h2>
      <ul>
        {cartProducts.map((product) => (
          <li key={product.id} className="order-summary-product mb-3">
            <img src={product.image} alt={product.name} />
            <section>
              <div>
                <p className="order-summary-product-title">{product.name}</p>
                <p className="order-summary-product-title">
                  ৳ {product.newPrice}
                  <del>৳ {product.price}</del>
                </p>
              </div>
              <p className="order-summary-product-title">x{product.qty}</p>
            </section>
          </li>
        ))}
      </ul>
      <hr />
      <div>
        <p>Total Products</p>
        <span>{totalProduct}</span>
      </div>
      <div>
        <p>Subtotal</p>
        <span>৳ {subtotal}</span>
      </div>
      <div>
        <p>Discount</p>
        <span>-৳ {totalDiscount}</span>
      </div>
      <div>
        <p>Delivery Charges</p>
        <span>Free</span>
      </div>
      <hr />
      <div>
        <p className="order-summary-total">Total</p>
        <span className="order-summary-total">৳ {total}</span>
      </div>
      <button
        type="button"
        className="bill-checkout-button"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );

  const renderConfirmOrderCard = () => (
    <div className="eyesome-modal">
      <div className="confirm-order-card">
        <header>
          <h2>Order Summary</h2>
          <button
            type="button"
            className="confirm-order-cross-button"
            onClick={() => {
              setShowConfirm(false);
            }}
          >
            X
          </button>
        </header>
        <hr />
        <div className="p-2 confirm-order-card-details">
          <h1 className="confirm-order-card-address-title">Address</h1>
          <section className="confirm-order-card-address">
            <h3>{primaryAddress.name}</h3>
            <p>
              {primaryAddress.firstLine}, {primaryAddress.secondLine}
            </p>
            <p>
              {primaryAddress.city}, {primaryAddress.pincode}
            </p>
            <p>
              Mobile: <span>{primaryAddress.mobile}</span>
            </p>
          </section>
          <hr />
          <div>
            <p>Total Products</p>
            <span>{totalProduct}</span>
          </div>
          <div>
            <p>Subtotal</p>
            <span>৳ {subtotal}</span>
          </div>
          <div>
            <p>Discount</p>
            <span>-৳ {totalDiscount}</span>
          </div>
          <div>
            <p>Delivery Charges</p>
            <span>Free</span>
          </div>
          <hr />
          <div>
            <p>Total</p>
            <span>৳ {total}</span>
          </div>
        </div>
        <button
          type="button"
          className="bill-checkout-button"
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
        <div className="eyesome-modal">
          <div className="confirm-order-card">
            <h2 className=" text-red-500 my-2">Address Required</h2>
            <p>You must choose an address before placing an order.</p>
            <button
              className="bill-checkout-button "
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
