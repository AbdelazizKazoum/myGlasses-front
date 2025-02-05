import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../../store/productDetailsSlice";

export const RecommandedProducts = () => {
  // State
  const [visibleItems, setVisibleItems] = useState(4);

  // Hooks
  const { relatedProducts: filteredData } = useSelector(
    (state) => state.productDetails
  );
  const dispatch = useDispatch();
  // this state for loasing more recommanded products
  const handleShowMore = () => {
    setVisibleItems(visibleItems + 4); // Load 4 more items each time
  };

  useEffect(() => {
    dispatch(getProductsByCategory("ACCESSOIRES"));
  });

  return (
    <div className=" mt-4 ">
      <hr className=" my-4 " />
      <div className="flex justify-between m-3">
        {/* Title in French */}
        <h1 className=" font-bold ">Produits Recommandés</h1>

        {/* Show More button */}
        {filteredData.length > visibleItems && (
          <button
            className="show-more-button underline "
            onClick={handleShowMore}
          >
            Voir plus
          </button>
        )}
      </div>

      {/* recommended Product List */}
      <ul className="row product-list-container d-flex">
        {filteredData.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};
