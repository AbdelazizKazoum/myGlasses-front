import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFilterdProducts } from "../../../store/productsSlice";
import { useNavigate } from "react-router-dom";
import { setProduct } from "../../../store/productSlice";
import TableHeader from "../../../components/dashboard/products/TableHeader";
import { getImageUrl } from "../../../utils/getImageUrl";
import { PencilIcon } from "lucide-react";
import Loader from "../../../components/Loader";

const ProductsPage = () => {
  // States
  const [filters, setFilters] = useState({
    searchInput: "",
    gender: "",
    priceRange: "",
    rating: "",
    priceSort: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10); // You can make this dynamic if needed
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: products,
    pagination: { total },
  } = useSelector((state) => state.products);
  console.log("🚀 ~ ProductsPage ~ products:", products);

  // Get products whenever filters or pagination change
  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(
        getFilterdProducts({
          filters,
          pagination: { page: currentPage, limit },
        })
      ).finally(() => {
        setLoading(false);
      });
    })();
  }, [filters, currentPage, limit, dispatch]);

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddProduct = () => {
    dispatch(setProduct(null));
    navigate("/admin/products/add");
  };

  const handleEditProduct = (product) => {
    dispatch(setProduct(product));
    navigate("/admin/products/add");
  };

  if (loading) return <Loader />;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <TableHeader
        filters={filters}
        setFilters={setFilters}
        handleAddProduct={handleAddProduct}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left text-gray-500">
          <thead className="text-xs border text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Brand</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.brand}</td>
                <td className="px-6 py-4">{product.price} MAD</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-3 py-4 px-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            className={`px-4 py-2 ${
              currentPage === 1
                ? "bg-primary-500 text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-md`}
          >
            1
          </button>
          {currentPage > 2 && <span className="text-gray-500">...</span>}
          {currentPage > 1 && currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {currentPage}
            </button>
          )}
          {currentPage < totalPages - 1 && (
            <span className="text-gray-500">...</span>
          )}
          {totalPages > 1 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`px-4 py-2 ${
                currentPage === totalPages
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-md`}
            >
              {totalPages}
            </button>
          )}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
