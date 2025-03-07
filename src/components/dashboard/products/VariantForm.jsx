import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "../../ui/SelectInput";
import NumberInput from "../../ui/NumberInput";
import ColorPickerField from "./ColorPickerField";
import { CircleX, Upload } from "lucide-react";
import { getImageUrl } from "../../../utils/getImageUrl";
import { useDispatch } from "react-redux";
import { updateStock } from "../../../store/productSlice";

const variantSchema = z.object({
  color: z.string().min(1, "Color is required"),
  size: z.string().min(1, "Size is required"),
  qte: z.number().min(0, "Quantity is required"),
  images: z.any().optional(),
});

const VariantForm = ({
  setVariants,
  images,
  setImages,
  variant,
  setRemovedImages,
  handleEditButton,
}) => {
  // State
  const [stockQty, setStockQty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedQty, setAddedQty] = useState(0);
  const [loadingQty, setLoadingQty] = useState(false);

  // hooks
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(variantSchema),
  });

  useEffect(() => {
    if (variant) {
      reset(variant);
      setImages(variant?.images?.map((item) => item.image) || []);
      setStockQty(variant?.stock?.quantity || 0);
    } else {
      reset({ size: null, color: null, qte: null });
      setStockQty(0);
    }
  }, [variant, reset, setImages]);

  const onSubmit = async (data) => {
    try {
      setVariants({ ...data, images });
      reset();
      setImages([]);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleStockUpdate = async () => {
    setLoadingQty(true);
    const qty = Number(addedQty);
    if (qty > 0) {
      const newStock = stockQty + qty;

      const res = await dispatch(updateStock({ qty, id: variant.id }));

      console.log("🚀 ~ handleStockUpdate ~ res:", res);
      if (res.payload) {
        setStockQty(newStock);
        setIsModalOpen(false);
        setAddedQty(0);
        // console.log("Updating stock quantity in database...", newStock);
      }

      setLoadingQty(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setRemovedImages((prev) => [...prev, images[index]]);
  };

  const handleCancelButton = () => {
    setImages([]);
    setRemovedImages([]);
    reset({ size: null, color: "#000000", qte: null });
    handleEditButton(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 shadow-sm rounded-md"
    >
      <div className="grid grid-cols-2 gap-4">
        <ColorPickerField
          label="Color"
          name="color"
          setValue={setValue}
          error={errors.color?.message}
          watch={watch}
        />
        <SelectInput
          label="Size"
          name="size"
          options={["SM", "M", "L", "XL", "XXL", "3XL", "4XL"]}
          errors={errors}
          register={register}
        />
        <NumberInput
          label="Initial Quantity"
          name="qte"
          errors={errors}
          register={register}
        />

        {/* Show "Quantity in Stock" only in update mode */}
        {variant && (
          <div className="flex flex-col">
            <label className="font-medium block mb-1 ">Quantity in Stock</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={stockQty}
                readOnly
                className="text-gray-700  p-2  border rounded   w-24 text-center bg-gray-100"
              />
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Add Stock
              </button>
            </div>
          </div>
        )}

        <div className="col-span-2">
          <label>Upload Images</label>
          <div className="flex flex-wrap gap-4 mt-2 border p-3 rounded">
            {images.map((image, index) => (
              <div key={index} className="relative border p-2 rounded">
                <div className="w-20 h-20 overflow-hidden bg-gray-200 flex items-center justify-center">
                  <img
                    alt=""
                    src={
                      image instanceof File
                        ? URL.createObjectURL(image)
                        : getImageUrl(String(image))
                    }
                  />
                </div>
                <button
                  type="button"
                  className="absolute -top-3 -right-3 bg-white text-gray-700 rounded-full text-xs p-1"
                  onClick={() => handleRemoveImage(index)}
                >
                  <CircleX />
                </button>
              </div>
            ))}

            <div className="border p-2 rounded">
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex justify-center items-center bg-gray-200 w-20 h-20 text-gray-500 text-2xl"
              >
                <Upload />
              </label>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-primary-500 rounded text-white px-4 py-2 mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Processing..."
            : variant
            ? "Update Variant"
            : "Add Variant"}
        </button>
        {variant && (
          <button
            type="button"
            className="bg-red-400 rounded text-white px-4 py-2 mt-4"
            onClick={handleCancelButton}
          >
            Cancel
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Enter Quantity to Add
            </h2>
            <input
              type="number"
              className="border rounded px-2 py-1 w-full mb-4"
              value={addedQty}
              onChange={(e) => setAddedQty(e.target.value)}
              min="1"
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleStockUpdate}
                disabled={loadingQty}
              >
                {loadingQty ? "Loading..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default VariantForm;
