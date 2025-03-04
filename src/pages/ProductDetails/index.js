import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { addCartItem } from "../../store/cartSlice.js";
import { AlertCircle } from "lucide-react";

import {
  addWishlistItem,
  removeWishlistItem,
} from "../../store/wishlistSlice.js";
import { useEffect, useMemo, useState } from "react";
import { BsHandbagFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  getAccessoires,
  getProductDetails,
  getProductsByCategory,
} from "../../store/productDetailsSlice.js";
import Loader from "../../components/Loader/index.js";
import ErrorCard from "../../components/ErrorCard/index.js";
import { statusCode } from "../../utils/statusCode.js";

import "./index.css";
// import useApplyFilters from "../../utils/useApplyFilters";
import { getImageUrl } from "../../utils/getImageUrl.js";
import ProductModal from "../../components/modals/ProductModal.jsx";
import { Heart } from "lucide-react";
import RelatedProducts from "../../components/Products/RelatedProducts.jsx";

const ProductDetailsCard = (props) => {
  // Hooks
  const productId = useParams("id");
  const dispatch = useDispatch();
  const {
    data,
    status,
    relatedProducts: categoryProducts,
    accessoires,
  } = useSelector((state) => state.productDetails);

  const {
    id,
    brand,
    category,
    gender,
    description,
    name,
    image,
    newPrice,
    price,
    rating,
    weight,
    detail,
  } = data;

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [displayImage, setDisplayImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const cartProducts = useSelector((state) => state.cart);
  const wishlistProducts = useSelector((state) => state.wishlist);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState();
  const [showVariantAlert, setShowVariantAlert] = useState(false); // To show the alert message
  const [variantQty, setVariantQty] = useState(null); // To store the quantity of the selected variant

  // Extract unique colors and sizes
  const uniqueColors = useMemo(() => {
    return [...new Set(detail?.map((item) => item.color))];
  }, [detail]);
  const uniqueSizes = useMemo(() => {
    return [
      ...new Set(detail?.map((item) => item.size).filter((size) => size)),
    ];
  }, [detail]);

  useEffect(() => {
    setIsAddedToCart(cartProducts.some((product) => product.id === id));
  }, [cartProducts, id]);

  useEffect(() => {
    setIsAddedToWishlist(wishlistProducts.some((product) => product.id === id));
  }, [wishlistProducts, id]);

  useEffect(() => {
    (async () => {
      await dispatch(getProductDetails(productId.id));

      await dispatch(getProductsByCategory(category));

      await dispatch(getAccessoires());

      setLoading(false);
    })();
  }, [category, dispatch, productId.id]);

  const addToCart = () => {
    setIsOpen(true);
    if (!isAddedToCart) dispatch(addCartItem({ ...data, qty: 1 }));
    setIsAddedToCart(true);
  };

  const addToWishlist = () => {
    dispatch(addWishlistItem(data));
    setIsAddedToWishlist(true);
  };

  const removeFromWishlist = () => {
    dispatch(removeWishlistItem(id));
    setIsAddedToWishlist(false);
  };

  // Handle variant selection
  const handleVariantSelection = (color, size) => {
    setSelectedColor(color);
    setSelectedSize(size);

    // Find the selected variant
    const variant = detail.find(
      (item) => item.color === color && item.size === size
    );

    if (variant) {
      setSelectedVariant(variant);
      setVariantQty(variant?.qte || 0); // Update quantity for the selected variant
      setDisplayImage(variant?.images?.[0]?.image || image); // Set first image or default image
      setShowVariantAlert(false); // Hide alert if variant exists
    } else {
      setSelectedVariant(null);
      setVariantQty(null);
      setShowVariantAlert(true); // Show alert if variant doesn't exist
    }
  };

  if (loading && !detail) return <Loader />;

  const renderProductDetailsCardSuccessView = () => (
    <div className="flex flex-col">
      <ProductModal
        accessories={accessoires}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        product={data}
      />

      <div className="product-details-card gap-5 pt-8">
        <div>
          {/* bg-black/[0.075] */}
          <div className="relative h-[85%] bg-black/[0.075] p-7 flex items-center justify-center rounded-lg">
            <img
              className="product-details-card-image"
              src={
                displayImage ? getImageUrl(displayImage) : getImageUrl(image)
              }
              alt="productImage"
            />
          </div>

          {/* Display Images */}
          <div className="flex gap-3 py-4 justify-center overflow-x-auto">
            {selectedVariant?.images?.map((item, index) => (
              <div
                className={`  border ${
                  displayImage === item.image && "border-image"
                }  bg-black/[0.075] border-primary-500 p-2 size-14  sm:size-14`}
              >
                {" "}
                <img
                  key={index}
                  src={getImageUrl(item?.image)}
                  alt="Thumbnail 1"
                  className=" h-full w-full object-contain  rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => {
                    setDisplayImage(item.image);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className=" product-details-card-description bg-white rounded">
          <h1 className=" text-3xl font-bold ">{name}</h1>
          <p className="product-details-card-info font-semibold my-2">
            {description}
          </p>
          <div className="flex gap-1 py-2 mb-2">
            <p className="product-details-card-rating flex">
              <AiFillStar className=" text-primary-500 " />
              <AiFillStar className=" text-primary-500 " />
              <AiFillStar className=" text-primary-500 " />
              <AiFillStar className=" text-primary-500 " />
              <AiFillStar className=" text-primary-500 " />
            </p>
            <div>
              <span className="text-gray-400">({rating}) Rating</span>
            </div>
          </div>

          <div>
            <div className=" bg-primary-500/10 p-1.5 rounded flex ">
              <p className="text-primary-500 font-bold">
                Popular frame! 918 people have their eyes on this frame.
              </p>
            </div>
          </div>

          <p className="product-details-card-price">
            <span> Price : </span> MAD{newPrice} <del>MAD{price}</del>
          </p>

          {/* Show Colors */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Color:</h3>
            <div className="flex space-x-2">
              {uniqueColors.map((color, index) => (
                <button
                  key={index}
                  style={{ backgroundColor: color }}
                  className={`w-6 h-6 rounded-full ${
                    selectedColor === color
                      ? "outline-none ring-offset-4 ring-1 ring-primary-500"
                      : ""
                  }`}
                  onClick={() => handleVariantSelection(color, selectedSize)}
                ></button>
              ))}
            </div>
          </div>

          {/* Show Sizes */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Size:</h3>
            <div className="flex space-x-2">
              {uniqueSizes.map((size, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 border rounded ${
                    selectedSize === size
                      ? "bg-primary-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleVariantSelection(selectedColor, size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Show alert if variant doesn't exist */}
          {showVariantAlert && (
            <div className="bg-red-500/10 p-2 rounded flex items-center">
              <AlertCircle className="text-red-500 mr-2" />
              <p className="text-red-500 font-bold">
                Not available. Select a different size or color.
              </p>
            </div>
          )}

          {/* Show quantity or sold out message */}
          {variantQty !== null && variantQty === 0 ? (
            <div className="bg-red-500/10 p-2 rounded flex items-center">
              <AlertCircle className="text-red-500 mr-2" />
              <p className="text-red-500 font-bold">Sold Out</p>
            </div>
          ) : (
            <p className="text-gray-600 text-lg">
              Available Quantity: {variantQty}
            </p>
          )}

          <div
            style={{ backgroundColor: "#FBFAF7" }}
            className=" rounded  p-2 "
          >
            <p className="about-product-text pt-2">About Product</p>
            <hr className="mb-3 mt-2"></hr>
            <div className="about-product-details">
              <li>
                <span>Brand: </span>
                {brand}
              </li>
              <li>
                <span>Gender: </span>
                {gender}
              </li>
              <li>
                <span>Category: </span>
                {category}
              </li>
              <li>
                <span>Weight: </span>
                {weight}
              </li>
            </div>
          </div>

          <div className=" flex h-16 ">
            <button
              type="button"
              className={`product-details-card-cart-button flex justify-center items-center flex-1 text-white border-none 
    ${
      !selectedVariant || variantQty === 0
        ? "bg-gray-400 cursor-not-allowed opacity-50"
        : "bg-primary-500 hover:bg-primary-300"
    }`}
              onClick={addToCart}
              style={{
                pointerEvents:
                  !selectedVariant || variantQty === 0 ? "none" : "auto",
              }}
            >
              {isAddedToCart ? (
                <BsHandbagFill className="mr-2" />
              ) : (
                <BsHandbagFill className="mr-2" />
              )}
              {isAddedToCart ? "Go to cart" : "Add to Cart"}
            </button>

            {!isAddedToWishlist && (
              <button type="button" className=" " onClick={addToWishlist}>
                <Heart className=" hover:text-primary-500  " size={30} />
              </button>
            )}
            {isAddedToWishlist && (
              <button type="button" className="" onClick={removeFromWishlist}>
                <span>
                  <Heart className=" text-primary-500  " size={30} />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        {" "}
        <RelatedProducts products={categoryProducts} allowDetails={true} />
      </div>
    </div>
  );

  const renderProductDetailsCardView = () => {
    switch (status) {
      case statusCode.pending:
        return <Loader />;
      case statusCode.success:
        return renderProductDetailsCardSuccessView();
      case statusCode.failure:
        return <ErrorCard />;
      default:
        return null;
    }
  };

  return renderProductDetailsCardView();
};

export default ProductDetailsCard;
