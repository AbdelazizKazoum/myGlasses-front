import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  getProducts,
  updadeProduct,
} from "../../store/productsSlice";
import { Check, CircleX, Loader2, PlusCircle, Upload } from "lucide-react";
import { SketchPicker } from "react-color";
import { getImageUrl } from "../../utils/getImageUrl";

const UpdateProductModal = ({ isOpen, setIsOpen, updateProduct }) => {
  console.log("🚀 ~ UpdateProductModal ~ updateProduct:", updateProduct);
  // State --------------------------------------------->
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    weight: "",
    quantity: "",
    brand: "",
    category: "",
    gender: null,
    newPrice: null,
    trending: false,
  });
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState({});

  const [removedImages, setRemovedImages] = useState([]);
  const [removedColors, setRemovedColors] = useState([]);

  const [colorPicker, setColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [activeColor, setActiveColor] = useState("#c15353");
  const colorPickerRef = useRef(null);
  const [defaultImage, setDefaultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  // React Hook Form ------------------------------------>
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ defaultValues: updateProduct });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    if (!removedColors.find((item) => item === color)) {
      setRemovedColors((prev) => [...prev, color]);
    }

    setRemovedImages((prev) => ({
      ...prev,
      [color]: images[color].filter((item) => !(item instanceof File)),
    }));

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
    // if (images[color].length <= 1) {
    //   setRemovedColors((prev) => [...prev, color]);
    // }

    if (!(images[color][index] instanceof File)) {
      setRemovedImages((prev) => ({
        ...prev,
        [color]: [...(prev[color] || []), images[color][index]],
      }));
    }

    setImages({
      ...images,
      [color]: images[color].filter((_, i) => i !== index),
    });
  };

  // remove image from colors
  const removeDefaultImage = (image) => {
    setDefaultImage(null);
    if (!(image instanceof File)) {
      setRemovedImages((prev) => ({ ...prev, defaultImage: image }));
    }
  };

  const handleFormSubmit = async (data) => {
    setLoading(true); // Start loading
    setImageError(""); // Reset error message

    // Check if all colors have at least one image
    const colorsWithoutImages = colors.filter(
      (color) => !images[color] || images[color].length === 0
    );

    // Check if default image is uploaded
    if (colorsWithoutImages.length !== 0 || !defaultImage) {
      setImageError(
        `Veuillez télécharger au moins une image pour chaque couleur (${colorsWithoutImages.join(
          ", "
        )}) et une image par défaut.`
      );
      setLoading(false); // Stop loading
      return;
    }

    const formData = new FormData();
    formData.append("product-information", JSON.stringify(data));
    formData.append("removed-images", JSON.stringify(removedImages));
    formData.append("removed-colors", JSON.stringify(removedColors));

    formData.append("defaultImage", defaultImage);

    Object.keys(images).forEach((color) => {
      images[color].forEach((file) => {
        if (file instanceof File) {
          const newFileName = file?.name?.split(" ").join("_");
          const fileWithNewName = new File([file], newFileName, {
            type: file.type,
          });
          formData.append(color, fileWithNewName);
        }
      });
    });

    const res = await dispatch(
      updadeProduct({ formData, id: updateProduct.id })
    );

    console.log("🚀 ~ handleFormSubmit ~ res:", res.payload);
    await dispatch(getProducts());

    if (res.payload) {
      console.log("🚀 ~ handleFormSubmit ~ res.payload:", res.payload);
      setIsOpen(false);
    }

    setLoading(false);
    const user = localStorage.getItem("user");
    if (user && user.role !== "admin") navigate("/products");
    else navigate("/admin/products");
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

  useEffect(() => {
    reset(updateProduct);

    if (updateProduct?.detail?.length > 0) {
      setColors(updateProduct?.detail?.map((item) => item.color) || []);

      const transformedData = updateProduct?.detail?.reduce((acc, item) => {
        acc[item.color] = item.images.map((img) => img.image);
        return acc;
      }, {});

      setImages(transformedData);

      setDefaultImage(updateProduct.image);
    }
  }, [reset, updateProduct]);

  return (
    <div
      className={`fixed inset-0 z-50  flex sm:items-center justify-center ${
        !isOpen && "hidden"
      }`}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal content */}
      <div className="relative bg-white overflow-auto rounded-lg shadow-lg w-full  p-6 flex flex-col max-w-2xl lg:max-w-4xl">
        {/* Modal header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Update New Product</h3>

          <button
            type="button"
            className="text-gray-400 hover:bg-gray-200 rounded-full p-1"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="flex-grow">
          {/* Product Info */}
          <div className="flex flex-col  gap-4 p-2">
            <div className="">
              <div className="mx-auto rounded-lg flex flex-col sm:flex-row gap-6 ">
                {/* Product Information Section */}
                <div className="">
                  <h2 className="text-lg font-semibold">Product Information</h2>

                  <div>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={product.name}
                      rules={{ required: "Product name is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Product Name"
                          className="w-full p-2 border rounded mt-2"
                        />
                      )}
                    />
                    {errors?.name && (
                      <p className="text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Controller
                      name="brand"
                      control={control}
                      defaultValue={product.brand}
                      rules={{ required: "Brand name is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Brand"
                          className="w-full p-2 border rounded mt-2"
                        />
                      )}
                    />
                    {errors?.name && (
                      <p className="text-red-500">{errors.brand.message}</p>
                    )}
                  </div>

                  <div>
                    {" "}
                    <Controller
                      name="description"
                      control={control}
                      defaultValue={product.description}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          placeholder="Description"
                          className="w-full p-2 border rounded mt-2"
                        />
                      )}
                    />
                  </div>

                  {/* Category and Gender dropdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <div className="flex flex-col">
                      <Controller
                        name="category"
                        control={control}
                        defaultValue={product.category}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full p-2 border rounded bg-white"
                            onChange={(e) =>
                              setValue("category", e.target.value)
                            }
                          >
                            <option value="">Select Category</option>
                            <option value="Sports">Sports</option>
                            <option value="Sunglasses">Sunglasses</option>
                            <option value="ACCESSOIRES">Accessories</option>
                          </select>
                        )}
                      />
                      {errors?.category && (
                        <p className="text-red-500">
                          {errors.category.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <Controller
                        name="gender"
                        control={control}
                        defaultValue={product.gender}
                        rules={{ required: "Gender is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full p-2 border rounded bg-white"
                            onChange={(e) => setValue("gender", e.target.value)}
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        )}
                      />
                      {errors?.gender && (
                        <p className="text-red-500">{errors.gender.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Numeric fields validation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <div className="flex flex-col">
                      <Controller
                        name="price"
                        control={control}
                        defaultValue={product.price}
                        rules={{
                          required: "Price is required",
                          pattern: {
                            value: /^[0-9]+(\.[0-9]{1,2})?$/,
                            message: "Invalid price format",
                          },
                        }}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            placeholder="Price"
                            className="w-full p-2 border rounded"
                          />
                        )}
                      />
                      {errors?.price && (
                        <p className="text-red-500">{errors.price.message}</p>
                      )}
                    </div>
                    <div>
                      <Controller
                        name="newPrice"
                        control={control}
                        defaultValue={product.newPrice}
                        rules={{ required: "New price is required" }}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            placeholder="New Price"
                            className="w-full p-2 border rounded"
                          />
                        )}
                      />{" "}
                      {errors?.newPrice && (
                        <p className="text-red-500">
                          {errors.newPrice.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Other Inputs */}
                  <div>
                    <Controller
                      name="weight"
                      control={control}
                      defaultValue={product.weight}
                      rules={{ required: "weight is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Weight"
                          className="w-full p-2 border rounded mt-2"
                        />
                      )}
                    />
                    {errors?.weight && (
                      <p className="text-red-500">{errors.weight.message}</p>
                    )}
                  </div>
                  <div>
                    <Controller
                      name="quantity"
                      control={control}
                      defaultValue={product.quantity}
                      rules={{ required: "quantity is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Quantity"
                          className="w-full p-2 border rounded mt-2"
                        />
                      )}
                    />
                    {errors?.quantity && (
                      <p className="text-red-500">{errors.quantity.message}</p>
                    )}
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
                  {/* --------------------------- */}
                  <div className="mb-4 border p-4 rounded ">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold">
                          Default Image :{" "}
                        </h2>
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
                            src={
                              defaultImage instanceof File
                                ? URL.createObjectURL(defaultImage)
                                : getImageUrl(defaultImage)
                            }
                            alt={`Product in ${activeColor}`}
                            className="w-16 h-16 object-cover rounded"
                          />

                          <CircleX
                            className="bg-white text-gray-600 rounded-full absolute -top-3 -right-3 cart-product-update-icon"
                            onClick={() => removeDefaultImage(defaultImage)}
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

                  <h2 className="text-lg font-semibold">
                    Select Available Colors
                  </h2>
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
                        onChangeComplete={(color) =>
                          setSelectedColor(color.hex)
                        }
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
                    <div
                      style={{ borderColor: "red !important " }}
                      className={` mt-4 border p-4 rounded `}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <h2 className="text-lg font-semibold">
                            Upload Images for
                          </h2>
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
                              src={
                                file instanceof File
                                  ? URL.createObjectURL(file)
                                  : getImageUrl(file)
                              }
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
                              handleFileUpload(
                                activeColor,
                                Array.from(e.target.files)
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col items-center border-t justify-center mt-6">
                {/* Show error message if images are missing */}
                {imageError && (
                  <p className="text-red-500 text-sm mb-2">{imageError}</p>
                )}

                <div className="flex justify-end p-4 border-gray-200">
                  <button
                    type="submit"
                    className="text-white bg-black/90 hover:bg-black/80 rounded-lg px-4 py-2"
                    onClick={handleSubmit(handleFormSubmit)}
                    disabled={loading} // Disable button when loading
                  >
                    {loading ? (
                      <Loader2 className="animate-spin mr-2" size={20} />
                    ) : (
                      "Submit Product"
                    )}{" "}
                  </button>
                </div>

                {/* <button
          type="submit"
          className="p-3 border bill-checkout-button sm:w-1/3 flex items-center justify-center"
          onClick={handleSubmit(handleFormSubmit)}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <Loader2 className="animate-spin mr-2" size={20} />
          ) : (
            "Submit Product"
          )}
        </button> */}
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
