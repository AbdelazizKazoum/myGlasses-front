import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "../../ui/SelectInput";
import NumberInput from "../../ui/NumberInput";
import ColorPickerField from "./ColorPickerField";
import { CircleX, Upload } from "lucide-react";

// Validation schema using Zod
const variantSchema = z.object({
  color: z.string().min(1, "Color is required"),
  size: z.enum(["M", "L", "XL"], {
    errorMap: () => ({ message: "Size is required" }),
  }),
  qte: z.string().min(1, "Quantity is required"),
  images: z.any().optional(),
});

const VariantForm = ({ setVariants }) => {
  const [images, setImages] = useState([]);
  console.log("🚀 ~ VariantForm ~ images:", images);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(variantSchema),
  });

  const onSubmit = (data) => {
    setVariants({ ...data, images });
    reset();
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const newImages = [...images];
    for (let i = 0; i < e.target.files.length; i++) {
      newImages.push(URL.createObjectURL(e.target.files[i])); // Create an object URL for preview
    }
    setImages(newImages);
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
        <div className=" col-span-2 ">
          <label>Upload Images</label>
          <div className="flex flex-wrap gap-4 mt-2  border p-3 rounded">
            {/* Display Uploaded Images as Boxes */}
            {images.map((image, index) => (
              <div key={index} className="relative border p-2 rounded ">
                <div
                  className="w-20   h-20 bg-gray-200 flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                  }}
                />
                <button
                  type="button"
                  className="absolute -top-3 -right-3 bg-white text-gray-700 rounded-full text-xs p-1"
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                >
                  <CircleX />
                </button>
              </div>
            ))}

            <div className="border p-2 rounded">
              {" "}
              {/* Upload Image Button */}
              <label
                htmlFor="file-upload"
                className="cursor-pointer  flex justify-center items-center bg-gray-200  w-20 h-20 text-gray-500 text-2xl"
              >
                <Upload className="  " />
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
