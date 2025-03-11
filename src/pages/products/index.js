import { BsFilterRight } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { getFilterdProducts } from "../../store/productsSlice";
import ProductCard from "../../components/ProductCard";
import FiltersGroup from "../../components/FiltersGroup";

import "./index.css";
import { useEffect, useState } from "react";
import { statusCode } from "../../utils/statusCode";
import ErrorCard from "../../components/ErrorCard";
import ScrollToTop from "../../components/ScrollToTop";
import { updatePriceSort } from "../../store/filtersSlice";

import "bootstrap/dist/css/bootstrap.min.css";
import { delayLoading } from "../../utils/delayLoading";

const Products = () => {
  const [showArrow, setShowArrow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Local loading state
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    status,
    data: filteredData,
    pagination,
  } = useSelector((state) => state.products);

  const { totalPages } = pagination;
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // ✅ Start loading
      await delayLoading(
        dispatch(
          getFilterdProducts({
            filters,
            pagination: { page: currentPage, limit: 12 },
          })
        )
      );
      setLoading(false);
    };
    fetchProducts();
  }, [dispatch, filters, currentPage]);

  useEffect(() => {
    const toggleShowArrow = () => {
      setShowArrow(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleShowArrow);
    return () => window.removeEventListener("scroll", toggleShowArrow);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <div className="flex justify-center mt-8 space-x-2">
        <button
          className={`px-3 py-1 rounded-md border text-sm ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded-md border text-sm ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={`px-3 py-1 rounded-md border text-sm ${
            currentPage === totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  // ✅ Skeleton Component
  const renderSkeletons = () => {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-0 m-0">
        {Array.from({ length: 8 }).map((_, index) => (
          <li
            key={index}
            className="w-full h-[300px] bg-gray-200 rounded-lg animate-pulse"
          >
            <div className="h-2/3 bg-gray-300 rounded-t-lg"></div>
            <div className="p-3">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const renderProductSuccessView = () => (
    <>
      <section>
        <img
          src="https://res.cloudinary.com/ddaimmqrr/image/upload/v1690954279/Eyesome/bannerHero.b913ee7a0754b4966295_snyik1.jpg"
          className="products-hero-image"
          alt="heroImage"
        />
      </section>

      <section className="products-title-filters">
        <h2>Glasses for You!</h2>
        <div>
          <select
            className="select-filter px-[8px] py-1.5"
            onChange={(event) => {
              dispatch(updatePriceSort(event.target.value));
            }}
          >
            <option value="">Sort By Price</option>
            <option value="LOW_HIGH">Low to High</option>
            <option value="HIGH_LOW">High to Low</option>
          </select>
          <button
            type="button"
            className="filter-buttonn flex gap-2 items-center px-2.5 ml-2 rounded-[5px] bg-[#EFEFEF]"
            onClick={() => {
              document
                .getElementById("filtersGroup")
                .classList.remove("d-none");
            }}
          >
            <BsFilterRight />
            <p className="mt-1">Filters</p>
          </button>
        </div>
      </section>

      {/* ✅ Show skeletons if loading is true */}
      {loading ? (
        renderSkeletons()
      ) : (
        <ul className="row product-list-container d-flex">
          {filteredData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      )}

      <FiltersGroup />
      {showArrow && <ScrollToTop />}
      {renderPagination()}
    </>
  );

  const renderProductView = () => {
    switch (status) {
      case statusCode.pending:
        // return <Loader />; ❌ remove old loader
        return renderProductSuccessView(); // ✅ just call success view and let local `loading` state handle it
      case statusCode.success:
        return renderProductSuccessView();
      case statusCode.failure:
        return <ErrorCard />;
      default:
        return null;
    }
  };

  return renderProductView();
};

export default Products;
