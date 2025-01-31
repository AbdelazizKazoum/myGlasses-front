import { useState } from "react";

export default function CreateProductPage() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState({});

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addColor = (color) => {
    if (!colors.includes(color)) {
      setColors([...colors, color]);
      setImages({ ...images, [color]: [] });
    }
  };

  const handleFileUpload = (color, files) => {
    setImages({ ...images, [color]: [...(images[color] || []), ...files] });
  };

  const removeImage = (color, index) => {
    setImages({
      ...images,
      [color]: images[color].filter((_, i) => i !== index),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg flex gap-6">
      {/* Product Information Section */}
      <div className="w-1/2">
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
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full p-2 border rounded mt-2"
          value={product.price}
          onChange={handleProductChange}
        />
      </div>

      {/* Color and Image Upload Section */}
      <div className="w-1/2">
        <h2 className="text-lg font-semibold">Select Available Colors</h2>
        <div className="flex gap-2 mt-2">
          {["Red", "Blue", "Green", "Black", "White"].map((color) => (
            <button
              key={color}
              className={`p-2 rounded border ${
                colors.includes(color) ? "bg-gray-300" : "bg-gray-100"
              }`}
              onClick={() => addColor(color)}
            >
              {color}
            </button>
          ))}
        </div>

        <h2 className="text-lg font-semibold mt-4">
          Upload Images for Each Color
        </h2>
        {colors.map((color) => (
          <div key={color} className="mt-4 border p-4 rounded">
            <h3 className="font-medium">{color}</h3>
            <input
              type="file"
              multiple
              className="mt-2"
              onChange={(e) =>
                handleFileUpload(color, Array.from(e.target.files))
              }
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {images[color]?.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Product in ${color}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <button
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                    onClick={() => removeImage(color, index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
