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
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [initialLoading, setInitialLoading] = useState(false);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const dispatch = useDispatch();
  const {
    status,
    // data: filteredData,
    pagination,
  } = useSelector((state) => state.products);
  const { totalPages } = pagination;
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    if (hasMounted) {
      setCurrentPage(1);
    } else {
      setHasMounted(true);
    }
  }, [filters, hasMounted]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Determine if it's initial load or show more
      if (currentPage === 1) {
        setInitialLoading(true);
      } else {
        setShowMoreLoading(true);
      }

      const resultAction = await dispatch(
        getFilterdProducts({
          filters,
          pagination: { page: currentPage, limit: 12 },
        })
      );

      const products = resultAction?.payload?.data || [];

      if (currentPage === 1) {
        setLoadedProducts(products);
        setIsFirstLoad(false);
        setInitialLoading(false);
      } else {
        setLoadedProducts((prev) => [...prev, ...products]);
        setShowMoreLoading(false);
      }
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

  const handlePageChange = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const renderShowMoreButton = () => {
    if (currentPage >= totalPages) return null;

    return (
      <div className="flex justify-center mt-6">
        {showMoreLoading ? (
          <div className="flex items-center justify-center">
            <span className="animate-spin inline-block w-6 h-6 border-4 border-primary-500 border-t-transparent rounded-full"></span>
          </div>
        ) : (
          <button
            className="bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-800"
            onClick={handlePageChange}
            disabled={showMoreLoading}
          >
            Show More
          </button>
        )}
      </div>
    );
  };

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
            className="filter-buttonn flex justify-center gap-2 items-center px-2.5 ml-2 rounded-[5px] bg-[#EFEFEF]"
            onClick={() => {
              document
                .getElementById("filtersGroup")
                ?.classList.remove("d-none");
            }}
          >
            <BsFilterRight />
            <p className="mt-1 m-0 p-1">Filters</p>
          </button>
        </div>
      </section>

      {initialLoading && isFirstLoad ? (
        renderSkeletons()
      ) : (
        <ul className="row product-list-container d-flex">
          {loadedProducts.map((product) => (
            <ProductCard key={product.id} product={product} id={product.id} />
          ))}
        </ul>
      )}

      <FiltersGroup />
      {showArrow && <ScrollToTop />}
      {renderShowMoreButton()}
    </>
  );

  const renderProductView = () => {
    switch (status) {
      case statusCode.pending:
        return renderProductSuccessView();
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
