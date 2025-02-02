import { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color";
import { PlusCircle, Check, Upload, CircleX, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../store/productsSlice";
import { useNavigate } from "react-router-dom";

export default function CreateProductPage() {
  // State --------------------------------------------->
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [colors, setColors] = useState(["#c15353", "#149c9e", "#a1b70b"]); // Default colors
  const [images, setImages] = useState({}); // Initially empty
  const [colorPicker, setColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [activeColor, setActiveColor] = useState("#c15353");
  const colorPickerRef = useRef(null);
  const [defaultImage, setDefaultImage] = useState(null);
  const [loading, setLoading] = useState(false); // <-- Add loading state

  // Hooks -------------------------------------------->
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Actions ------------------------------------------>
  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Add color action
  const addColor = () => {
    if (!colors.includes(selectedColor)) {
      setColors([...colors, selectedColor]);
      setImages({ ...images, [selectedColor]: [] });
    }
    setColorPicker(false);
  };

  // Remove color action
  const removeColor = (color) => {
    setColors(colors.filter((c) => c !== color));
    setImages((prev) => {
      const newImages = { ...prev };
      delete newImages[color];
      return newImages;
    });
    if (activeColor === color) setActiveColor(null);
  };

  // Upload file action for colors
  const handleFileUpload = (color, files) => {
    setImages({ ...images, [color]: [...(images[color] || []), ...files] });
  };

  // remove image from colors
  const removeImage = (color, index) => {
    setImages({
      ...images,
      [color]: images[color].filter((_, i) => i !== index),
    });
  };

  // Submit the product to the api
  const handleSubmit = async (e) => {
    const formData = new FormData();

    setLoading(true); // Start loading

    formData.append("product-information", JSON.stringify(product));

    formData.append("defaultImage", defaultImage);

    Object.keys(images).forEach((color) => {
      images[color].forEach((file, index) => {
        formData.append(color, file);
      });
    });

    e.preventDefault(); // Prevent the default form submission
    console.log({
      product,
      colors,
      images,
    });

    const res = await dispatch(createProduct(formData));
    console.log("🚀 ~ handleSubmit ~ res:", res);

    setLoading(false); // Stop loading
    navigate("/products");
  };

  // Component Life sycle ------------------------------------------>
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setColorPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white shadow-md p-6 ">
      <div className="mx-auto rounded-lg flex flex-col sm:flex-row gap-6">
        {/* Product Information Section */}
        <div className="w-full sm:w-1/2">
          <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
          <h2 className="text-lg font-semibold">Product Information</h2>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="w-full p-2 border rounded mt-2"
            value={product.name}
            onChange={handleProductChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-2 border rounded mt-2"
            value={product.description}
            onChange={handleProductChange}
          ></textarea>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              className="w-full p-2 border rounded"
              value={product.brand}
              onChange={handleProductChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="w-full p-2 border rounded"
              value={product.category}
              onChange={handleProductChange}
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              className="w-full p-2 border rounded"
              value={product.gender}
              onChange={handleProductChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
            <input
              type="text"
              name="weight"
              placeholder="Weight"
              className="w-full p-2 border rounded"
              value={product.weight}
              onChange={handleProductChange}
            />
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              className="w-full p-2 border rounded"
              value={product.quantity}
              onChange={handleProductChange}
            />
            <input
              type="text"
              name="qty"
              placeholder="Qty"
              className="w-full p-2 border rounded"
              value={product.qty}
              onChange={handleProductChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="w-full p-2 border rounded"
              value={product.price}
              onChange={handleProductChange}
            />
            <input
              type="text"
              name="newPrice"
              placeholder="New Price"
              className="w-full p-2 border rounded"
              value={product.newPrice}
              onChange={handleProductChange}
            />
          </div>

          <label className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              name="trending"
              checked={product.trending}
              onChange={handleProductChange}
              className="w-5 h-5"
            />
            Trending Product
          </label>
        </div>

        {/* Color and Image Upload Section */}
        <div className="w-full sm:w-1/2 relative mt-6 sm:mt-0">
          <h2 className="text-lg font-semibold">Select Available Colors</h2>
          <div className="flex items-center mt-2 gap-2">
            <div className="flex gap-2">
              {colors.map((color, index) => (
                <div key={index} className="relative">
                  <div
                    className="w-8 h-8 rounded-full cursor-pointer border flex items-center justify-center"
                    style={{ backgroundColor: color }}
                    onClick={() => setActiveColor(color)}
                  >
                    {activeColor === color && (
                      <Check className="text-white w-4 h-4" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setColorPicker(!colorPicker)}
              className="text-gray-600 hover:text-gray-900"
            >
              <PlusCircle size={30} />
            </button>
          </div>

          {colorPicker && (
            <div
              ref={colorPickerRef}
              className="absolute top-12 right-0 bg-white p-2 rounded-lg z-10 border"
            >
              <CircleX
                className="bg-white cursor-pointer text-gray-600 rounded-full absolute -top-3 -right-3 cart-product-update-icon"
                onClick={() => setColorPicker(false)}
              />
              <SketchPicker
                className="border-none shadow-none"
                color={selectedColor}
                onChangeComplete={(color) => setSelectedColor(color.hex)}
              />
              <button
                onClick={addColor}
                className="mt-2 p-2 border rounded bg-blue-500 text-white w-full"
              >
                Add Color
              </button>
            </div>
          )}

          {activeColor && (
            <div className="mt-4 border p-4 rounded">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold">Upload Images for</h2>
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: activeColor }}
                    onClick={() => setActiveColor(activeColor)}
                  ></div>
                </div>
                <button
                  type="button"
                  className="cart-product-remove-button"
                  onClick={() => removeColor(activeColor)}
                >
                  Remove
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {images[activeColor]?.map((file, index) => (
                  <div
                    key={index}
                    className="relative border flex justify-center items-center"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Product in ${activeColor}`}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <CircleX
                      className="bg-white text-gray-600 rounded-full absolute -top-3 -right-3 cart-product-update-icon"
                      onClick={() => removeImage(activeColor, index)}
                    />
                  </div>
                ))}

                <label className="cursor-pointer flex items-center gap-2 text-gray-500 border p-3">
                  <Upload size={40} />
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(activeColor, Array.from(e.target.files))
                    }
                  />
                </label>
              </div>
            </div>
          )}
          <div className="mt-4 border p-4 rounded">
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">Default Image : </h2>
              </div>
              <button
                type="button"
                className="cart-product-remove-button"
                onClick={() => setDefaultImage(null)}
              >
                Remove
              </button>
            </div>

            {/* Default image */}
            <div className="mt-4 flex flex-wrap gap-3">
              {defaultImage && (
                <div className="relative border flex justify-center items-center">
                  <img
                    src={URL.createObjectURL(defaultImage)}
                    alt={`Product in ${activeColor}`}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <CircleX
                    className="bg-white text-gray-600 rounded-full absolute -top-3 -right-3 cart-product-update-icon"
                    onClick={() => setDefaultImage(null)}
                  />
                </div>
              )}

              <label className="cursor-pointer flex items-center gap-2 text-gray-500 border p-3">
                <Upload size={40} />
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => setDefaultImage(e.target.files[0])}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-center mt-6">
        <button
          type="submit"
          className="p-3 border bill-checkout-button sm:w-1/3 flex items-center justify-center"
          onClick={handleSubmit}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <Loader2 className="animate-spin mr-2" size={20} />
          ) : (
            "Submit Product"
          )}
        </button>
      </div>
    </div>
  );
}
