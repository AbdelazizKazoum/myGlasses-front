import VariantForm from "../../../../components/dashboard/products/VariantForm";
import VariantGrid from "../../../../components/dashboard/products/VariantGrid";
import ProductForm from "../../../../components/dashboard/products/ProductForm";
import {
  addProduct,
  addVariant,
  getVariants,
  updadeProduct,
  updateVariant,
} from "../../../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

const ProductCreation = () => {
  // State
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]); // Stores actual file objects with previews
  const [editVariant, setEditVariant] = useState(null); // Stores actual file objects with previews
  const [removedImages, setRemovedImages] = useState([]); // We store here the images that must be removed from db while editing the product
  console.log("🚀 ~ ProductCreation ~ removedImages:", removedImages);

  // Hooks
  const dispatch = useDispatch();
  const { product, variants } = useSelector((state) => state.product);

  // Ref to scroll to the bottom after submission
  const bottomRef = useRef(null);

  const submitProduct = async (data) => {
    const formData = new FormData();

    const { image, ...rest } = data;

    formData.append("file", image);
    formData.append("product", JSON.stringify(rest));

    if (product) {
      await dispatch(updadeProduct({ formData, id: product.id }));
    } else {
      await dispatch(addProduct(formData));
    }

    // Scroll to the bottom after submission
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const submitVariant = async (data) => {
    console.log("🚀 ~ submitVariant ~ data:", data);

    const formData = new FormData();

    const { images, ...rest } = data;

    formData.append("variant", JSON.stringify(rest));

    // Check if existed images in db are removed in the update, if true we send it to the api to delete them in the server
    if (removedImages.length > 0) {
      formData.append("removedImages", JSON.stringify(removedImages));
    }

    if (images) {
      images.forEach((image) => {
        formData.append("files", image);
      });
    }

    if (editVariant) {
      const res = await dispatch(
        updateVariant({ formData, id: editVariant.id })
      );
      console.log("🚀 ~ submitVariant ~ res:", res);
    } else {
      const res = await dispatch(addVariant({ formData, id: product.id }));
      console.log("🚀 ~ submitVariant ~ res:", res);
    }

    setEditVariant(null);
    setRemovedImages([]);
    setImages([]);

    // Scroll to the bottom after submission
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleEditButton = (data) => {
    setEditVariant(data);
    setRemovedImages([]);
  };

  useEffect(() => {
    setLoading(true);
    if (product) {
      (async () => {
        await dispatch(getVariants(product.id));
      })();
    }
    setLoading(false);
  }, [dispatch, product]);

  return (
    <div className="container mx-auto p-6">
      {/* Product Form */}
      <ProductForm onSubmit={submitProduct} product={product} />

      {product && (
        <div className="mt-6 p-6 bg-white rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Add Variants</h2>
          <VariantForm
            setVariants={submitVariant}
            images={images}
            setImages={setImages}
            variant={editVariant}
            setRemovedImages={setRemovedImages}
            handleEditButton={handleEditButton}
          />
          <VariantGrid
            variants={variants}
            onEdit={handleEditButton}
            loading={loading}
          />
        </div>
      )}

      {/* Reference for scrolling */}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ProductCreation;
