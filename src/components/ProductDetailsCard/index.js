import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { addCartItem } from "../../store/cartSlice";
import { addWishlistItem, removeWishlistItem } from "../../store/wishlistSlice";
import { useEffect, useState } from "react";
import { BiSolidBookmarkHeart } from "react-icons/bi";
import { BsHandbagFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductDetails,
  getProductsByCategory,
} from "../../store/productDetailsSlice";
import Loader from "../Loader";
import ErrorCard from "../ErrorCard";
import { statusCode } from "../../utils/statusCode";

import "./index.css";
// import useApplyFilters from "../../utils/useApplyFilters";
import { getImageUrl } from "../../utils/getImageUrl";
import ProductModal from "../modals/ProductModal.jsx";
import { RecommandedProducts } from "../Products/RecommandedProducts.jsx";

const ProductDetailsCard = (props) => {
  const productId = useParams("id");
  const dispatch = useDispatch();

  // Hooks
  const {
    data,
    status,
    relatedProducts: filteredData,
  } = useSelector((state) => state.productDetails);

  // const filteredData = useApplyFilters();

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

  const [visibleItems, setVisibleItems] = useState(4);
  const [isOpen, setIsOpen] = useState(false);

  // this state for loasing more recommanded products
  const handleShowMore = () => {
    setVisibleItems(visibleItems + 4); // Load 4 more items each time
  };

  const [imagesIndex, setImagesIndex] = useState(0);

  const [loading, setLoading] = useState(true);

  const cartProducts = useSelector((state) => state.cart);
  const wishlistProducts = useSelector((state) => state.wishlist);

  useEffect(() => {
    setIsAddedToCart(cartProducts.some((product) => product.id === id));
  }, [cartProducts, id]);

  useEffect(() => {
    setIsAddedToWishlist(wishlistProducts.some((product) => product.id === id));
  }, [wishlistProducts, id]);

  useEffect(() => {
    (async () => {
      dispatch(getProductsByCategory("ACCESSOIRES"));
      await dispatch(getProductDetails(productId.id));
      setLoading(false);
    })();
  }, [dispatch, productId.id]);

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

  if (loading && !detail) return <Loader />;

  // Recommanded Products
  const renderRecommandedProducts = () => (
    <div className=" mt-4 ">
      <hr className=" my-4 " />
      <div className="flex justify-between">
        {/* Title in French */}
        <h1 className=" font-bold ">Produits Recommandés</h1>

        {/* Show More button */}
        {filteredData.length > visibleItems && (
          <button
            className="show-more-button underline "
            onClick={handleShowMore}
          >
            Voir plus
          </button>
        )}
      </div>

      {/* recommended Product List */}
      <RecommandedProducts products={filteredData} allowDetails={true} />
    </div>
  );

  const renderProductDetailsCardSuccessView = () => (
    <div className="flex flex-col">
      <ProductModal
        accessories={filteredData}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        product={data}
      />

      <div className="product-details-card gap-5 pt-8">
        <div>
          <div className="relative h-[85%] p-7 bg-black/[0.075] flex items-center justify-center rounded-lg">
            <img
              className="product-details-card-image"
              src={
                displayImage ? getImageUrl(displayImage) : getImageUrl(image)
              }
              alt="productImage"
            />
          </div>

          {/* Display images */}
          <div>
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {data?.detail &&
                data?.detail[imagesIndex]?.images?.map((item, index) => (
                  <img
                    key={index}
                    src={getImageUrl(item?.image)}
                    alt="Thumbnail 1"
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={() => {
                      setDisplayImage(item.image);
                    }}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="p-4 product-details-card-description">
          <h1 className="product-details-card-title">{name}</h1>
          <p className="product-details-card-info">{description}</p>
          <div className="flex gap-1 py-2">
            <p className="product-details-card-rating flex">
              <AiFillStar className="color-yellow" />
              <AiFillStar className="color-yellow" />
              <AiFillStar className="color-yellow" />
              <AiFillStar className="color-yellow" />
              <AiFillStar className="color-yellow" />
            </p>
            <div>
              <span className="text-gray-400">({rating}) Rating</span>
            </div>
          </div>
          <p className="about-product-text pt-2">About Product</p>
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

          {/* Show colors */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Color:</h3>
            <div className="flex space-x-2">
              {detail?.map((item, index) => (
                <button
                  key={index}
                  style={{ backgroundColor: item.color }}
                  className={`w-8 h-8  rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300`}
                  onClick={() => {
                    setImagesIndex(index);
                  }}
                ></button>
              ))}
            </div>
          </div>

          <p className="product-details-card-price">
            <span>Price: </span> MAD{newPrice} <del>MAD{price}</del>
          </p>
          <div className="product-details-card-buttons">
            <button
              type="button"
              className="product-details-card-cart-button"
              onClick={addToCart}
            >
              <span>
                <BsHandbagFill />
              </span>{" "}
              Add to Cart
            </button>
            {!isAddedToWishlist && (
              <button
                type="button"
                className="product-details-card-cart-button"
                onClick={addToWishlist}
              >
                <span>
                  <BiSolidBookmarkHeart />
                </span>{" "}
                Wishlist Item
              </button>
            )}
            {isAddedToWishlist && (
              <button
                type="button"
                className="product-details-card-cart-button"
                onClick={removeFromWishlist}
              >
                <span>
                  <BiSolidBookmarkHeart />
                </span>
                Remove from Wishlist
              </button>
            )}
          </div>
        </div>
      </div>
      <div>{renderRecommandedProducts()}</div>
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
