import { Link } from "react-router-dom";
import { BiSolidBookmarkHeart } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../store/cartSlice";
import { addWishlistItem, removeWishlistItem } from "../../store/wishlistSlice";
import { getImageUrl } from "../../utils/getImageUrl";

const ProductCard = ({ product }) => {
  const { id, name, brand, rating, price, newPrice, image } = product;
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  const cartProducts = useSelector((state) => state.cart);
  const wishlistProducts = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAddedToCart(cartProducts.some((product) => product.id === id));
  }, [cartProducts, id]);

  useEffect(() => {
    setIsAddedToWishlist(wishlistProducts.some((product) => product.id === id));
  }, [wishlistProducts, id]);

  const addToCart = () => {
    setIsAddedToCart(true);
    dispatch(addCartItem({ ...product, qty: 1 }));
  };

  const addToWishlist = () => {
    setIsAddedToWishlist(true);
    dispatch(addWishlistItem(product));
  };

  const removeFromWishlist = () => {
    setIsAddedToWishlist(false);
    dispatch(removeWishlistItem(id));
  };

  return (
    <div className="rounded-lg flex flex-col overflow-hidden bg-gray-200 shadow-sm transition-transform hover:scale-[1.01] min-w-[150px] max-w-[120px] sm:max-w-[150px]">
      <Link
        to={`/product/${id}`}
        className="flex items-center justify-center overflow-hidden"
      >
        <img
          src={getImageUrl(image)}
          alt="productImage"
          className="object-contain w-full h-32 sm:h-48"
        />
      </Link>
      <div className="bg-white flex flex-col flex-grow p-2 sm:p-3">
        <section className="flex">
          <div className="flex flex-col">
            <h2 className="text-black text-sm sm:text-lg font-medium">
              {name}
            </h2>
            <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
              <span>{rating}</span>
              <AiFillStar className="text-yellow-400" />
              <span className="text-xs">Rating</span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">{brand}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-orange-600 text-sm sm:text-lg font-medium">
              MAD {newPrice}
            </p>
            <del className="text-gray-500 text-xs sm:text-sm">MAD {price}</del>
          </div>
        </section>
        <hr className="my-1 sm:my-2" />
        <section className="flex justify-between items-center">
          {!isAddedToCart ? (
            <button
              type="button"
              className="px-2 sm:px-4 py-1 border border-black text-black rounded-full text-xs sm:text-sm hover:bg-black hover:text-white transition"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          ) : (
            <Link to="/cart" className="text-center">
              <button
                type="button"
                className="px-2 sm:px-4 py-1 border border-black text-black rounded-full text-xs sm:text-sm hover:bg-black hover:text-white transition"
              >
                Go to Cart
              </button>
            </Link>
          )}
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

export default ProductCard;
