import React, { useState } from "react";
import VariantForm from "../../../../components/dashboard/products/VariantForm";
import VariantGrid from "../../../../components/dashboard/products/VariantGrid";
import ProductForm from "../../../../components/dashboard/products/ProductForm";

const ProductCreation = () => {
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);

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
      <ProductForm onSubmit={onSubmit} />

      {product && (
        <div className="mt-6 p-6 bg-white  rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Add Variants</h2>
          <VariantForm setVariants={setVariants} />
          <VariantGrid variants={variants} />
        </div>
      )}
    </div>
  );
};

export default ProductCreation;
