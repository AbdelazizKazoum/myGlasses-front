import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../ui/TextInput";
import TextArea from "../../ui/TextArea";
import SelectInput from "../../ui/SelectInput";
import NumberInput from "../../ui/NumberInput";
import CheckboxInput from "../../ui/CheckboxInput";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../store/categorySlice";
import Loader from "../../Loader";
import AdminError from "../../ErrorCard/AdminError";
import ImageUpload from "../../ui/ImageUpload";

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
  image: z.instanceof(File, { message: "Image is required" }).optional(),
});

const ProductForm = ({ onSubmit, product }) => {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await dispatch(getCategories());
      if (res.payload) {
        setCategories(res.payload.map((item) => item.displayText));
        setError(null);
      } else {
        setCategories(null);
        setError("Failed to load product form");
      }
      setLoading(false);
    })();
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: product ?? {
      name: "test",
      description: "TEST",
      brand: "test",
      category: "Sports",
      gender: "Male",
      weight: "100",
      quantity: "00",
      price: "40",
      newPrice: "10",
      trending: true,
      image: null,
    },
  });

  if (loading) return <Loader />;
  if (error) return <AdminError message={error} />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 shadow-md rounded-lg"
    >
      <h2 className="text-lg font-semibold mb-4">Create Product</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className=" col-span-2 gap-4 grid grid-cols-3 ">
          {" "}
          <div className=" row-span-2 col-span-1 ">
            <ImageUpload
              label="Product Image"
              name="image"
              setValue={setValue}
              errors={errors}
            />
          </div>
          <div className=" col-span-2 flex flex-col gap-3 mt-4">
            <TextInput
              label="Name"
              name="name"
              errors={errors}
              register={register}
            />{" "}
            <TextInput
              label="Brand"
              name="brand"
              errors={errors}
              register={register}
            />
            <SelectInput
              label="Category"
              name="category"
              options={categories}
              errors={errors}
              register={register}
            />
          </div>
        </div>

        <div className="col-span-2">
          <TextArea
            label="Description"
            name="description"
            register={register}
          />
        </div>

        <SelectInput
          label="Gender"
          name="gender"
          options={["Male", "Female"]}
          errors={errors}
          register={register}
        />
        <TextInput
          label="Weight"
          name="weight"
          errors={errors}
          register={register}
        />
        <NumberInput
          label="Quantity"
          name="quantity"
          errors={errors}
          register={register}
        />
        <NumberInput
          label="Price"
          name="price"
          step="0.01"
          errors={errors}
          register={register}
        />
        <NumberInput
          label="New Price"
          name="newPrice"
          step="0.01"
          errors={errors}
          register={register}
        />
        <CheckboxInput label="Trending" name="trending" register={register} />
      </div>

      <button
        type="submit"
        className="bg-primary-500 text-white px-4 py-2 mt-4"
      >
        {product ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
};

export default ProductForm;
