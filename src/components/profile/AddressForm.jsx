import { useState, useEffect } from "react";

const AddressForm = ({ onCancel, onSubmit, initialData = null }) => {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName);
      setMobile(initialData.mobile);
      setAddress(initialData.address);
      setCity(initialData.city);
      setPincode(initialData.pincode);
    }
  }, [initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ fullName, mobile, address, city, pincode });
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <section className="input-name">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </section>
      <section className="input-mobile">
        <label className="form-label">Mobile</label>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
      </section>
      <section className="input-address">
        <label className="form-label">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </section>
      <section className="input-city">
        <label className="form-label">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </section>
      <section className="input-pincode">
        <label className="form-label">Pincode</label>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        />
      </section>
      <div className="address-form-buttons-container">
        <button
          type="button"
          className="address-form-button"
          onClick={() => onCancel(false)}
        >
          Cancel
        </button>
        <button type="submit" className="address-form-button">
          Save
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
