import VariantForm from "../../../../components/dashboard/products/VariantForm";
import VariantGrid from "../../../../components/dashboard/products/VariantGrid";
import ProductForm from "../../../../components/dashboard/products/ProductForm";
import {
  addProduct,
  addVariant,
  updadeProduct,
} from "../../../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const ProductCreation = () => {
  // State

  // Hooks
  const dispatch = useDispatch();
  const { product, variants } = useSelector((state) => state.product);
  const [images, setImages] = useState([]); // Stores actual file objects with previews
  const [editVariant, setEditVariant] = useState(null); // Stores actual file objects with previews

  const submitProduct = async (data) => {
    const formData = new FormData();

    const { image, ...rest } = data;

    formData.append("file", image);
    formData.append("product", JSON.stringify(rest));

    if (product) {
      const res = await dispatch(updadeProduct({ formData, id: product.id }));
      console.log("🚀 ~ onSubmit ~ res:", res);
    } else {
      const res = await dispatch(addProduct(formData));
      console.log("🚀 ~ onSubmit ~ res:", res);
    }
  };

  const submitVariant = async (data) => {
    console.log("🚀 ~ submitVariant ~ data:", data);

    const formData = new FormData();

    const { images, ...rest } = data;

    formData.append("variant", JSON.stringify(rest));

    if (images) {
      images.forEach((image) => {
        formData.append("files", image);
      });
    }

    const res = await dispatch(addVariant({ formData, id: product.id }));

    console.log("🚀 ~ submitVariant ~ res:", res);
  };

  const handleEditButton = (data) => {
    console.log("🚀 ~ handleEditButton ~ data:", data);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Product Form */}
      <ProductForm onSubmit={submitProduct} product={product} />

      {product && (
        <div className="mt-6 p-6 bg-white  rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Add Variants</h2>
          <VariantForm
            setVariants={submitVariant}
            images={images}
            setImages={setImages}
            variant={editVariant}
          />
          <VariantGrid variants={variants} onEdit={handleEditButton} />
        </div>
      )}
    </div>
  );
};

export default ProductCreation;
