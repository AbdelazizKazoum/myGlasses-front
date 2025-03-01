import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckboxInput from "../../../../components/ui/CheckboxInput";
import TextInput from "../../../../components/ui/TextInput";
import SelectInput from "../../../../components/ui/SelectInput";
import TextArea from "../../../../components/ui/TextArea";
import NumberInput from "../../../../components/ui/NumberInput";

// Validation schema using Zod
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  weight: z.string().optional(),
  quantity: z.string().min(1, "Quantity is required"),
  price: z.string().min(1, "Price is required"),
  newPrice: z.string().optional(),
  trending: z.boolean().optional(),
});

const ProductCreation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(productSchema),
  });
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);

  const onSubmit = (data) => {
    // Ensure that optional fields like newPrice are handled correctly
    const formattedData = {
      ...data,
      newPrice: data.newPrice || null, // Set newPrice to null if not provided
    };
    setProduct(formattedData); // Set the product state with the submitted data
  };

  return (
    <div className="container mx-auto p-6">
      {/* Product Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 shadow-md rounded-lg"
      >
        <h2 className="text-lg font-semibold mb-4">Create Product</h2>

        {/* Form Container with Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Name Input */}
          <TextInput
            label="Name"
            name="name"
            errors={errors}
            register={register}
          />

          {/* Brand Input */}
          <TextInput
            label="Brand"
            name="brand"
            errors={errors}
            register={register}
          />

          {/* Description Input */}
          <div className=" col-span-2 ">
            <TextArea
              label="Description"
              name="description"
              register={register}
            />
          </div>

          {/* Category Input */}
          <TextInput
            label="Category"
            name="category"
            errors={errors}
            register={register}
          />

          {/* Gender Input */}
          <SelectInput
            label="Gender"
            name="gender"
            options={["Male", "Female"]}
            errors={errors}
            register={register}
          />

          {/* Weight Input */}
          <TextInput
            label="Weight"
            name="weight"
            errors={errors}
            register={register}
          />

          {/* Quantity Input */}
          <NumberInput
            label="Quantity"
            name="quantity"
            errors={errors}
            register={register}
          />

          {/* Price Input */}
          <NumberInput
            label="Price"
            name="price"
            step="0.01"
            errors={errors}
            register={register}
          />

          {/* New Price Input */}
          <NumberInput
            label="New Price"
            name="newPrice"
            step="0.01"
            errors={errors}
            register={register}
          />

          {/* Trending Input */}
          <CheckboxInput label="Trending" name="trending" register={register} />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
          Create Product
        </button>
      </form>

      {product && (
        <div className="mt-6 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Add Variants</h2>
          <VariantForm setVariants={setVariants} />
          <VariantGrid variants={variants} />
        </div>
      )}
    </div>
  );
};

const VariantForm = ({ setVariants }) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    setVariants((prev) => [...prev, data]);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 shadow rounded-md"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Color</label>
          <input
            {...register("color", { required: true })}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Size</label>
          <select
            {...register("size", { required: true })}
            className="border p-2 w-full"
          >
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            {...register("qte", { required: true })}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Images</label>
          <input
            type="file"
            {...register("images")}
            multiple
            className="border p-2 w-full"
          />
        </div>
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4">
        Add Variant
      </button>
    </form>
  );
};

const VariantGrid = ({ variants }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {variants.map((variant, index) => (
        <div key={index} className="bg-white p-4 shadow rounded-md">
          <p>
            <strong>Color:</strong> {variant.color}
          </p>
          <p>
            <strong>Size:</strong> {variant.size}
          </p>
          <p>
            <strong>Quantity:</strong> {variant.qte}
          </p>
          <button className="bg-yellow-500 text-white px-2 py-1 mt-2">
            Update
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCreation;
