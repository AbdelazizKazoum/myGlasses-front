import { useState, useRef } from "react";
import ProductCard from "../ProductCard";
import PropTypes from "prop-types";
import { getImageUrl } from "../../utils/getImageUrl";
import { Link, useNavigate } from "react-router-dom";

const FeaturedProducts = ({ products, allowDetails }) => {
  console.log("🚀 ~ FeaturedProducts ~ products:", products);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4; // Number of items to show at once
  const scrollContainerRef = useRef(null); // Reference for the scroll container

  // Hooks
  const navigate = useNavigate();

  // Handle scrolling left and right
  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - itemsToShow, 0);
      // Scroll smoothly to the new position
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left:
            (newIndex / itemsToShow) * scrollContainerRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
      return newIndex;
    });
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.min(
        prevIndex + itemsToShow,
        products.length - itemsToShow
      );
      // Scroll smoothly to the new position
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left:
            (newIndex / itemsToShow) * scrollContainerRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
      return newIndex;
    });
  };

  return (
    <div>
      <div className="mx-auto  py-20 ">
        <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900">
          Similar Products
        </h2>

        <div className="mt-10 relative">
          <div className="flex justify-between items-center">
            <button
              onClick={handleLeftClick}
              className="p-2 w-8 h-8 flex justify-center items-center text-lg bg-black text-white rounded-full  hover:bg-gray-400"
              disabled={currentIndex === 0}
            >
              &lt;
            </button>

            <div className="overflow-x-auto w-full mx-3">
              <div
                ref={scrollContainerRef} // Assign the ref to the scroll container
                className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
              >
                {products
                  .slice(currentIndex, currentIndex + itemsToShow)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="group relative cursor-pointer"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      <div className="lg:aspect-auto lg:h-40 bg-black/[0.075]">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="aspect-square w-full h-full cursor-pointer rounded-md object-contain group-hover:opacity-75"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            ></span>
                            {item.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.brand}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <button
              onClick={handleRightClick}
              className="p-2 w-8 h-8 flex justify-center items-center text-lg bg-black text-white rounded-full  hover:bg-gray-400"
              disabled={currentIndex + itemsToShow >= products.length}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

FeaturedProducts.propTypes = {
  products: PropTypes.array.isRequired,
  allowDetails: PropTypes.bool,
};

export default FeaturedProducts;
