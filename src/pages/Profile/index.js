import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { useState } from "react";
import {
  addAddressItem,
  removeAddressItem,
  editAddressItem,
  setPrimaryAddress,
  addAddress,
  updateAddress,
  removeAddress,
} from "../../store/userSlice";

import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { checkAuth, logout } from "../../store/authSlice";

const Profile = () => {
  const [activeTabId, setActiveTabId] = useState("profile");
  const [id, setId] = useState(null);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log("🚀 ~ Profile ~ user:", user);

  const { username, email, primaryAddress, addressList } = user;

  const navigate = useNavigate();

  const submitAddressForm = async (event) => {
    event.preventDefault();
    const newAdd = {
      fullName,
      mobile,
      address,
      city,
      pincode,
    };

    // dispatch(setPrimaryAddress(newAdd));

    if (addNewAddress) {
      await dispatch(addAddress({ userId: user.id, addressData: newAdd }));
      await dispatch(checkAuth());
    } else if (editAddress) {
      await dispatch(
        updateAddress({
          addressId: id,
          updatedAddressData: newAdd,
        })
      );
      await dispatch(checkAuth());
    }

    cancelAddAddress();
  };

  const onClickButton = (event) => {
    document.getElementById(activeTabId).classList.remove("profile-active");
    event.target.classList.add("profile-active");
    setActiveTabId(event.target.id);
  };

  const setNullValues = () => {
    setFullName("");
    setMobile("");
    setAddress("");
    setCity("");
    setPincode("");
  };

  const cancelAddAddress = () => {
    setNullValues();
    setAddNewAddress(false);
    setEditAddress(false);
  };

  const setEditAddressValues = (address) => {
    setId(address.id);
    setFullName(address.fullName);
    setMobile(address.mobile);
    setAddress(address.address);
    setCity(address.city);
    setPincode(address.pincode);
  };

  const logoutUser = async () => {
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.textContent = "Logging Out...";
    logoutButton.style.fontWeight = "bolder";

    await dispatch(logout());
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const renderUserProfile = () => (
    <div className="profile-details">
      <p className="profile-username">
        <span>Username: </span>
        {username}
      </p>
      <p className="profile-username pb-4">
        <span>Email: </span>
        {email}
      </p>
      <hr />
      <button
        type="button"
        id="logoutButton"
        className="profile-logout-button"
        onClick={logoutUser}
      >
        Logout
      </button>
    </div>
  );

  const renderUserAddress = () => (
    <>
      <button
        type="button"
        className="profile-add-address-button"
        onClick={() => {
          setAddNewAddress(true);
        }}
      >
        + Add New Address
      </button>
      {(editAddress || addNewAddress) && renderAddressForm()}
      {addressList &&
        addressList.map((address) => (
          <li key={address.id} className="address-card">
            <input
              type="radio"
              id={address.id}
              name="address"
              checked={address.id === primaryAddress.id}
              onChange={() => {
                dispatch(setPrimaryAddress(address));
              }}
            />
            <div className="d-flex flex-column">
              <label htmlFor={address.id} className="address-label">
                <h3>{address.name}</h3>
                <p>{address.address}</p>
                <p>
                  {address.city}, {address.pincode}
                </p>
                <p>
                  Mobile: <span>{address.mobile}</span>
                </p>
              </label>
              <div>
                <button
                  type="button"
                  className="address-button address-update"
                  onClick={() => {
                    setEditAddressValues(address);
                    setEditAddress(true);
                  }}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="address-button address-remove"
                  onClick={async () => {
                    await dispatch(removeAddress(address.id));
                    await dispatch(checkAuth());
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
    </>
  );

  const renderAddressForm = () => (
    <form onSubmit={submitAddressForm} className="address-form">
      <section className="input-name">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(event) => {
            setFullName(event.target.value);
          }}
          required
        />
      </section>
      <section className="input-mobile">
        <label htmlFor="mobile" className="form-label">
          Mobile
        </label>
        <input
          type="text"
          id="mobile"
          value={mobile}
          onChange={(event) => {
            setMobile(event.target.value);
          }}
          required
        />
      </section>
      <section className="input-address">
        <label htmlFor="address" className="form-label">
          Adress
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
          required
        />
      </section>
      <section className="input-city">
        <label htmlFor="city" className="form-label">
          City
        </label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
          required
        />
      </section>
      <section className="input-pincode">
        <label htmlFor="pincode" className="form-label">
          Pincode
        </label>
        <input
          type="text"
          id="pincode"
          value={pincode}
          onChange={(event) => {
            setPincode(event.target.value);
          }}
          required
        />
      </section>
      <div className="address-form-buttons-container">
        <button
          type="button"
          className="address-form-button"
          onClick={cancelAddAddress}
        >
          Cancel
        </button>
        <button type="submit" className="address-form-button">
          Save
        </button>
      </div>
    </form>
  );

  return (
    <div className="profile-container">
      <section className="profile-buttons-container">
        <button
          type="button"
          className="profile-button profile-active"
          id="profile"
          onClick={onClickButton}
        >
          Profile
        </button>
        <button
          type="button"
          className="profile-button"
          id="address"
          onClick={onClickButton}
        >
          Address
        </button>
      </section>
      {activeTabId === "profile" && renderUserProfile()}
      {activeTabId === "address" && renderUserAddress()}
    </div>
  );
};

export default Profile;
