import React, { useState } from "react";

export const AddProduct = () => {
  const [product, setProduct] = useState({
    id: "",
    qty: 0,
    name: "",
    description: "",
    brand: "",
    category: "",
    gender: "",
    weight: "",
    quantity: 0,
    image: "",
    rating: 0,
    price: 0,
    newPrice: 0,
    trending: false,
    createAt: new Date().toLocaleDateString(),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Product added successfully!");
        console.log("Server Response:", data);
        setProduct({
          id: "",
          qty: 0,
          name: "",
          description: "",
          brand: "",
          category: "",
          gender: "",
          weight: "",
          quantity: 0,
          image: "",
          rating: 0,
          price: 0,
          newPrice: 0,
          trending: false,
          createAt: new Date().toISOString(),
        });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Something went wrong."}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form className="" onSubmit={handleSubmit}>
        {/* ID Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="id"
            className="peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
          >
            ID (Auto-generated)
          </label>
        </div>

        {/* Name Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>

        {/* Description Field */}
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="description"
            className="peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
          >
            Description
          </label>
        </div>

        {/* Brand, Category, Gender Fields in one row */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 md:gap-6">
          {/* Brand Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="brand"
              className="peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
            >
              Brand
            </label>
          </div>

          {/* Category Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="category"
              className="peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
            >
              Category
            </label>
          </div>

          {/* Gender Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="gender"
              value={product.gender}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="gender"
              className="peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
            >
              Gender
            </label>
          </div>
        </div>

        {/* Weight Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="weight"
            value={product.weight}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="weight"
            className="peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
          >
            Weight
          </label>
        </div>

        {/* Quantity and Qty Fields in one row */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="quantity"
              className="peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
            >
              Quantity
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="qty"
              value={product.qty}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="qty"
              className="peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
            >
              Qty
            </label>
          </div>
        </div>

        {/* Image Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="image"
            className="peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
          >
            Image URL
          </label>
        </div>

        {/* Rating Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            step="0.1"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rating"
            className="peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
          >
            Rating
          </label>
        </div>

        {/* Price Fields in one row */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              step="0.01"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="price"
              className="peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
            >
              Price
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              step="0.01"
              name="newPrice"
              value={product.newPrice}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="newPrice"
              className="peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
            >
              New Price
            </label>
          </div>
        </div>

        {/* Trending Checkbox */}
        <div className="relative z-0 w-full mb-5 group">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="trending"
              checked={product.trending}
              onChange={handleChange}
              className="appearance-none checked:bg-blue-600"
            />
            <span>Trending</span>
          </label>
        </div>

        {/* Date (Readonly) */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="createAt"
            value={product.createAt}
            className="block py-2.5 px-0 w-full text-sm bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
            readOnly
          />
          <label
            htmlFor="createAt"
            className="peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
          >
            Created At
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
          disabled={loading}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>

      {message && (
        <div className="mt-4 text-center">
          <p
            className={
              message.includes("Error") ? "text-red-600" : "text-green-600"
            }
          >
            {message}
          </p>
        </div>
      )}
    </div>
  );
};
