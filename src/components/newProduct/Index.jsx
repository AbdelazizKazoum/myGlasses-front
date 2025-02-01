import { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color";
import { PlusCircle, Check, Upload, CircleX } from "lucide-react";

export default function CreateProductPage() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [colors, setColors] = useState(["#c15353", "#149c9e", "#a1b70b"]); // Default colors
  const [images, setImages] = useState({}); // Initially empty
  const [colorPicker, setColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [activeColor, setActiveColor] = useState(null);
  const colorPickerRef = useRef(null);

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addColor = () => {
    if (!colors.includes(selectedColor)) {
      setColors([...colors, selectedColor]);
      setImages({ ...images, [selectedColor]: [] });
    }
    setColorPicker(false);
  };

  const removeColor = (color) => {
    setColors(colors.filter((c) => c !== color));
    setImages((prev) => {
      const newImages = { ...prev };
      delete newImages[color];
      return newImages;
    });
    if (activeColor === color) setActiveColor(null);
  };

  const handleFileUpload = (color, files) => {
    setImages({ ...images, [color]: [...(images[color] || []), ...files] });
  };

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

  const removeImage = (color, index) => {
    setImages({
      ...images,
      [color]: images[color].filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log({
      product,
      colors,
      images,
    });
  };

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
          <div className="flex items-center mt-2 gap-2 justify-between">
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
              <PlusCircle size={24} />
            </button>
          </div>

          {colorPicker && (
            <div
              ref={colorPickerRef}
              className="absolute top-12 right-0 bg-white p-2 rounded-lg z-10 border"
            >
              <button
                onClick={() => setColorPicker(false)}
                className="absolute top-2 right-2 bg-gray-500 text-white p-1 rounded"
              >
                X
              </button>
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
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-center mt-6">
        <button
          type="submit"
          className="p-3 border rounded bg-blue-500 text-white w-full sm:w-1/3"
          onClick={handleSubmit}
        >
          Submit Product
        </button>
      </div>
    </div>
  );
}
