import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { searchDetailProductByName } from "../../store/productsSlice";

const ProductDetailSearchInput = ({
  value,
  onChange,
  onSelectProduct,
  error,
  selectedProduct,
  setSelectedProduct,
  label = "Product Detail *",
  placeholder = "Search for product details",
}) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [detailProducts, setDetailProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchText && !selectedProduct) {
        const res = await dispatch(searchDetailProductByName(searchText));
        setDetailProducts(res.payload || []);
      } else {
        setDetailProducts([]);
      }
    };
    fetchProducts();
  }, [searchText, dispatch, selectedProduct]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    onChange(product.id);
    setSearchText(
      `${product.product.name} - ${product.color} - ${product.size}`
    );
    onSelectProduct?.(product);
    setDetailProducts([]);
  };

  const handleClearSelection = () => {
    setSelectedProduct(null);
    onChange("");
    setSearchText("");
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <div className="relative w-full">
        {!selectedProduct ? (
          <>
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              className="w-full p-2 border rounded-md h-10"
              placeholder={placeholder}
            />

            {searchText && detailProducts.length > 0 && (
              <div className="mt-1 w-full absolute z-10 max-h-40 overflow-auto border rounded bg-white shadow">
                {detailProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleSelectProduct(product)}
                  >
                    <div
                      style={{
                        backgroundColor: product.color,
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        marginRight: 8,
                      }}
                    />
                    <span>
                      {product.product.name} - {product.color} - {product.size}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {searchText && detailProducts.length === 0 && (
              <div className="mt-1 w-full absolute z-10 border rounded bg-white shadow p-2 text-gray-500">
                No products found
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-10 p-2 border rounded-md bg-gray-100 flex justify-between items-center">
            <div className="flex items-center overflow-hidden whitespace-nowrap text-ellipsis">
              <div
                style={{
                  backgroundColor: selectedProduct.color,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  marginRight: 8,
                }}
              />
              <span className="text-sm">
                {selectedProduct.product.name} - {selectedProduct.color} -{" "}
                {selectedProduct.size}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearSelection}
              className="text-gray-500 hover:text-red-600 ml-2"
            >
              <RxCross2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default ProductDetailSearchInput;
