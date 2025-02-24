import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { addCartItem } from "../../store/cartSlice.js";
import {
  addWishlistItem,
  removeWishlistItem,
} from "../../store/wishlistSlice.js";
import { useEffect, useState } from "react";
import { BsHandbagFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
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
import useApplyFilters from "../../utils/useApplyFilters.js";
import { getProducts } from "../../store/productsSlice.js";

const ProductDetailsCard = (props) => {
  const productId = useParams("id");
  const dispatch = useDispatch();

  // Hooks
  const {
    data,
    status,
    relatedProducts: filteredData,
  } = useSelector((state) => state.productDetails);

  const productsData = useApplyFilters();

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
      if (productsData?.length === 0) {
        dispatch(getProducts());
      }
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

          {/* Display images */}
          <div>
            <div className="flex gap-3 py-4 justify-center overflow-x-auto  ">
              {data?.detail &&
                data?.detail[imagesIndex]?.images?.map((item, index) => (
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

          {/* Show colors */}
          <div className="mb-6">
            {/* <h3 className="text-lg font-semibold mb-2">Color:</h3> */}
            <div className="flex space-x-2">
              {detail?.map((item, index) => (
                <button
                  key={index}
                  style={{ backgroundColor: item.color }}
                  className={` ${
                    imagesIndex === index
                      ? "outline-none ring-offset-4 ring-1 ring-primary-500  "
                      : ""
                  } w-6  h-6  rounded-full focus:outline-none `}
                  onClick={() => {
                    setImagesIndex(index);
                    setDisplayImage(data?.detail[index]?.images[0]?.image);
                  }}
                ></button>
              ))}
            </div>
          </div>

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
              className="product-details-card-cart-button flex justify-center items-center flex-1 bg-primary-500 border-none text-white hover:bg-primary-300 "
              onClick={addToCart}
            >
              <span>
                <BsHandbagFill />
              </span>{" "}
              Add to Cart
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
        <RelatedProducts products={productsData} allowDetails={true} />
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
