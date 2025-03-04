import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "../../ui/SelectInput";
import NumberInput from "../../ui/NumberInput";
import ColorPickerField from "./ColorPickerField";
import { CircleX, Upload } from "lucide-react";
import { getImageUrl } from "../../../utils/getImageUrl";

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
    } else {
      reset({ size: null, color: null, qte: null });
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
          label="Quantity"
          name="qte"
          errors={errors}
          register={register}
        />

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
    </form>
  );
};

export default VariantForm;
