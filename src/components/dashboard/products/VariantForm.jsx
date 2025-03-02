import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "../../ui/SelectInput";
import NumberInput from "../../ui/NumberInput";
import ColorPickerField from "./ColorPickerField";
import { CircleX, Upload } from "lucide-react";
import { getImageUrl } from "../../../utils/getImageUrl";

// Validation schema using Zod
const variantSchema = z.object({
  color: z.string().min(1, "Color is required"),
  size: z.enum(["M", "L", "XL"], {
    errorMap: () => ({ message: "Size is required" }),
  }),
  qte: z.string().min(1, "Quantity is required"),
  images: z.any().optional(),
});

const VariantForm = ({ setVariants, images, setImages, variant }) => {
  console.log("🚀 ~ VariantForm ~ images:", images);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(variantSchema),
    defaultValues: variant,
  });

  const onSubmit = (data) => {
    // Send actual files in the images field
    setVariants({ ...data, images: images.map((img) => img) });
    reset();
    setImages([]); // Reset images state after submission
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    const newImages = files.map((file) => file);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 shadow-sm rounded-md"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Color Picker Input */}
        <ColorPickerField
          label="Color"
          name="color"
          setValue={setValue}
          error={errors.color?.message}
        />

        {/* Size Input */}
        <SelectInput
          label="Size"
          name="size"
          options={["M", "L", "XL"]}
          errors={errors}
          register={register}
        />

        {/* Quantity Input */}
        <NumberInput
          label="Quantity"
          name="qte"
          errors={errors}
          register={register}
        />

        {/* Images Input */}
        <div className="col-span-2">
          <label>Upload Images</label>
          <div className="flex flex-wrap gap-4 mt-2 border p-3 rounded">
            {/* Display Uploaded Images as Boxes */}
            {images.map((image, index) => (
              <div key={index} className="relative border p-2 rounded">
                <div
                  className="w-20 h-20 bg-gray-200 flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${
                      image instanceof File
                        ? URL.createObjectURL(image)
                        : getImageUrl(image)
                    })`,
                    backgroundSize: "cover",
                  }}
                />
                <button
                  type="button"
                  className="absolute -top-3 -right-3 bg-white text-gray-700 rounded-full text-xs p-1"
                  onClick={() => handleRemoveImage(index)}
                >
                  <CircleX />
                </button>
              </div>
            ))}

            {/* Upload Image Button */}
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

      {/* Submit Button */}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4">
        Add Variant
      </button>
    </form>
  );
};

export default VariantForm;
