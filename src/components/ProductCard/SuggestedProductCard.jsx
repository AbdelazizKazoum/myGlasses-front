import { Link } from "react-router-dom";
import { BiSolidBookmarkHeart } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai"; // Checked icon
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem } from "../../store/cartSlice";
import { addWishlistItem, removeWishlistItem } from "../../store/wishlistSlice";
import { getImageUrl } from "../../utils/getImageUrl";

const SuggestedProductCard = ({ variant, allowDetails }) => {
  const { id, name, brand, rating, price, newPrice, image } = variant.product;
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  const cartProducts = useSelector((state) => state.cart);
  const wishlistProducts = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAddedToCart(cartProducts.some((product) => product.id === variant.id));
  }, [cartProducts, variant.id]);

  useEffect(() => {
    setIsAddedToWishlist(wishlistProducts.some((product) => product.id === id));
  }, [wishlistProducts, id]);

  const addToCart = (e) => {
    e.stopPropagation(); // Prevent card click behavior when adding/removing cart item
    if (isAddedToCart) {
      dispatch(removeCartItem(variant.id));
    } else {
      dispatch(
        addCartItem({
          ...variant,
          name,
          price,
          newPrice,
          color: variant?.color,
          size: variant?.size,
          image: variant?.images[0].image,
          availableQuantity: variant?.stock?.quantity,
          qty: 1,
        })
      );
      setIsAddedToCart(true);
    }
  };

  const addToWishlist = () => {
    setIsAddedToWishlist(true);
    dispatch(addWishlistItem(variant));
  };

  const removeFromWishlist = () => {
    setIsAddedToWishlist(false);
    dispatch(removeWishlistItem(id));
  };

  return (
    <div
      onClick={addToCart}
      className={`relative rounded-lg flex flex-col overflow-hidden bg-gray-200 shadow-sm transition-transform sm:min-w-[200px] sl:max-w-[200px] sm:max-w-[150px] ${
        isAddedToCart ? " " : "hover:scale-[1.01]"
      }`}
    >
      {/* Checked Icon Overlay */}
      {isAddedToCart && (
        <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-black/40">
          <AiOutlineCheckCircle className="text-white text-5xl" />

          {/* "Go to Cart" Button */}
          <Link
            to="/cart"
            className=" bg-orange-600 text-white py-1 px-4 rounded-full text-sm"
          >
            Go to Cart
          </Link>
        </div>
      )}

      <Link
        to={allowDetails && `/product/${id}`}
        className="flex items-center justify-center overflow-hidden"
      >
        <img
          src={getImageUrl(
            variant.images.length > 0 ? variant?.images[0].image : image
          )}
          alt="productImage"
          className="object-cover  w-full h-32 sm:h-48"
        />
      </Link>

      <div className="bg-white flex flex-col flex-grow p-2 sm:p-3">
        <section className="flex justify-between">
          <div className="flex flex-col">
            <h2 className="text-black text-sm sm:text-lg font-medium">
              {name}
            </h2>
            {variant.color && (
              <div className="flex items-center mt-0 mb-2">
                color :
                <span
                  style={{ backgroundColor: variant.color }}
                  className=" mx-2 w-4 h-4 rounded-full"
                ></span>
                Size : <span className=" ml-2">{variant.size}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
              <span>{rating}</span>
              <AiFillStar className="text-yellow-400" />
              <span className="text-xs">Rating</span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">{brand}</p>
          </div>
          <div className="flex flex-col flex-nowrap justify-end items-end">
            <p className="text-orange-600 text-sm sm:text-sm font-medium">
              MAD {newPrice}
            </p>
            <del className="text-gray-500 text-xs sm:text-sm">MAD {price}</del>
          </div>
        </section>
        <hr className="my-1 sm:my-2" />
        <section className="flex justify-between items-center">
          <button
            type="button"
            className={`px-2 sm:px-4 py-1 border border-black rounded-full text-xs sm:text-sm transition ${
              isAddedToCart
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "text-black hover:bg-black hover:text-white"
            }`}
            onClick={addToCart}
            disabled={isAddedToCart}
          >
            {isAddedToCart ? "✔️ Added" : "Add to Cart"}
          </button>

          {!isAddedToWishlist ? (
            <BiSolidBookmarkHeart
              className="text-xl sm:text-2xl text-black cursor-pointer"
              onClick={addToWishlist}
            />
          ) : (
            <BiSolidBookmarkHeart
              className="text-xl sm:text-2xl text-red-500 cursor-pointer"
              onClick={removeFromWishlist}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default SuggestedProductCard;
