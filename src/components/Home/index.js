import { Link, useNavigate } from "react-router-dom";
import { BsArrowDownRightCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import TrendingProductCard from "../TrendingProductCard";
import CategoryCard from "../CategoryCard";

import "./index.css";
import { useEffect, useRef, useState } from "react";
import { getProducts } from "../../store/productsSlice";
import { categoriesList } from "../../eyesomeData";
import { statusCode } from "../../utils/statusCode";
import Loader from "../Loader";
import ErrorCard from "../ErrorCard";
import ScrollToTop from "../ScrollToTop";
import CarouselComponent from "./CarouselComponent";
import { getCategories } from "../../store/categorySlice";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or use icons of your choice
import {
  addCategory,
  clearFilters,
  initializeCategory,
} from "../../store/filtersSlice";
import { getImageUrl } from "../../utils/getImageUrl";

const Home = () => {
  // State
  const dispatch = useDispatch();
  const ref = useRef();

  const [showArrow, setShowArrow] = useState(false);

  const scrollRef = useRef(null);

  // Hooks
  const navigate = useNavigate();

  useEffect(() => {
    const toggleShowArrow = () => {
      if (window.scrollY > 300) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", toggleShowArrow);

    return () => {
      window.removeEventListener("scroll", toggleShowArrow);
    };
  }, []);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const { data, status } = useSelector((state) => state.products);
  const { data: categories, status: categoriesStatus } = useSelector(
    (state) => state.categories
  );

  const trendingProductsData = data.filter(
    (product) => product.trending === true
  );

  const scrollToCategories = () => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 300; // Get the width of the first category card
      scrollRef.current.scrollBy({
        left: -cardWidth, // Scroll left by one card width
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 300; // Get the width of the first category card
      scrollRef.current.scrollBy({
        left: cardWidth, // Scroll right by one card width
        behavior: "smooth",
      });
    }
  };

  const redirectToProducts = () => {
    dispatch(clearFilters());
    navigate("/products");
  };

  const renderHomeBanner = () => (
    <section className="home-banner">
      <div className="w-[40%]">
        <h1 className="home-banner-title">
          Glasses <br /> & Lens
        </h1>
        <p className="home-banner-caption pb-3">
          Buy the best high-quality sunglasses from us.
          <br />
          More than 100 types of assortment.
        </p>
        <button
          type="button"
          onClick={() => redirectToProducts()}
          className="text-white bg-black font-medium rounded-lg text-base px-3 pt-2.5 pb-2 me-2 mb-2"
        >
          Start Shopping
        </button>
        <a href="#categoriesSection" onClick={scrollToCategories}>
          <button
            type="button"
            className="text-black font-medium rounded-lg text-base px-3 pt-2.5 pb-2 text-center inline-flex items-center"
          >
            Explore More
            <BsArrowDownRightCircle className="ml-2 text-lg" />
          </button>
        </a>
      </div>
      {/* <div className="home-banner-image-container flex">
        <img
          className="home-banner-image"
          src="https://res.cloudinary.com/ddaimmqrr/image/upload/v1690882963/Eyesome/bannerImg.712fc34e6a2084115f10_rtidnd.png"
          alt="homeBanner"
        />
      </div> */}
      <div className="w-[60%]">
        <CarouselComponent />
      </div>
    </section>
  );

  const renderHomeTrendingView = () => (
    <section className="home-trending-view row">
      <div className="home-trending-title-container col-12 col-sm-6 col-lg-4 col-xl-3">
        <h2 className="home-trending-title text-5xl ml-2">Trending Products</h2>
      </div>
      {trendingProductsData.map((product) => (
        <TrendingProductCard key={product.id} product={product} />
      ))}
    </section>
  );

  const renderCategoriesList = () => (
    <section className="home-categories-view row">
      <div className="home-categories-title-container col-12" ref={ref}>
        <h2 className="home-trending-title text-center mb-2 text-4xl">
          Categories
        </h2>
      </div>

      <div className="home-categories-controls col-12 flex items-center gap-3">
        <button className="scroll-btn" onClick={scrollLeft}>
          <ChevronLeft size={28} />
        </button>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar hide-scrollbar"
            ref={scrollRef}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="min-w-full w-[300px] sm:min-w-[50%] md:min-w-[33.33%] p-2"
              >
                <Link
                  to="/products"
                  className="block"
                  onClick={() => {
                    dispatch(initializeCategory());
                    dispatch(addCategory(category.displayText));
                  }}
                >
                  <div
                    className="relative h-48 rounded-lg overflow-hidden bg-cover bg-center shadow-md hover:shadow-lg transition-shadow"
                    style={{
                      backgroundImage: `url(${getImageUrl(category.imageUrl)})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <p className="text-white text-lg md:text-2xl font-semibold text-center px-4 truncate">
                        {category.displayText}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button className="scroll-btn" onClick={scrollRight}>
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  );

  const renderHomeSuccessView = () => (
    <>
      {renderHomeBanner()}
      {renderHomeTrendingView()}
      {renderCategoriesList()}
      {showArrow && <ScrollToTop />}
    </>
  );

  const renderHomeView = () => {
    switch (status) {
      case statusCode.pending:
        return <Loader />;
      case statusCode.success:
        return renderHomeSuccessView();
      case statusCode.failure:
        return <ErrorCard />;
      default:
        return null;
    }
  };

  return renderHomeView();
};

export default Home;
