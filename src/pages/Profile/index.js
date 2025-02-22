import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addAddress,
  updateAddress,
  removeAddress,
  setPrimaryAddress,
} from "../../store/userSlice";
import { checkAuth, logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import "./index.css";
import AddressForm from "../../components/profile/AddressForm";

const Profile = () => {
  const [activeTabId, setActiveTabId] = useState("profile");
  const [editingAddress, setEditingAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { username, email, primaryAddress, addressList } = user;

  const navigate = useNavigate();

  const handleSubmitAddress = async (addressData) => {
    if (editingAddress) {
      await dispatch(
        updateAddress({
          addressId: editingAddress.id,
          updatedAddressData: addressData,
        })
      );
    } else {
      await dispatch(addAddress({ userId: user.id, addressData }));
    }
    await dispatch(checkAuth());
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleCancelAddress = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const logoutUser = async () => {
    document.getElementById("logoutButton").textContent = "Logging Out...";
    await dispatch(logout());
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="profile-container">
      <section className="profile-buttons-container">
        <button
          type="button"
          className={`profile-button ${
            activeTabId === "profile" ? "profile-active" : ""
          }`}
          onClick={() => setActiveTabId("profile")}
        >
          Profile
        </button>
        <button
          type="button"
          className={`profile-button ${
            activeTabId === "address" ? "profile-active" : ""
          }`}
          onClick={() => setActiveTabId("address")}
        >
          Address
        </button>
      </section>

      {activeTabId === "profile" && (
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
            id="logoutButton"
            className="profile-logout-button"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      )}

      {activeTabId === "address" && (
        <>
          <button
            className="profile-add-address-button"
            onClick={() => setShowAddressForm(true)}
          >
            + Add New Address
          </button>

          {showAddressForm && (
            <AddressForm
              onCancel={handleCancelAddress}
              onSubmit={handleSubmitAddress}
              initialData={editingAddress}
            />
          )}

          <ul>
            {addressList.map((address) => (
              <li key={address.id} className="address-card">
                <input
                  type="radio"
                  checked={address.id === primaryAddress.id}
                  onChange={() => dispatch(setPrimaryAddress(address))}
                />
                <div className="d-flex flex-column">
                  <label className="address-label">
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
                      className="address-button address-update"
                      onClick={() => handleEditAddress(address)}
                    >
                      Update
                    </button>
                    <button
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
          </ul>
        </>
      )}
    </div>
  );
};

export default Profile;
