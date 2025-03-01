import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../ui/TextInput";
import SelectInput from "../../ui/SelectInput";
import NumberInput from "../../ui/NumberInput";

// Validation schema for variant form using Zod
const variantSchema = z.object({
  color: z.string().min(1, "Color is required"),
  size: z.enum(["M", "L", "XL"], {
    errorMap: () => ({ message: "Size is required" }),
  }),
  qte: z.string().min(1, "Quantity is required"),
  images: z.any(z.instanceof(File)).optional(), // Optional images field, accepting an array of files
});

const VariantForm = ({ setVariants }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(variantSchema),
  });

  const onSubmit = (data) => {
    setVariants((prev) => [...prev, data]);
    reset(); // Reset the form after submission
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 shadow-sm rounded-md"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Color Input */}
        <div>
          <TextInput
            label="Color"
            name="color"
            errors={errors}
            register={register}
          />
        </div>

        {/* Size Input */}
        <div>
          <SelectInput
            label="Size"
            name="size"
            options={["M", "L", "XL"]}
            errors={errors}
            register={register}
          />
        </div>

        {/* Quantity Input */}
        <div>
          <NumberInput
            label="Quantity"
            name="qte"
            errors={errors}
            register={register}
          />
        </div>

        {/* Images Input */}
        <div>
          <label>Images</label>
          <input
            type="file"
            {...register("images")}
            multiple
            className={`border p-2 w-full ${
              errors.images ? "border-red-500" : ""
            }`}
          />
          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images.message}</p>
          )}
        </div>
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4">
        Add Variant
      </button>
    </form>
  );
};

export default VariantForm;
