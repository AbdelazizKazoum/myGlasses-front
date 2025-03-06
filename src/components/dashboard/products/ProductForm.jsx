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
import { setProduct } from "../../../store/productSlice";

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
  quantity: z.number().min(1, "Quantity is required"),
  price: z.number().min(1, "Price is required"),
  newPrice: z.number().optional(),
  trending: z.boolean().optional(),
  image: z
    .union([
      z.instanceof(File, { message: "Invalid file format" }),
      z.string().min(1, "Invalid image string"),
    ])
    .optional(),
});

const ProductForm = ({ onSubmit, product }) => {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting }, // <-- Get isSubmitting from formState
  } = useForm({
    resolver: zodResolver(productSchema),
  });

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

  const handleCancelButton = () => {
    dispatch(setProduct(null));
    setValue("image", null);
  };

  useEffect(() => {
    if (product) {
      reset(product);
      setValue("image", product.image);
    } else {
      reset({
        name: null,
        brand: null,
        category: null,
        description: null,
        gender: null,
        weight: null,
        quantity: null,
        price: null,
        newPrice: null,
        trending: false,
      });
      setValue("image", null);
    }
  }, [product, reset, setValue]);

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
          <div className="row-span-2 col-span-1">
            <ImageUpload
              label="Product Image"
              name="image"
              setValue={setValue}
              errors={errors}
              defaultImage={product ? product.image : null}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-3 mt-4">
            <TextInput
              label="Name"
              name="name"
              errors={errors}
              register={register}
            />
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
          label="Initial Quantity"
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

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-primary-500 rounded text-white px-4 py-2 mt-4 flex items-center justify-center"
          disabled={isSubmitting} // <-- Disable button while submitting
        >
          {isSubmitting ? (
            <>
              <span className="loader mr-2"></span>{" "}
              {/* <-- Simple loading spinner */}
              Processing...
            </>
          ) : product ? (
            "Update Product"
          ) : (
            "Create Product"
          )}
        </button>
        {product && (
          <button
            type="button"
            className="bg-red-400 text-white rounded px-4 py-2 mt-4"
            onClick={() => handleCancelButton()}
          >
            Cancel
          </button>
        )}
      </div>

      {/* CSS for loader animation */}
      <style jsx>{`
        .loader {
          border: 2px solid white;
          border-top: 2px solid transparent;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </form>
  );
};

export default ProductForm;
