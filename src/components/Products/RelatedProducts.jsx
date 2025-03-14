import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { getImageUrl } from "../../utils/getImageUrl";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = ({ products, allowDetails }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const navigate = useNavigate();

  const scrollAmount = 300; // How many pixels to scroll on each click

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scroll = direction === "left" ? -scrollAmount : scrollAmount;
      scrollContainerRef.current.scrollBy({ left: scroll, behavior: "smooth" });
    }
  };

  // Check if scroll buttons should be disabled
  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.offsetWidth < container.scrollWidth
      );
    }
  };

  // Listen to scroll changes
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    checkScrollButtons();

    const handleScrollEvent = () => checkScrollButtons();
    container.addEventListener("scroll", handleScrollEvent);
    return () => container.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return (
    <div className="mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">
        You may also like
      </h2>

      <div className="relative mt-3">
        {/* Scroll buttons */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 bg-black text-white w-8 h-8 rounded-full flex justify-center items-center hover:bg-gray-600 disabled:opacity-30"
          disabled={!canScrollLeft}
        >
          &lt;
        </button>

        <div className="overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar scroll-px-4"
          >
            {products.map((item) => (
              <div
                key={item.id}
                className="min-w-[220px] max-w-[250px] flex-shrink-0 cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="bg-gray-100 rounded-md aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-full h-full object-contain transition group-hover:opacity-75"
                  />
                </div>
                <div className="mt-3 text-center">
                  <h3 className="text-sm text-gray-700 font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-primary-500 font-medium">
                    {item.price} MAD
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 bg-black text-white w-8 h-8 rounded-full flex justify-center items-center hover:bg-gray-600 disabled:opacity-30"
          disabled={!canScrollRight}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

FeaturedProducts.propTypes = {
  products: PropTypes.array.isRequired,
  allowDetails: PropTypes.bool,
};

export default FeaturedProducts;
